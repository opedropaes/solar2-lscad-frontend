import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Header from '../components/HeaderWrapper';
import FormButton from '../components/FormButton';
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import _config from '../services/_config';
import * as AWS from 'aws-sdk/global';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			logged: false,
			errMessage: ""
		};
	}

	login = e => {

		this.setState({ loading: true });
		e.preventDefault();

		let { username, password } = this.state;

		let authenticationData = {
			Username: username,
			Password: password
		};

		let authenticationDetails = new AuthenticationDetails(authenticationData);

		let poolData = {
			UserPoolId: _config.userPoolId,
			ClientId: _config.clientId
		};

		let userPool = new CognitoUserPool(poolData);

		let userData = {
			Username: username,
			Pool: userPool
		};

		let cognitoUser = new CognitoUser(userData);
		
		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: (result) => {

				if (cognitoUser != null) {
					cognitoUser.getSession((err, result) => {
						if (result) {
							
							sessionStorage.removeItem('accessToken');
							let accessToken = result.getAccessToken().getJwtToken();
							sessionStorage.setItem('accessToken', accessToken);

							AWS.config.region = _config.region;

							AWS.config.credentials = new AWS.CognitoIdentityCredentials({
								IdentityPoolId: 'us-east-1:52bffe11-4e2e-4b34-8d21-4ea948340b2c',
								Logins: {
									'cognito-idp.us-east-1.amazonaws.com/us-east-1_mM4mx5nCj': result.getIdToken().getJwtToken()
								}
							});

							//call refresh method in order to authenticate user and get new temp credentials
							AWS.config.credentials.refresh((error) => {
								if (error) {
									this.setState({ loading: false });
								} else {
									this.setState({ logged: true });
									this.props.history.push({
										pathname: "/painel",
										state: { logged: true },
										length: 1
									})
								}
							});
						}
					});
				}
				
			},

			onFailure: (err) => {

				this.setState({ loading: false });
				
				if (err.message === "User does not exist.") {
					this.setState({ errMessage: "Parece que seu usuário não existe! Crie uma conta e tente novamente." })
				} else if (err.message === "Incorrect username or password.") {
					this.setState({ errMessage: "Essa senha não corresponde ao seu e-mail. Tente novamente." })
				} else if (err.message === "User is not confirmed.") {
					this.setState({ errMessage: "Confirme seu cadastro no e-mail e tente novamente." })
				}

				return;
			},

		});

	}

	handleClick = () => {
		this.setState({ loading: true });
	}

	render() {
		return (
			<React.Fragment>
				<div style={{ position: "absolute", top: "40%", width: "100%", transform: "translateY(-50%)" }}>
					<div className="container-fluid mb-1 mt-5 form-wrapper col-lg-8">
						<div className="card col-md-6 mx-auto">
							<div className="card-title mx-auto">
								<h4 className="card-title mt-4">Entrar</h4>
							</div>
							<div className="card-body col-lg-10 mx-auto">
								<form className="pl-0 form-group" onSubmit={this.login}>
									<div className="form-group">
										<input type="text" name="username" id="username" className="form-control" placeholder="E-mail" required
											onInput={(e) => this.setState({ username: e.target.value })} />
									</div>
									<div className="form-group">
										<input type="password" name="password" id="password" className="form-control" placeholder="Senha" required
											onInput={(e) => this.setState({ password: e.target.value })} />
									</div>
									<div className="text-red">
										<small>{this.state.errMessage}</small>
									</div>
									<FormButton loading={this.state.loading} label="Entrar" />
									<div className="form-group text-center" >
										<Link className="mt-5" to="/cadastro"><small className="form-text">Não tenho conta</small></Link>
									</div>
								</form>
							</div>
						</div>
					</div>
					<Header logged={false} fixed={false} marginBottom={true} transition={true} />
				</div>

			</React.Fragment>
		);
	}
}

export default withRouter(Login);
