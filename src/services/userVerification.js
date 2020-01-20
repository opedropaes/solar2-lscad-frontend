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
						else resolve({userAttributes, AWS});
					});
				}
			});
		})
	}

	else return null;
}

export default verifyUser;