import React, { Component } from 'react';
import Header from '../components/HeaderWrapper';
import Footer from '../components/FooterWrapper';
import Card from '../components/Card';

import '../pages/styles/Home.css';

export default class Painel extends Component {

	constructor(props){
		super(props);
		this.state = {};
	}

	render() {
		return (
			<React.Fragment>

				<Header logged={true} fixed={false} marginBottom={false} ufv="campo-grande" />
				<div className="container col-lg-12  p-0" id="inner-box">
					<main className="col-lg-12 p-5" role="main" id="main">
						<div className="mb-3">
							<h3><i className="material-icons pr-2 pb-1 pl-0" id="painel-icon">bar_chart</i>Painel de Controle</h3>
						</div>

						<div id="accordion">
							<div className="card">
								<div className="card-header" id="headingOne">
									<h5 className="mb-0">
										<button className="btn" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
											<i className="material-icons pr-2 pb-1" id="painel-icon">menu</i>Campo Grande
									</button>
									</h5>
								</div>

								<div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
									<div className="card-body">
										<div className="row p-3">
											<div className="col-lg-4 mb-4" id="painel-cards-wrapper">
												<Card
													id="ambientais"
													title="Dados Ambientais"
													text="Monitorar dados ambientais de Campo Grande"
													link="/campo-grande/ambientais"
													buttonText="Monitorar agora"
													buttonActive={true}
													theme="environmental"
												/>
											</div>

											<div className="col-lg-4 mb-4" id="painel-cards-wrapper">
												<Card
													id="producao"
													title="Dados de Produção"
													text="Monitorar dados de produção de Campo Grande"
													link="/campo-grande/producao"
													buttonText="Monitorar agora"
													buttonActive={true}
													theme="production"
												/>
											</div>

											<div className="col-lg-4" id="painel-cards-wrapper">
												<Card
													id="perdas"
													title="Perdas"
													text="Monitorar dados de perdas de Campo Grande"
													link="/campo-grande/perdas"
													buttonText="Monitorar agora"
													buttonActive={true}
													theme="loss"
												/>
											</div>

										</div>

										<div className="row pb-3 px-3">
											<div className="col-lg-12" id="painel-cards-wrapper">
												<Card
													id="robo"
													title="Status do Robô"
													text="Monitoramento de status do robô em fase de testes"
													link="/campo-grande/monitoramento"
													buttonText="Monitorar agora"
													buttonActive={true}
													theme="robot"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="card">
								<div className="card-header" id="headingTwo">
									<h5 className="mb-0">
										<button className="btn" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
											<i className="material-icons pr-2 pb-1" id="painel-icon">menu</i>Irecê
									</button>
									</h5>
								</div>

								<div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
									<div className="card-body">
										<div className="row p-3">
											<div className="col-lg-4 mb-4" id="painel-cards-wrapper">
												<Card
													id="ambientais"
													title="Dados Ambientais"
													text="Monitorar dados ambientais de Irecê"
													link="/irece/ambientais"
													buttonText="Monitorar agora"
													buttonActive={true}
													theme="environmental"
												/>
											</div>

											<div className="col-lg-4 mb-4" id="painel-cards-wrapper">
												<Card
													id="producao"
													title="Dados de Produção"
													text="Monitorar dados de produção de Irecê"
													link="/irece/producao"
													buttonText="Monitorar agora"
													buttonActive={true}
													theme="production"
												/>
											</div>

											<div className="col-lg-4" id="painel-cards-wrapper">
												<Card
													id="perdas"
													title="Perdas"
													text="Monitorar dados de perdas de Irecê"
													link="/irece/perdas/mesas"
													buttonText="Monitorar agora"
													buttonActive={true}
													theme="loss"
												/>
											</div>

										</div>

										<div className="row pb-3 px-3">
											<div className="col-lg-12" id="painel-cards-wrapper">
												<Card
													id="robo"
													title="Status do Robô"
													text="Monitoramento de status do robô em desenvolvimento"
													link="#"
													buttonText="Monitorar agora"
													buttonActive={false}
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
