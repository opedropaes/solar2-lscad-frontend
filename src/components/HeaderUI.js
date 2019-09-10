/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CognitoUser, CognitoUserPool, AuthenticationDetails } from 'amazon-cognito-identity-js';
import _config from '../services/_config';

import '../../src/pages/styles/Home.css';

export default class HeaderUI extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: "",
		};
	}

	getUser = async () => {
		return new Promise((resolve, reject) => {
			let poolData = {
				UserPoolId: _config.userPoolId,
				ClientId: _config.clientId
			};
	
			let userPool = new CognitoUserPool(poolData);
			let cognitoUser = userPool.getCurrentUser();
			
			if (cognitoUser != null) {
				cognitoUser.getSession(function(err, session) {
					if (err) {
						reject();
					}			
				});

				cognitoUser.getUserAttributes(function(err, result) {
					if (err) {
						reject();
					}
					for (let i = 0; i < result.length; i++) {
						if (result[i].getName() === "name") {
							resolve(result[i].getValue());
						}
					}
				});
			}
			
		})
	}

	quit = () => {
		localStorage.removeItem('accessToken');
	}

	async componentDidMount () {
		let user = await this.getUser();
		this.setState({ user });
	}

	render() {
		if (this.props.logged) {
			return (
				<React.Fragment>
					<div className="collapse navbar-collapse" id="navbarCollapse"></div>
					<div className="dropdown my-2 mr-2">
						<button className="btn btn-outline-secondary text-white dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<i className="material-icons pr-2 pb-1 text-white outline-assessment" id="painel-icon">perm_identity</i>{this.state.user}
  						</button>
						<div className="dropdown-menu bg-dark text-white mx-auto" aria-labelledby="dropdownMenuButton">
							<Link className="dropdown-item text-white text-right" to="/criar-supervisor">
								<i className="material-icons pr-2 pb-1 text-white outline-assessment" id="painel-icon">add</i>Criar supervisor
							</Link>
							<div className="dropdown-divider mx-3 mt-3"></div>
							<Link className="dropdown-item text-white text-right" to="/" onClick={this.quit}>
								<i className="material-icons pr-2 pb-1 text-white outline-assessment" id="painel-icon">power_settings_new</i>Sair
							</Link>
						</div>
					</div>
				</React.Fragment>
			);
		} else {
			if (this.props.transition) {
				return (
					<div className="collapse navbar-collapse mx-auto" id="navbarCollapse">
						<ul className="navbar-nav text-center mx-auto">
							<li className="nav-item">
								<Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/sobre">Quem somos</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/contato">Contato</Link>
							</li>
						</ul>
					</div>
				);
			} else {
				return (
					<div className="collapse navbar-collapse" id="navbarCollapse">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item active">
								<Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/sobre">Quem somos</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/contato">Contato</Link>
							</li>
						</ul>
						<Link className="btn btn-warning orange text-white ml-auto mt-2 mb-2 " id="startPanel" to="/login">
							<i className="material-icons pr-2 pb-1 pl-0 text-white outline-assessment" id="painel-icon">assessment</i>Acesse o painel
						</Link>
					</div>
				);
			}
		}
	}
}
