/* eslint-disable eqeqeq */
import AWS from 'aws-sdk';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import _config from '../services/_config';

const verifyUser = async () => {

	let poolData = {
		UserPoolId: _config.userPoolId, // Your user pool id here
		ClientId: _config.clientId, // Your client id here
	};
	
	let userPool = new CognitoUserPool(poolData);
	let cognitoUser = userPool.getCurrentUser();

	if (cognitoUser != null) {
		
		return new Promise ((resolve, reject) => {
			cognitoUser.getSession((err, session) => {
				if (session) {

					let userAttributes = null;
					
					AWS.config.region = _config.region;

					AWS.config.credentials = new AWS.CognitoIdentityCredentials({
						IdentityPoolId: 'us-east-1:52bffe11-4e2e-4b34-8d21-4ea948340b2c',
						Logins: {
							'cognito-idp.us-east-1.amazonaws.com/us-east-1_mM4mx5nCj': session.getIdToken().getJwtToken()
						}
					});

					// NOTE: getSession must be called to authenticate user before calling getUserAttributes
					cognitoUser.getUserAttributes((err, attributes) => {
						if (err) {
							console.log("Error on get attributes -> " + err);
							reject(err);
						}
						else {
							userAttributes = attributes;
						}
					});

					//call refresh method in order to authenticate user and get new temp credentials
					AWS.config.credentials.refresh((error) => {
						if (error) console.log("Error on refresh -> " + error);
						else resolve(userAttributes);
					});
				}
			});
		})
	}

	else return null;
}

/**
 * 
 * @param {String} message Accepts "activate" or "deactivate" 
 */
const sendMessageToTopicByLambdaInvoking = async (message) => {
	
	return new Promise((resolve, reject) => {
		verifyUser().then(async response => {

			let userAttributes = response;

			if (userAttributes != undefined) {

				clearTimeout(cognitoConnectionTimeout); // Cessa tentativas de reconexão

				const adminList = {
					"Pedro Mihael": true,
					"RICARDO RIBEIRO DOS SANTOS": true,
					"Thiago de Santana Finelon Pereira": true,
					"Guilherme Gloriano de Souza": true
				}

				let adminAttributes = userAttributes.filter(attribute => attribute.Name === "name" && adminList[attribute.Value])
				let isAdmin = adminAttributes.length > 0 ? true : false;

				if (isAdmin) {

					let lambdaClient = new AWS.Lambda();

					if (message === "activate") {
						let params = {
							FunctionName: "ui_robot_activation",
							InvokeArgs: "true"
						}

						let lambdaInvoking = new Promise((resolve, reject) => {
							lambdaClient.invokeAsync(params, (err, data) => {
								if (err) {
									console.log("Error on invoking function -> ", err, err.stack);
									reject(err)
								} else {
									resolve(data);
								}
							})
						});

						let lambdaConfimationResponse = await lambdaInvoking;
						resolve(lambdaConfimationResponse);

					} else if (message === "deactivate") {
						let params = {
							FunctionName: "ui_robot_deactivation",
							InvokeArgs: "false"
						}

						let lambdaInvoking = new Promise((resolve, reject) => {
							lambdaClient.invokeAsync(params, (err, data) => {
								if (err) {
									console.log("Error on invoking function -> ", err, err.stack);
									reject(err)
								} else {
									resolve(data);
								}
							})
						});

						let lambdaConfimationResponse = await lambdaInvoking;
						resolve(lambdaConfimationResponse);
					}

				}

				else {
					resolve({ err: "UserIsNotAdmin", Status: 301 });
				}
			}

			else {
				cognitoConnectionTimeout(message);
			}
		});
	})
	
}

let cognitoConnectionTimeout = (message) => setTimeout(() => {
	sendMessageToTopicByLambdaInvoking(message);
}, 2000);

export default sendMessageToTopicByLambdaInvoking;
