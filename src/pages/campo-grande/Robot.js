import React, { Component } from 'react';
import Header from '../../components/HeaderWrapper';
import Footer from '../../components/FooterWrapper';

import '../../pages/styles/Home.css';

import sendMessageToTopicByLambdaInvoking from '../../utils/mqttTopicMessageSender';


export default class Robot extends Component {
	
	activate = async () => {
		return new Promise((resolve, reject) => {
			sendMessageToTopicByLambdaInvoking("activate")
				.then(response => {
					const { Status } = response;

					if (Status === 202) {
						// this.confirmationModal("Sucesso!", "Dispositivo acionado.");
						resolve({ title: "Sucesso!", message: "Dispositivo acionado." })
					} else {
						// response.err: "UserIsNotAdmin" 
						this.confirmationModal("Ops...", "Usuário não autorizado para realizar acionamento.");
					}
				})
				.catch(err => {
					console.log(err);
				})
		})
		
	}

	deactivate = async () => {
		sendMessageToTopicByLambdaInvoking("deactivate")
			.then(response => {
				const { Status } = response;

				if (Status === 202) {
					this.confirmationModal("Sucesso!", "Dispositivo desativado.");
				} else {
					// response.err: "UserIsNotAdmin" 
					this.confirmationModal("Ops...", "Usuário não autorizado para realizar desligamento.");
				}
			})
			.catch(err => {
				console.log(err);
			})
	}

	confirmationModal(title, message) {
		return (
			<div class="modal" tabindex="-1" role="dialog">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title">{title}</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<p>{message}</p>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
						</div>
					</div>
				</div>
			</div>
		)
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
											<button className="btn btn-success mx-auto btn-block py-4" onClick={this.activate().then(res => this.confirmationModal(res.title, res.message))} ><strong>Ativar robô</strong></button>
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
