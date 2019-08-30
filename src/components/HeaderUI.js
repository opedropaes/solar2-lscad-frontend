/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../src/pages/styles/Home.css';

export default class HeaderUI extends Component {
	render() {
		switch (this.props.logged) {
			case true:
				if(this.props.ufv == "irece") {
					return (
						<React.Fragment>
							<div className="collapse navbar-collapse" id="navbarCollapse"></div>
							<div className="btn-group dropdown ml-auto pr-4" id="navbarSupportedContent">
								<ul className="navbar-nav mr-auto">
									<li className="nav-item dropdown">
										<button className="nav-link dropdown-toggle btn btn-transparent" data-toggle="dropdown"
											aria-haspopup="true" aria-expanded="false">UFV - Irecê</button>
										<div className="dropdown-menu bg-dark">
											<Link className="dropdown-item bg-dark" to="/campo-grande/painel" id="dropdown-item">UFV - UFMS</Link>
										</div>
									</li>
								</ul>
							</div>
						</React.Fragment>
					);
				} else {
					return (
						<React.Fragment>
							<div className="collapse navbar-collapse" id="navbarCollapse"></div>
							<div className="btn-group dropdown ml-auto pr-4" id="navbarSupportedContent">
								<ul className="navbar-nav mr-auto">
									<li className="nav-item dropdown">
										<button className="nav-link dropdown-toggle btn btn-transparent" data-toggle="dropdown"
											aria-haspopup="true" aria-expanded="false">UFV - UFMS</button>
										<div className="dropdown-menu bg-dark">
											<Link className="dropdown-item bg-dark" to="/irece/painel" id="dropdown-item">UFV - Irecê</Link>
										</div>
									</li>
								</ul>
							</div>
						</React.Fragment>
					);
				}
			default:
				return (
					<div className="collapse navbar-collapse" id="navbarCollapse">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item active">
								<a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/sobre">Quem somos</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/contato">Contato</a>
							</li>
						</ul>
						<a className="btn btn-warning orange text-white ml-auto mt-2 mb-2 " id="startPanel" href="https://solar2-users.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=sq0qbsvh23jgp1njocuufftl6&redirect_uri=https://solar2-lscad.herokuapp.com/campo-grande/painel" role="button" type="button">
							<i className="material-icons pr-2 pb-1 pl-0 text-white outline-assessment" id="painel-icon">assessment</i>Acesse o painel
					</a>
					</div>
				);
		}
	}
}
