/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import Header from '../../components/HeaderWrapper';
import Footer from '../../components/FooterWrapper';
import LineChart from '../../components/LineChart';
// import BarChart from '../../components/BarChart';
import DoughnutChart from '../../components/DoughnutChart';
import TitleBar from '../../components/TitleBar';
import Navigator from '../../components/Navigator';
import Table from '../../components/Table';

import dateFormater from '../../utils/dateFormater';
import api from '../../services/api';

export default class LossPerTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			day: 0,
			yearMonth: 'carregando...',
			period: 'month',
			labels: [],
			data: [],
			isLoading: true
		};
	}

	_isMounted = false;
	_isUpdated = true;
	now = new Date();
	actualDay = this.now.getDate();
	actualMonth = this.now.getMonth() + 1;
	actualYear = this.now.getFullYear();

	componentDidMount() {

		let date = dateFormater(this.actualDay, this.actualMonth, this.actualYear);
		this._isMounted = true;
		this.fetchApiResponse(date);

	}

	fetchApiResponse = async (date) => {

		const path = (this.props.location.pathname === "/irece/perdas/mesas/perdas-totais") ? "/irece/perdas/mesas/total" : this.props.location.pathname;
		let { period } = this.state
		let apiResponse = await api.get(path + "/" + date + "/" + period);

		
		this.refreshState(apiResponse.data)
			.then(newStateObject => {
				if (this._isMounted || !this._isUpdated) {
					this.setState({
						day: newStateObject.day || this.actualDay,
						month: newStateObject.month,
						year: newStateObject.year,
						yearMonth: newStateObject.yearMonth,
						period: newStateObject.period,
						labels: newStateObject.interval,
						doughnutlabels: newStateObject.doughnutlabels || [0],
						data: newStateObject.data,
						dataForTable: newStateObject.dataForTable || [0],
						options: newStateObject.options,
						table: newStateObject.table,
						isLoading: (!newStateObject.interval.length)
					});
				}
			})
			.catch(err => {
				console.log(err)
			})


	}

	refreshState = async (res) => {

		let tablesLabel = ['#1: a-Si - Baixa tensão', '#2: a-Si - Alta tensão', '#3: CdTe', '#4: CIGS', '#5: p-Si', 'Total'];
		let tablesBackgroundColor = ['rgba(255,48,48, 0)', 'rgba(255,166,0,0)', 'rgba(66, 134, 244, 0)', 'rgba(50,172,92, 0)', 'rgba(255, 0, 140, 0)', 'rgba(66,161,245,1.0)'];
		let tablesBorderColor = ['rgba(255,48,48, 1.0)', 'rgba(255,166,0,1.0)', 'rgba(66, 134, 244, 1.0)', 'rgba(50,172,92, 1.0)', 'rgba(255, 0, 140, 1.0)', 'rgba(66,161,245,1.0)'];
		let tablesPointBackgroundColor = ['rgba(255,48,48, 0.7)', 'rgba(255,166,0,0.7)', 'rgba(66, 134, 244, 0.7)', 'rgba(50,172,92, 0.7)', 'rgba(255, 0, 140, 0.7)', 'rgba(66,161,245,0.7)'];

		if (res.table != "total" && res.table > 0 && res.table < 6) {

			let body = []
			let head = []

			for (let i = 0; i < res.completeDates.length; i++) {
				body.push([
					res.completeDates[i],
					res.idealProd[i],
					res.realProd[i],
					res.loss[i],
					res.lossPercentage[i],
					(res.viability[i]) ? "Viável" : "Não viável"
				])
			}

			head = [
				"Data",
				"Potência Esperada (kW)",
				"Potência Produzida (kW)",
				"Perdas (kW)", "Perdas (%)",
				"Viabilidade Econômica"
			]

			let dataForTable = { head, body }

			return ({

				month: res.month,
				year: res.year,
				yearMonth: res.yearMonth,
				period: res.period,
				interval: res.interval,
				doughnutlabels: res.comparationLabels,
				table: res.table,
				data: {
					table1: {
						data: res.idealProd,
						label: 'Produção esperada (kWh)',
						borderColor: 'rgba(29, 82, 168, 1.0)',
						backgroundColor: 'rgba(29, 82, 168, 0)',
						lineTension: 0,
						borderWidth: 3,
						pointBackgroundColor: 'rgba(29, 82, 168, 1.0)'
					},
					table2: {
						data: res.realProd,
						label: 'Produção real (kWh)',
						borderColor: 'rgba(247, 111, 91, 1.0)',
						backgroundColor: 'rgba(247, 111, 91, 0)',
						lineTension: 0,
						pointBackgroundColor: 'rgba(247, 111, 91, 1.0)'
					},
					table3: {
						data: res.comparation,
						label: 'Percentual de perdas em relação a produção',
						backgroundColor: ['rgba(29, 82, 168, 1.0)', 'rgba(247, 111, 91, 1.0)'],
					}
				},
				dataForTable,
				options: {
					animation: {
						duration: 1000,
					},
					title: {
						display: true,
						fontsize: 24,
						text: "Perdas mensais (kWh)",
					},
					labels: {
						fontStyle: 'bold',
					},
					scales: {
						yAxes: [{
							beginAtZero: true,
							position: "left",
							id: "performance"
						},

						],
						xAxes: [{
							beginAtZero: true,
							ticks: {
								callback: function (dataLabel, index) {
									return index % 2 === 0 ? dataLabel : '';
								},
								maxRotation: 0,
							}
						}]
					},
				},
				doughnutOptions: {
					animation: {
						duration: 1000,
					},
					title: {
						display: false,
						fontsize: 24,
						text: "Perdas e ganhos diários",
					},
					labels: {
						fontStyle: 'bold',
					},
					responsive: true,
				}

			})
		}

		else if (res.table === "total") {

			let body = []
			let head = []

			for (let i = 0; i < res.lossesRanking.length; i++) {
				body.push([
					res.lossesRanking[i].table,
					res.lossesRanking[i].loss,
					res.lossesRanking[i].averageProduction,
					res.lossesRanking[i].technology
				])
			}

			head = [
				"Mesa",
				"Perdas (%)",
				"Potência Média Produzida (kW)",
				"Tecnologia"
			]

			let dataForTable = { head, body }

			return ({

				month: res.month,
				year: res.year,
				yearMonth: res.yearMonth,
				period: res.period,
				interval: res.interval,
				table: res.table,
				dataForTable,
				data: {
					realProduction: {
						table1: {
							data: res.realProductionTable1,
							lineTension: 0,
							borderWidth: 1,
							borderHoverRadius: 7,
							label: tablesLabel[0],
							backgroundColor: tablesBackgroundColor[0],
							borderColor: tablesBorderColor[0],
							pointBackgroundColor: tablesPointBackgroundColor[0],
						},
						table2: {
							data: res.realProductionTable2,
							lineTension: 0,
							borderWidth: 1,
							borderHoverRadius: 7,
							label: tablesLabel[1],
							backgroundColor: tablesBackgroundColor[1],
							borderColor: tablesBorderColor[1],
							pointBackgroundColor: tablesPointBackgroundColor[1],
						},
						table3: {
							data: res.realProductionTable3,
							lineTension: 0,
							borderWidth: 1,
							borderHoverRadius: 7,
							label: tablesLabel[2],
							backgroundColor: tablesBackgroundColor[2],
							borderColor: tablesBorderColor[2],
							pointBackgroundColor: tablesPointBackgroundColor[2],
						},
						table4: {
							data: res.realProductionTable4,
							lineTension: 0,
							borderWidth: 1,
							borderHoverRadius: 7,
							label: tablesLabel[3],
							backgroundColor: tablesBackgroundColor[3],
							borderColor: tablesBorderColor[3],
							pointBackgroundColor: tablesPointBackgroundColor[3],
						},
						table5: {
							data: res.realProductionTable5,
							lineTension: 0,
							borderWidth: 1,
							borderHoverRadius: 7,
							label: tablesLabel[4],
							backgroundColor: tablesBackgroundColor[4],
							borderColor: tablesBorderColor[4],
							pointBackgroundColor: tablesPointBackgroundColor[4],
						}
					},
					lossesPercentagePerTable: {
						table1: {
							data: res.lossPercentageTable1,
							lineTension: 0,
							borderWidth: 1,
							borderHoverRadius: 7,
							label: tablesLabel[0],
							backgroundColor: tablesBackgroundColor[0],
							borderColor: tablesBorderColor[0],
							pointBackgroundColor: tablesPointBackgroundColor[0],
						},
						table2: {
							data: res.lossPercentageTable2,
							lineTension: 0,
							borderWidth: 1,
							borderHoverRadius: 7,
							label: tablesLabel[1],
							backgroundColor: tablesBackgroundColor[1],
							borderColor: tablesBorderColor[1],
							pointBackgroundColor: tablesPointBackgroundColor[1],
						},
						table3: {
							data: res.lossPercentageTable3,
							lineTension: 0,
							borderWidth: 1,
							borderHoverRadius: 7,
							label: tablesLabel[2],
							backgroundColor: tablesBackgroundColor[2],
							borderColor: tablesBorderColor[2],
							pointBackgroundColor: tablesPointBackgroundColor[2],
						},
						table4: {
							data: res.lossPercentageTable4,
							lineTension: 0,
							borderWidth: 1,
							borderHoverRadius: 7,
							label: tablesLabel[3],
							backgroundColor: tablesBackgroundColor[3],
							borderColor: tablesBorderColor[3],
							pointBackgroundColor: tablesPointBackgroundColor[3],
						},
						table5: {
							data: res.lossPercentageTable5,
							lineTension: 0,
							borderWidth: 1,
							borderHoverRadius: 7,
							label: tablesLabel[4],
							backgroundColor: tablesBackgroundColor[4],
							borderColor: tablesBorderColor[4],
							pointBackgroundColor: tablesPointBackgroundColor[4],
						}
					},
					totalLosses: {
						data: res.totalLosses,
						label: 'Total (kWh)',
						lineTension: 0,
						borderWidth: 3,
						borderHoverRadius: 7,
						backgroundColor: tablesBackgroundColor[0],
						borderColor: tablesBorderColor[0],
						pointBackgroundColor: tablesPointBackgroundColor[0],
					}
				},
				options: {
					productionOptions: {
						animation: {
							duration: 1000,
						},
						title: {
							display: true,
							fontsize: 24,
							text: "Produções mensais (kWh)",
						},
						labels: {
							fontStyle: 'bold',
						},
						scales: {
							yAxes: [{
								beginAtZero: true,
							},

							],
							xAxes: [{
								beginAtZero: true,
								ticks: {
									callback: function (dataLabel, index) {
										return index % 2 === 0 ? dataLabel : '';
									},
									maxRotation: 0,
								}
							}]
						},
					},
					lossesPerTableOptions: {
						animation: {
							duration: 1000,
						},
						title: {
							display: true,
							fontsize: 24,
							text: "Perdas mensais por mesa (%)",
						},
						labels: {
							fontStyle: 'bold',
						},
						scales: {
							yAxes: [{
								beginAtZero: true,
								position: "left",
								id: "performance"
							},

							],
							xAxes: [{
								beginAtZero: true,
								ticks: {
									callback: function (dataLabel, index) {
										return index % 2 === 0 ? dataLabel : '';
									},
									maxRotation: 0,
								}
							}]
						},
					},
					totalLossesOptions: {
						animation: {
							duration: 1000,
						},
						title: {
							display: true,
							fontsize: 24,
							text: "Perdas mensais totais (kWh)",
						},
						labels: {
							fontStyle: 'bold',
						},
						scales: {
							yAxes: [{
								beginAtZero: true,
								position: "left",
								id: "performance"
							},

							],
							xAxes: [{
								beginAtZero: true,
								ticks: {
									callback: function (dataLabel, index) {
										return index % 2 === 0 ? dataLabel : '';
									},
									maxRotation: 0,
								}
							}]
						},
					}
				}

			})
		}

	}

	decrementDate = () => {

		let day = this.state.day;
		let month = this.state.month;
		let year = this.state.year;

		if (year >= 2018 && month >= 1) {

			if (month == 1) {
				month = 12;
				year--;
			} else {
				month--;
			}

			this.setState({
				day,
				month,
				year
			});

			this._isUpdated = false;

		}

	}

	incrementDate = () => {

		let day = this.state.day;
		let month = this.state.month;
		let year = this.state.year;

		if (year < this.actualYear ||
			(year == this.actualYear && month < this.actualMonth)) {

			if (month == 12) {
				month = 1;
				year++;
			} else {
				month++;
			}

			this.setState({
				day,
				month,
				year
			});

			this._isUpdated = false;

		}

	}

	UNSAFE_componentWillUpdate(newProps, newState) {

		if (!this._isUpdated) {
			let date = dateFormater(newState.day, newState.month, newState.year);
			this.fetchApiResponse(date);
		}

	}

	componentDidUpdate() {
		this._isUpdated = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		if (this.props.location.pathname !== "/irece/perdas/mesas/perdas-totais") {
			if (!this.state.isLoading) {

				let lossPercentage = "Perdas neste mês: 0%";
				if (!isNaN(this.state.data.table3.data[1])) {
					lossPercentage = "Perdas neste mês: " + parseFloat(this.state.data.table3.data[1]).toFixed(2) + "%";
				}

				return (
					<React.Fragment>
						<Header logged={true} fixed={false} marginBottom={true} ufv="irece" />
						<div className="row">
							<div className="col-11 mx-auto">
								<main className="col-lg-12 mx-auto " role="main" id="main">

									<TitleBar text={"Perdas: Mesa " + this.state.table} lossPercentage={lossPercentage} theme="losses" />
									<Navigator date={this.state.yearMonth} handlePrevDateNavigation={this.decrementDate} handleNextDateNavigation={this.incrementDate} />

									<div className="row m-4 px-0 py-0" id="row-chart">
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-1">
											<LineChart
												data={{ labels: this.state.labels, datasets: [this.state.data.table1, this.state.data.table2] }}
												options={this.state.options}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-2">
											<DoughnutChart
												data={{ labels: this.state.doughnutlabels, datasets: [this.state.data.table3] }}
												options={this.state.doughnutOptions}
											/>
										</div>
									</div>
									<div className="row p-0">
										<Table head={this.state.dataForTable.head} body={this.state.dataForTable.body} />
									</div>

								</main>
							</div>
						</div>
						<Footer />
					</React.Fragment>
				);

			} else {
				return (
					<React.Fragment>
						<Header logged={true} fixed={false} marginBottom={true} ufv="irece" />
						<div className="row">
							<div className="col-11 mx-auto">
								<main className="col-lg-12 mx-auto p-0" role="main" id="main">

									<TitleBar text="Perdas" theme="losses" />
									<Navigator date={this.state.monthDay} handlePrevDateNavigation={this.decrementDate} handleNextDateNavigation={this.incrementDate} />

									<div className="row m-4 px-0 py-0" id="row-chart">
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-1">
											<LineChart
												data={{ labels: [], datasets: [] }}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-2">
											<DoughnutChart
												data={{ labels: [], datasets: [] }}
											/>
										</div>
									</div>

								</main>

							</div>
						</div>
						<Footer />
					</React.Fragment>
				)
			}
		}

		else if (this.props.location.pathname === "/irece/perdas/mesas/perdas-totais") {
			if (!this.state.isLoading) {

				// let lossPercentage = "Perdas neste mês: 0%";
				// if (!isNaN(this.state.data.table3.data[1])) {
				// 	lossPercentage = "Perdas neste mês: " + parseFloat(this.state.data.table3.data[1]).toFixed(2) + "%";
				// }

				return (
					<React.Fragment>
						<Header logged={true} fixed={false} marginBottom={true} ufv="irece" />
						<div className="row">
							<div className="col-11 mx-auto">
								<main className="col-lg-12 mx-auto " role="main" id="main">

									<TitleBar text={"Perdas: Mesa " + this.state.table} theme="losses" />
									<Navigator date={this.state.yearMonth} handlePrevDateNavigation={this.decrementDate} handleNextDateNavigation={this.incrementDate} />

									<div className="row m-4 px-0 py-0" id="row-chart">
										<div className="col-md-10 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-0">
											<LineChart
												data={{ labels: this.state.labels, datasets: [this.state.data.totalLosses] }}
												options={this.state.options.totalLossesOptions}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-1">
											<LineChart
												data={{ 
													labels: this.state.labels,
													datasets: [
														this.state.data.realProduction.table1,
														this.state.data.realProduction.table2,
														this.state.data.realProduction.table3,
														this.state.data.realProduction.table4,
														this.state.data.realProduction.table5
													] }}
												options={this.state.options.productionOptions}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-2">
											<LineChart
												data={{ 
													labels: this.state.labels,
													datasets: [
														this.state.data.lossesPercentagePerTable.table1,
														this.state.data.lossesPercentagePerTable.table2,
														this.state.data.lossesPercentagePerTable.table3,
														this.state.data.lossesPercentagePerTable.table4,
														this.state.data.lossesPercentagePerTable.table5,
													] }}
												options={this.state.options.lossesPerTableOptions}
											/>
										</div>
									</div>
									<div className="h6 text-center border-top">
										<p className="mt-4">
											Ranking de perdas mensais por mesa
										</p>
									</div>
									<div className="row p-0">
										<Table head={this.state.dataForTable.head} body={this.state.dataForTable.body} />
									</div>

								</main>
							</div>
						</div>
						<Footer />
					</React.Fragment>
				);

			} else {
				return (
					<React.Fragment>
						<Header logged={true} fixed={false} marginBottom={true} ufv="irece" />
						<div className="row">
							<div className="col-11 mx-auto">
								<main className="col-lg-12 mx-auto p-0" role="main" id="main">

									<TitleBar text="Perdas" theme="losses" />
									<Navigator date={this.state.monthDay} handlePrevDateNavigation={this.decrementDate} handleNextDateNavigation={this.incrementDate} />

									<div className="row m-4 px-0 py-0" id="row-chart">
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-1">
											<LineChart
												data={{ labels: [], datasets: [] }}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-2">
											<DoughnutChart
												data={{ labels: [], datasets: [] }}
											/>
										</div>
									</div>

								</main>

							</div>
						</div>
						<Footer />
					</React.Fragment>
				)
			}
		}
	}
}
