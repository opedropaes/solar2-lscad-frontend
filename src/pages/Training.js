import React, { Component } from 'react';
import Header from '../components/HeaderWrapper';
import Footer from '../components/FooterWrapper';
import FormButton from '../components/FormButton';
import verifyUser from '../services/userVerification';
import listTables from '../services/listDynamoTables';

import '../pages/styles/Home.css';

export default class Training extends Component {

	constructor(props) {
		super(props);
		this.state = {
			date: 0,
			tables: []
		}
	}

	_isMounted = false;
	_isUpdated = true;

	async componentDidMount() {
		const { AWS } = await verifyUser();
		const tables = await listTables(AWS);
		this._isMounted = true;
		this.refreshStatus({ tables });
		console.log(this.state)
	}

	refreshStatus = newStatusParameters => {
		const { tables } = newStatusParameters;
		this.setState({ tables });
	}

	configure = async () => {
		// Receber dados do formulario
		let response = await this.configureTrainingWithEnvironmentalVariables(/** variables */);
		return response;
	}

	configureTrainingWithEnvironmentalVariables = async variables => {
		// configurar com variables
	}

	renderTables = () => {
		this.state.tables.map(table => {
			return (
				<option value={table}>{table}</option>
			)
		})
	}

	async UNSAFE_componentWillUpdate(newProps, newState) {

		if (!this._isUpdated) {
			const { AWS } = await verifyUser();
			const tables = await listTables(AWS);
			this.refreshStatus({ tables });	
		}

	}

	componentDidUpdate() {
		this._isUpdated = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		return (
			<React.Fragment>
				<Header logged={true} fixed={false} marginBottom={false} ufv="irece" />
				<div className="container col-lg-12  p-0" id="inner-box">
					<main className="col-lg-12 p-5" role="main" id="main">
						<div className="container-fluid mb-1 mt-5 form-wrapper col-lg-12 col-md-12 col-sm-12">
							<div className="card col-md-6 mx-auto">
								<div className="card-title mx-auto">
									<h4 className="card-title mt-4">Configuração do treinamento</h4>
								</div>
								<div className="card-body col-lg-12 mx-auto">
									<form className="pl-0 form-group" onSubmit={this.configure}>

										<div className="form-group">
											<label htmlFor="date">Dados referentes ao dia:</label>
											<input type="number" name="date" id="date" className="form-control" placeholder="aaaammdd" required
												onInput={(e) => this.setState({ date: e.target.value })} />
										</div>

										<div className="row flex-row">
											<div className="form-group col-lg-6">
												<label htmlFor="id-modelo">Modelo de treinamento:</label>
												<select name="id-modelo" id="id-modelo" className="form-control" required>
													<option defaultValue value="1">1</option>
													<option value="2">2</option>
													<option value="3">3</option>
													<option value="4">4</option>
													<option value="5">5</option>
												</select>
											</div>
											<div className="form-group col-lg-6">
												<label htmlFor="id-tecnologia">Tecnologia da mesa:</label>
												<select name="id-tecnologia" id="id-tecnologia" className="form-control" required>
													<option defaultValue value="1">Silício microamorfo de baixa tensão</option>
													<option value="2">Silício microamorfo de alta tensão</option>
													<option value="3">Telureto de cadmio</option>
													<option value="4">Disseleneto de cobre, indio e galio</option>
													<option value="5">Silicio policristalino</option>
												</select>
											</div>
										</div>

										<div className="row flex-row">
											<div className="form-group col-lg-6">
												<label htmlFor="tabela-estacao">Tabela com dados ambientais</label>
												<select name="tabela-estacao" id="tabela-estacao" className="form-control" required>
													<option defaultValue value="1" className="text-muted">selecione</option>
													<ul>
													{ this.renderTables() }
													</ul>
												</select>
											</div>
											<div className="form-group col-lg-6">
												<label htmlFor="tabela-inversor">Tabela com dados de produção</label>
												<select name="tabela-inversor" id="tabela-inversor" className="form-control" required>
													<option defaultValue value="1" className="text-muted">selecione</option>
													{/* adicionar map que renderiza uma option pra cada tabela */}
												</select>
											</div>
										</div>

										<div className="row flex-row">
											<div className="form-group col-lg-6">
												<label htmlFor="tabela-modelo">Tabela com dados do modelo</label>
												<select name="tabela-modelo" id="tabela-modelo" className="form-control" required>
													<option defaultValue value="1" className="text-muted">selecione</option>
													{/* adicionar map que renderiza uma option pra cada tabela */}
												</select>
											</div>
											<div className="form-group col-lg-6">
												<label htmlFor="tabela-sujidade">Tabela para dados de sujidade</label>
												<select name="tabela-sujidade" id="tabela-sujidade" className="form-control" required>
													<option defaultValue value="1" className="text-muted">selecione</option>
													{/* adicionar map que renderiza uma option pra cada tabela */}
												</select>
											</div>
										</div>
										<FormButton loading={this.state.loading} label="Configurar" />
									</form>
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
