import React, { Component } from 'react';
import Header from '../components/HeaderWrapper';
import Footer from '../components/FooterWrapper';
import Card from '../components/Card';

export default class pages extends Component {
	render() {
		return (
			<React.Fragment>

				<Header logged={true} fixed={false} marginBottom={false} ufv="campo-grande" />
				<div className="container col-lg-12  p-0" id="inner-box">
					<main className="col-lg-12 p-5" role="main" id="main">
						<div className="mb-3">
							<h3><i className="material-icons pr-2 pb-1 pl-0" id="painel-icon">bar_chart</i>Painel de Controle do Dispositivo</h3>
						</div>

						<div id="accordion">
							<div className="card">
								

								<div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
									<div className="card-body">
										<div className="row p-3">
											
											<div className="col-lg-6 mb-4" id="painel-cards-wrapper">
												<Card
													id="robo"
													title="Acionar"
													text="Acionar dispositivo"
													link="#"
													buttonText="Acionar"
													buttonActive={true}
													theme="robot"
												/>
											</div>

											<div className="col-lg-6 mb-4" id="painel-cards-wrapper">
												<Card
													id="robo"
													title="Desativar"
													text="Desativar dispositivo"
													link="#"
													buttonText="Desativar"
													buttonActive={true}
													theme="robot"
												/>
											</div>

										</div>
									
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