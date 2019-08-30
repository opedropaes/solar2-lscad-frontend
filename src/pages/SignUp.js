/* eslint-disable no-throw-literal */
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import _config from '../services/_config';
import { CognitoUserPool, CognitoUserAttribute, } from 'amazon-cognito-identity-js';

// import { Container } from './styles';

export default class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false
		};
	}

	setRedirect = () => {
		this.setState({
			redirect: true
		})
	}

	renderRedirect = () => {
		if (this.state.redirect) {
			return <Redirect to='/campo-grande/painel' />
		}
	}

	register = () => {

		let email = this.state.email;
		let name = this.state.name;
		let password = this.state.password
		let passwordConfirmation = this.state.passwordConfirmation
		let poolData = {}

		if (password !== passwordConfirmation) {
			alert("As senhas não batem!")
			throw "As senhas não batem!"
		} else {
			password = passwordConfirmation
		}

		poolData = {
			UserPoolId: _config.cognito.userPoolId, // Your user pool id here
			ClientId: _config.cognito.clientId // Your client id here
		};

		let userPool = CognitoUserPool(poolData);

		let attributeList = [];

		let dataEmail = {
			Name: 'email',
			Value: email, //get from form field
		};

		let dataPersonalName = {
			Name: 'name',
			Value: name, //get from form field
		};

		let attributeEmail = CognitoUserAttribute(dataEmail);
		let attributePersonalName = CognitoUserAttribute(dataPersonalName);

		attributeList.push(attributeEmail);
		attributeList.push(attributePersonalName);

		userPool.signUp(email, password, attributeList, null, function (err, result) {

			if (err) {
				alert(err.message || JSON.stringify(err));
				return;
			}

			let cognitoUser = result.user;
			console.log('user name is ' + cognitoUser.getUsername());

		});

	}

	render() {
		return (
			<div className="container-fluid my-5 form-wrapper">
				<div className="card col-md-6 mx-auto">
					<div className="card-title mx-auto">
						<h4 className="card-title mt-4">Cadastre-se</h4>
					</div>
					<div className="card-body col-lg-10 mx-auto">
						<form className="pl-0" action="/campo-grande/painel">
							<label htmlFor="email">E-mail: </label>
							<input type="email" name="email" id="email" className="form-control" placeholder="seu@email.com" required
							/>
							<br />
							<label htmlFor="nome">Nome: </label>
							<input type="text" name="nome" id="nome" className="form-control" placeholder="Nome Sobrenome" required
							/>
							<br />
							<label htmlFor="empresa">Empresa: </label>
							<input type="text" name="empresa" id="nome" className="form-control" placeholder="Sua Empresa"
							/>
							<br />
							<label htmlFor="password">Senha: </label>
							<input type="password" name="password" id="password" className="form-control"
								placeholder="Sua senha deve conter pelo menos 8 caracteres" required
							/>
							<br />
							<label htmlFor="password">Confirme a senha: </label>
							<input type="password" name="password" id="password" className="form-control"
								placeholder="As senhas devem ser iguais" required
							/>
							<br />
							<label htmlFor="telefone">Telefone:</label>
							<input type="tel" name="telefone" id="telefone" className="form-control" placeholder="6733445566" required />
							<br />

							<button className="btn btn-primary mb-2" id="submit" onClick={this.setRedirect}>Cadastrar</button>
							<br />
							<Link className="mt-5" to="/login">Já possuo conta</Link>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
