import React, { Component } from 'react';
import Header from '../../components/HeaderWrapper';
import Footer from '../../components/FooterWrapper';

import '../../pages/styles/Home.css';

import sendMessageToTopicByLambdaInvoking from '../../utils/mqttTopicMessageSender';


export default class Robot extends Component {
	
	activate = async () => {
		sendMessageToTopicByLambdaInvoking("activate")
			.then(response => {
				alert("Dispositivo acionado.");
			})
		
	}

	deactivate = async () => {
		sendMessageToTopicByLambdaInvoking("deactivate")
			.then(response => {
				alert("Dispositivo desativado.");
			})
	}

	render() {
		return (
			<React.Fragment>

				<Header logged={true} fixed={false} marginBottom={false} ufv="campo-grande" />
				<div className="container col-lg-12  p-0" id="inner-box">
					<main className="col-lg-12 p-5" role="main" id="main">
						<div className="mb-3">
							<h3><i className="material-icons pr-2 pb-1 pl-0" id="painel-icon">bar_chart</i>Painel de Controle do Dispositivo de Limpeza</h3>
						</div>

							<div className="card">
								<div className="card-header" id="headingOne">
									<h5 className="mb-0">
										<button className="btn" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
											<i className="material-icons pr-2 pb-1" id="painel-icon">menu</i>Campo Grande
									</button>
									</h5>
								</div>

								<div className="mx-auto col-lg-3">
									<div className="row p-3 mx-auto">
										<div className="col-lg-12 mx-auto my-2" id="painel-cards-wrapper">
											<button className="btn btn-success mx-auto btn-block py-4" onClick={this.activate} ><strong>Ativar robô</strong></button>
										</div>
									</div>

								<div className="col-lg-12 row p-3 mx-auto">
									<div className="col-lg-12 mx-auto my-2" id="painel-cards-wrapper">
										<button className="btn btn-danger btn-block py-4" onClick={this.deactivate} >Desativar robô</button>
									</div>

								</div>

								</div>
							</div>

					</main>


				</div>
				<Footer />
			</React.Fragment>
		);
	}

}
