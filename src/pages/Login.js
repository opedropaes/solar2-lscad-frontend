import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import { Container } from './styles';

export default class Login extends Component {
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
	
	render() {
		return (
			<div className="container-fluid my-5 form-wrapper">
				<div className="card col-md-6 mx-auto">
					<div className="card-title mx-auto">
						<h4 className="card-title mt-4">Entrar</h4>
					</div>
					<div className="card-body col-lg-10 mx-auto">
					<form className="pl-0" action="/campo-grande/painel">
							<label htmlFor="email">E-mail: </label>
							<input type="email" name="email" id="email" className="form-control" required />
							<br />
							<label htmlFor="password">Senha: </label>
							<input type="password" name="password" id="password" className="form-control" required />
							<br />
							<button className="btn btn-primary mb-2" id="submit" onClick={this.setRedirect}>Entrar</button>
							<br/>
							<Link className="mt-5" to="/cadastro">Não tenho conta</Link>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
