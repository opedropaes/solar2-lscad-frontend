/* eslint-disable eqeqeq */
import verifyUser from '../services/userVerification';

/**
 * 
 * @param {String} message Accepts "activate" or "deactivate" 
 */
const sendMessageToTopicByLambdaInvoking = async (message) => {
	
	return new Promise((resolve, reject) => {
		verifyUser().then(async response => {

			const { userAttributes, AWS } = response;

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
