/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import Header from '../components/HeaderWrapper';
import Footer from '../components/FooterWrapper';
import FormButton from '../components/FormButton';
import DynamoDBTables from '../components/DynamoDBTables';
import DynamoDBAttributes from '../components/DynamoDBAttributes';
import verifyUser from '../services/userVerification';
import listTables from '../services/listDynamoTables';

import '../pages/styles/Home.css';

export default class Training extends Component {

	constructor(props) {
		super(props);
		this.state = {
			date: 0,
			tables: [],
			selecting: 'none',
			powerVariables: ['selecione uma tabela antes'],
			envVariables: ['selecione uma tabela antes'],
			modelVariables: ['selecione uma tabela antes']
		}
	}

	async componentDidMount() {
		const { AWS } = await verifyUser();
		const tables = await listTables(AWS);
		this.refreshStatus({ tables });
		this.getFunctionConfiguration();
	}

	getFunctionConfiguration = async () => {
		const { AWS } = await verifyUser();
		const lambdaClient = new AWS.Lambda();

		const params = {
			FunctionName: 'dev-prediction-me-treinamento',
			Qualifier: '1'
		};

		const functionConfigurationRequest = await lambdaClient.getFunction(params, (err, data) => {
			if (err) {
				console.info(err.stack);
				return err.stack;
			} else {
				return data;
			}
		});

		// const functionConfigurationResponse = await functionConfigurationRequest;

		// console.log(functionConfigurationResponse)
	}

	refreshStatus = newStatusParameters => {
		const { tables } = newStatusParameters;
		this.setState({ tables });
	}

	handleSubmit = e => {

		e.preventDefault();

		const beginDate = document.getElementById('begin-date').value;
		const endDate = document.getElementById('end-date').value;

		const modelID = document.getElementById('id-modelo').value;
		const technology = document.getElementById('id-tecnologia').value;

		const stationSelector = document.getElementById('tabela-estacao');
		const station = stationSelector.options[stationSelector.selectedIndex].value;

		const inverterSelector = document.getElementById('tabela-inversor');
		const inverter = inverterSelector.options[inverterSelector.selectedIndex].value;

		const modelTableSelector = document.getElementById('tabela-modelo');
		const modelTable = modelTableSelector.options[modelTableSelector.selectedIndex].value;

		const firstIndependentVariableSelector = document.getElementById('variavel-ind-1');
		const firstIndependentVariable = firstIndependentVariableSelector.options[firstIndependentVariableSelector.selectedIndex].value;

		const secondIndependentVariableSelector = document.getElementById('variavel-ind-2');
		const secondIndependentVariable = secondIndependentVariableSelector.options[secondIndependentVariableSelector.selectedIndex].value;

		const independentVariables = `${firstIndependentVariable}:${secondIndependentVariable}`;

		const dependentVariableSelector = document.getElementById('variavel-dep');
		const dependentVariable = dependentVariableSelector.options[dependentVariableSelector.selectedIndex].value;

		const powerVariableSelector = document.getElementById('var-pot');
		const powerVariable = powerVariableSelector.options[powerVariableSelector.selectedIndex].value;

		const irradiationVariableSelector = document.getElementById('var-pot');
		const irradiationVariable = irradiationVariableSelector.options[irradiationVariableSelector.selectedIndex].value;

		const powerAndIrradiationVariables = `${powerVariable}:${irradiationVariable}`;

		const params = { beginDate, endDate, modelID, technology, station, inverter, modelTable, independentVariables, dependentVariable, powerAndIrradiationVariables };

		this.setState({ beginDate, endDate, modelID, technology, station, inverter, modelTable, independentVariables, dependentVariable, powerAndIrradiationVariables });

		this.configure(params);
		// dar um jeito de pegar os atributos de cada tabela conforme o usuario escolher a tabela no formulario.

	}

	configure = async (params) => {

		const { beginDate, endDate, modelID, technology, station, inverter, modelTable, independentVariables, dependentVariable, powerAndIrradiationVariables } = params;

		if (beginDate <= endDate) {
			const environmentalVariables = {
				'DATA_F': endDate,
				'DATA_I': beginDate,
				'ID_MODELO': modelID,
				'ID_TECNOLOGIA': technology,
				'TABELA_AMBIENTAL': station,
				'TABELA_INVERSOR': inverter,
				'TABELA_MODELO': modelTable,
				'VARIAVEIS_IND': independentVariables,
				'VARIAVEL_DEP': dependentVariable,
				'VARS_POT_IRRAD': powerAndIrradiationVariables,
			};



			// let response = await this.configureTrainingWithEnvironmentalVariables(environmentalVariables);

			// if (response) {
			// 	alert("Variáveis configuradas com sucesso.");
			// } else {
			// 	alert("Falha ao configurar variáveis. Verifique os campos e tente novamente.");
			// }

			// return response;
		}

		else {
			alert("Data inicial não pode ser maior que data final!");
			return { err: "incompatibleDates" };
		}

	}

	configureTrainingWithEnvironmentalVariables = async variables => {
		const { AWS } = await verifyUser();
		const lambdaClient = new AWS.Lambda();

		const params = {
			FunctionName: 'dev-prediction-me-treinamento',
			Environment: {
				Variables: { ...variables }
			}
		};

		const lambdaConfigurationInvoking = await lambdaClient.updateFunctionConfiguration(params, (err, data) => {
			if (err) {
				console.info(err.stack);
				return err;
			} else {
				return data;
			}
		});

		const lambdaConfigurationResponse = await lambdaConfigurationInvoking;

		console.log(lambdaConfigurationResponse)

		if (lambdaConfigurationResponse.httpResponse) {
			return true;
		} else return false;

	}

	renderTables = () => {
		this.state.tables.map(table => {
			return (
				<option value={table}>{table}</option>
			)
		})
	}

	getTableAttributes = async () => {

		const { selecting, powerVariables, envVariables } = this.state;
		const { AWS } = await verifyUser();

		const dynamoClient = AWS.DynamoDB();

		let tableToDescribe = "";

		if (selecting === "tabela-estacao") {
			tableToDescribe = this.state.station;
		} else if (selecting === "tabela-inversor") {
			tableToDescribe = this.state.inverter;
		} else if (selecting === "tabela-modelo") {
			tableToDescribe = this.state.modelTable;
		}

		const params = { TableName: tableToDescribe };

		const dynamoRequest = new Promise ((resolve, reject) => {
			dynamoClient.describeTable(params, (err, data) => {
				if (err) {
					console.log(err.stack);
					reject(err);
				} else {
					resolve(data);
				}
			});
		});

		dynamoRequest.then(response => {
			
			let attributes = [];
			
			response.Table.AttributeDefinitions.map(att => {
				attributes.push(att.AttributeName);
			})
			
			if (selecting === "tabela-estacao") {
				this.setState({ envVariables: attributes });
			} else if (selecting === "tabela-inversor") {
				this.setState({ powerVariables: attributes });
			} else if (selecting === "tabela-modelo") {
				this.setState({ modelVariables: attributes });
			}	
		});

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
									<form className="pl-0 form-group" onSubmit={this.handleSubmit}>

										<div className="row flex-row">
											<div className="form-group col-lg-6">
												<label htmlFor="begin-date">Data de inicio do treinamento</label>
												<input type="number" name="begin-date" id="begin-date" className="form-control" placeholder="aaaammdd" required
													onInput={(e) => this.setState({ beginDate: e.target.value })} />
											</div>
											<div className="form-group col-lg-6">
												<label htmlFor="end-date">Data de finalização do treinamento</label>
												<input type="number" name="end-date" id="end-date" className="form-control" placeholder="aaaammdd" required
													onInput={(e) => this.setState({ endDate: e.target.value })} />
											</div>
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
												<select name="tabela-estacao" id="tabela-estacao" className="form-control" onChange={this.getTableAttributes} onMouseOver={ this.setState({ selecting: "tabela-estacao" }) } required>
													<option defaultValue value="none" className="text-muted">selecione</option>
													<DynamoDBTables tables={this.state.tables} />
												</select>
											</div>
											<div className="form-group col-lg-6">
												<label htmlFor="tabela-inversor">Tabela com dados de produção</label>
												<select name="tabela-inversor" id="tabela-inversor" className="form-control" onChange={this.getTableAttributes} onMouseOver={ this.setState({ selecting: "tabela-inversor" }) }  required>
													<option defaultValue value="none" className="text-muted">selecione</option>
													<DynamoDBTables tables={this.state.tables} />
												</select>
											</div>
										</div>

										<div className="row flex-row">
											<div className="form-group col-lg-12">
												<label htmlFor="tabela-modelo">Tabela com dados do modelo</label>
												<select name="tabela-modelo" id="tabela-modelo" className="form-control" onChange={this.getTableAttributes} onMouseOver={ this.setState({ selecting: "tabela-modelo" }) }  required>
													<option defaultValue value="none" className="text-muted">selecione</option>
													<DynamoDBTables tables={this.state.tables} />
												</select>
											</div>
										</div>

										<div className="row flex-row">
											<h6 className="form-group col-lg-12">Variáveis independentes</h6>
											<div className="form-group col-lg-6" name="variavel-ind">
												<select name="variavel-ind-1" id="variavel-ind-1" className="form-control" required>
													<option defaultValue value="none" className="text-muted">selecione</option>
													<DynamoDBAttributes attributes={this.state.powerVariables} />
												</select>
											</div>
											<div className="form-group col-lg-6" name="variavel-ind">
												<select name="variavel-ind-2" id="variavel-ind-2" className="form-control" required>
													<option defaultValue value="none" className="text-muted">selecione</option>
													<DynamoDBAttributes attributes={this.state.envVariables} />
												</select>
											</div>
										</div>

										<div className="row flex-row">
											<div className="form-group col-lg-12">
												<label htmlFor="variavel-dep">Variavel Dependente</label>
												<select name="variavel-dep" id="variavel-dep" className="form-control" required>
													<option defaultValue value="none" className="text-muted">selecione</option>
													<DynamoDBAttributes attributes={this.state.powerVariables} />
												</select>
											</div>
										</div>

										<div className="row flex-row">
											<h6 className="form-group col-lg-12">Variáveis de potẽncia e irradiação</h6>
											<div className="form-group col-lg-6" name="var-pot-irr">
												<select id="var-pot" className="form-control" required>
													<option defaultValue value="none" className="text-muted">potência</option>
													<DynamoDBAttributes attributes={this.state.powerVariables} />
												</select>
											</div>
											<div className="form-group col-lg-6" name="var-pot-irr">
												<select id="var-irr" className="form-control" required>
													<option defaultValue value="none" className="text-muted">irradiação</option>
													<DynamoDBAttributes attributes={this.state.envVariables} />
												</select>
											</div>
										</div>

										<FormButton loading={this.state.loading} label="Configurar" />
										<div className="text-center">
											<span><small>Em desenvolvimento</small></span>
										</div>
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
