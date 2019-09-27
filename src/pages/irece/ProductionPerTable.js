/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import TitleBar from '../../components/TitleBar';
import Navigator from '../../components/Navigator';
import Header from '../../components/HeaderWrapper';
import Footer from '../../components/FooterWrapper';
import IndividualProductionCharts from './IndividualProductions';
import TotalProductionsChart from './TotalDailyProduction';
import LineChart from '../../components/LineChart';
import DoughnutChart from '../../components/DoughnutChart';
import BarChart from '../../components/BarChart';

import api from '../../services/api';

import dateFormater from '../../utils/dateFormater';
import howManyDaysThisMonth from '../../utils/daysInMonthDefiner';

export default class ProductionPerTable extends Component {

	constructor(props) {
		super(props);

		this.state = {
			day: 0,
			monthDay: 'carregando...',
			period: 'day',
			labels: [],
			data: [],
			isLoading: true
		};

	}

	_isMounted = false;
	_isUpdated = true;
	now = new Date();
	actualDay = this.now.getDate();
	// actualDay = 1;
	actualMonth = this.now.getMonth() + 1;
	actualYear = this.now.getFullYear();

	componentDidMount() {

		let date = dateFormater(this.actualDay, this.actualMonth, this.actualYear);
		this._isMounted = true;
		this.fetchApiResponse(date, 'day');

	}

	fetchApiResponse = async (date, period) => {

		let path = this.props.location.pathname;

		path = (path == "/irece/producao/mesas/total") ? "/irece/producao/mesas/6" : path

		let apiResponse = await api.get(path + '/' + date + '/' + period);
		let { table } = apiResponse.data

		let newStateObject = await this.refreshState(apiResponse.data, table, period);

		if (this._isMounted || !this._isUpdated) {
			this.setState({
				table,
				day: newStateObject.day,
				month: newStateObject.month,
				year: newStateObject.year,
				monthDay: newStateObject.monthDay,
				period: newStateObject.period,
				labels: newStateObject.interval,
				data: newStateObject.data,
				options: newStateObject.options,
				isLoading: (!newStateObject.interval.length)
			});

		}

	}

	refreshState = async (res, table, period) => {

		let tablesLabel = ['#1: a-Si - Baixa tensão', '#2: a-Si - Alta tensão', '#3: CdTe', '#4: CIGS', '#5: p-Si', 'Total'];
		let tablesBackgroundColor = ['rgba(255,48,48, 0)', 'rgba(255,166,0,0)', 'rgba(66, 134, 244, 0)', 'rgba(50,172,92, 0)', 'rgba(255, 0, 140, 0)', 'rgba(66,161,245,1.0)'];
		let tablesBorderColor = ['rgba(255,48,48, 1.0)', 'rgba(255,166,0,1.0)', 'rgba(66, 134, 244, 1.0)', 'rgba(50,172,92, 1.0)', 'rgba(255, 0, 140, 1.0)', 'rgba(66,161,245,1.0)'];
		let tablesPointBackgroundColor = ['rgba(255,48,48, 0.7)', 'rgba(255,166,0,0.7)', 'rgba(66, 134, 244, 0.7)', 'rgba(50,172,92, 0.7)', 'rgba(255, 0, 140, 0.7)', 'rgba(66,161,245,0.7)'];

		if (period == "day") {
			if (table < 6) {

				return ({
					day: res.day,
					month: res.month,
					year: res.year,
					monthDay: res.monthDay,
					period: res.period,
					interval: res.interval,
					table: res.table,
					data: {
						production: {
							data: res.production,
							lineTension: 0,
							label: tablesLabel[res.table - 1],
							backgroundColor: 'rgba(66,161,245,0)',
							borderColor: 'rgba(66,161,245,1.0)',
							pointBackgroundColor: 'rgba(66,161,245,1.0)',
							borderWidth: 3,
							yAxisID: "performance",
							borderHoverRadius: 7,
						},
						capacityFactor: {
							data: res.capacityFactor,
							lineTension: 0,
							label: 'Capacidade da mesa ' + res.table,
							borderColor: 'rgba(255,48,48,1.0)',
							backgroundColor: 'rgba(255,48,48,0)',
							borderWidth: 3,
							yAxisID: "capacity",
							borderHoverRadius: 7,
						},
						alternateCurrent: {
							data: res.alternateCurrent,
							lineTension: 0,
							label: 'Corrente alternada (A)',
							backgroundColor: 'rgba(255,48,48, 0)',
							borderColor: 'rgba(255,48,48, 1.0)',
							pointBackgroundColor: 'rgba(255,48,48, 0.7)',
							borderWidth: 3,
							borderHoverRadius: 7,
						},
						continuousCurrent: {
							data: res.continuousCurrent,
							lineTension: 0,
							label: 'Corrente contínua (A)',
							backgroundColor: 'rgba(255,166,0,0)',
							borderColor: 'rgba(255,166,0,1.0)',
							pointBackgroundColor: 'rgba(255,166,0, 0.7)',
							borderWidth: 3,
							borderHoverRadius: 7,
						},
						alternateVoltage: {
							data: res.alternateVoltage,
							lineTension: 0,
							label: 'Tensão alternada (V)',
							backgroundColor: 'rgba(66, 134, 244, 0)',
							borderColor: 'rgba(66, 134, 244, 1.0)',
							pointBackgroundColor: 'rgba(66, 134, 244, 0.7)',
							borderWidth: 3,
							borderHoverRadius: 7,
						},
						continuousVoltage: {
							data: res.continuousVoltage,
							lineTension: 0,
							label: 'Tensão contínua (V)',
							backgroundColor: 'rgba(50,172,92, 0)',
							borderColor: 'rgba(50,172,92, 1.0)',
							pointBackgroundColor: 'rgba(50,172,92, 0.7)',
							borderWidth: 3,
							borderHoverRadius: 7,
						},
					},
					options: {
						generalOptions: {
							animation: {
								duration: 1000,
							},
							title: {
								display: true,
								fontsize: 24,
							},
							labels: {
								fontStyle: 'bold',
							},
							scales: {
								yAxes: [{
									beginAtZero: true,
									position: "left",
								},

								],
								xAxes: [{
									beginAtZero: true,
									ticks: {
										callback: function (dataLabel, index) {
											return index % 8 === 0 ? dataLabel : '';
										},
										maxRotation: 0,
									}
								}]
							},
						},
						productionOptions: {
							animation: {
								duration: 1000,
							},
							title: {
								display: true,
								fontsize: 24,
								text: "Potência e performance (kW)",
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
								{
									beginAtZero: true,
									position: "right",
									id: "capacity"
								},

								],
								xAxes: [{
									beginAtZero: true,
									ticks: {
										callback: function (dataLabel, index) {
											return index % 8 === 0 ? dataLabel : '';
										},
										maxRotation: 0,
									}
								}]
							},
						}
					}
				})

			}

			else if (table == 6) {

				return ({
					day: res.day || this.actualDay,
					month: res.month || this.actualMonth,
					year: res.year,
					monthDay: res.monthDay,
					period: res.period,
					interval: res.interval,
					data: {
						table1: {
							data: res.table1,
							lineTension: 0,
							borderWidth: 3,
							borderHoverRadius: 7,
							label: tablesLabel[0],
							backgroundColor: tablesBackgroundColor[0],
							borderColor: tablesBorderColor[0],
							pointBackgroundColor: tablesPointBackgroundColor[0],
						},
						table2: {
							data: res.table2,
							lineTension: 0,
							borderWidth: 3,
							borderHoverRadius: 7,
							label: tablesLabel[1],
							backgroundColor: tablesBackgroundColor[1],
							borderColor: tablesBorderColor[1],
							pointBackgroundColor: tablesPointBackgroundColor[1],
						},
						table3: {
							data: res.table3,
							lineTension: 0,
							borderWidth: 3,
							borderHoverRadius: 7,
							label: tablesLabel[2],
							backgroundColor: tablesBackgroundColor[2],
							borderColor: tablesBorderColor[2],
							pointBackgroundColor: tablesPointBackgroundColor[2],
						},
						table4: {
							data: res.table4,
							lineTension: 0,
							borderWidth: 3,
							borderHoverRadius: 7,
							label: tablesLabel[3],
							backgroundColor: tablesBackgroundColor[3],
							borderColor: tablesBorderColor[3],
							pointBackgroundColor: tablesPointBackgroundColor[3],
						},
						table5: {
							data: res.table5,
							lineTension: 0,
							borderWidth: 3,
							borderHoverRadius: 7,
							label: tablesLabel[4],
							backgroundColor: tablesBackgroundColor[4],
							borderColor: tablesBorderColor[4],
							pointBackgroundColor: tablesPointBackgroundColor[4],
						},
						tableSum: {
							data: res.table6,
							lineTension: 0,
							borderWidth: 3,
							borderHoverRadius: 7,
							label: tablesLabel[5],
							backgroundColor: tablesBackgroundColor[5],
							borderColor: tablesBorderColor[5],
							pointBackgroundColor: tablesPointBackgroundColor[5],
						},
					},
					options: {
						totalOptions: {
							animation: {
								duration: 1000,
							},
							title: {
								display: true,
								fontsize: 24,
								text: "Potência total (kW)",
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
											return index % 8 === 0 ? dataLabel : '';
										},
										maxRotation: 0,
									}
								}]
							},
						},
						comparisonOptions: {
							animation: {
								duration: 1000,
							},
							title: {
								display: true,
								fontsize: 24,
								text: "Potências individuais (kW)",
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
											return index % 8 === 0 ? dataLabel : '';
										},
										maxRotation: 0,
									}
								}]
							},
						}
					}

				})

			}

			else {
				return ({
					day: this.actualDay,
					month: this.actualMonth,
					year: this.actualYear,
					monthDay: this.actualDay + "/" + this.actualMonth + "/" + this.actualYear,
					period: 'day',
					interval: [0],
					data: {
						tableData: {
							data: [0],
							lineTension: 0,
							label: 'undefined',
							backgroundColor: 'rgba(255,48,48, 0)',
							borderColor: 'rgba(255,48,48, 1.0)',
							pointBackgroundColor: 'rgba(255,48,48, 0.7)',
						},
					},
					options: {
						animation: {
							duration: 1000,
						},
						title: {
							display: true,
							fontsize: 24,
							text: "undefined",
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
										return index % 8 === 0 ? dataLabel : '';
									},
									maxRotation: 0,
								}
							}]
						},
					}

				})
			}
		}

		else if (res.period == "month") {
			if (table < 6) {
				return ({
					day: this.actualDay,
					month: res.month,
					year: res.year,
					monthDay: res.monthDay,
					period: res.period,
					interval: res.interval,
					data: {
						table1: {
							data: res.averages,
							lineTension: 0,
							label: 'Potência média produziada +' + tablesLabel[res.table - 1] + ' (kWh)',
							backgroundColor: 'rgba(66,161,245,1.0)',
							borderColor: 'rgba(66,161,245,1.0)',
							pointBackgroundColor: 'rgba(66,161,245,1.0)',
							borderWidth: 3,
							yAxisID: "performance",
						},
						table2: {
							data: res.performanceRatioComparison,
							lineTension: 0,
							label: 'Percentual de performance ratio em relação ao ideal mensal',
							backgroundColor: ['rgba(255,166,0,1.0)', 'rgba(66,161,245,0)'],
							borderColor: ['rgba(255,166,0,1.0)', 'rgba(66,161,245,0)'],
						},
						table3: {
							data: res.capacityFactor,
							lineTension: 0,
							label: 'Percentual médio de fator de capacidade',
							backgroundColor: 'rgba(50,172,92,1.0)',
							borderColor: 'rgba(50,172,92,1.0)',
							pointBackgroundColor: 'rgba(50,172,92,1.0)'
						},
						table4: {
							data: res.productions,
							lineTension: 0,
							label: 'Produção total diária (kW)',
							backgroundColor: 'rgba(255,48,48,1.0)',
							borderColor: 'rgba(255,48,48,1.0)',
							pointBackgroundColor: 'rgba(255,48,48,0.7)',
						},
						table5: {
							data: res.performances,
							lineTension: 0,
							label: 'Performance ratio diária',
							borderColor: 'rgba(255,48,48,1.0)',
							backgroundColor: 'rgba(255,48,48,0)',
							borderWidth: 3,
							yAxisID: "capacidade",
							type: 'line'
						}
					},
					options: {
						barOptions: {
							animation: {
								duration: 1000,
							},
							title: {
								display: true,
								fontsize: 24,
								text: "Produção",
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
								{
									beginAtZero: false,
									position: "right",
									id: "capacidade"
								}

								],
								xAxes: [{
									beginAtZero: true,
									ticks: {
										callback: function (dataLabel, index) {
											return index % 4 === 0 ? dataLabel : '';
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
								text: "Percentual de performance mensal",
							},
							labels: {
								fontStyle: 'bold',
							},
							responsive: true,
						}
					}

				})
			}

			else if (table == 6) {
				return ({
					day: this.actualDay,
					month: res.month,
					year: res.year,
					monthDay: res.monthDay,
					period: res.period,
					interval: res.interval,
					data: {
						table1: {
							data: res.table1,
							lineTension: 0,
							label: 'Potência média produziada ' + tablesLabel[0] + ' (kWh)',
							backgroundColor: 'rgba(255,48,48, 1.0)',
							borderColor: 'rgba(255,48,48, 0)',
							pointBackgroundColor: 'rgba(255,48,48, 0.7)',
							borderWidth: 1
						},
						table2: {
							data: res.table2,
							lineTension: 0,
							label: 'Potência média produziada ' + tablesLabel[1] + ' (kWh)',
							backgroundColor: 'rgba(255,166,0,1.0)',
							borderColor: 'rgba(255,166,0,0)',
							pointBackgroundColor: 'rgba(255,166,0,0.7)',
							borderWidth: 1

						},
						table3: {
							data: res.table3,
							lineTension: 0,
							label: 'Potência média produziada ' + tablesLabel[2] + ' (kWh)',
							backgroundColor: 'rgba(66, 134, 244, 1.0)',
							borderColor: 'rgba(66, 134, 244, 1.0)',
							pointBackgroundColor: 'rgba(66, 134, 244, 0.7)',
							borderWidth: 1

						},
						table4: {
							data: res.table4,
							lineTension: 0,
							label: 'Potência média produziada ' + tablesLabel[3] + ' (kWh)',
							backgroundColor: 'rgba(50,172,92, 1.0)',
							borderColor: 'rgba(50,172,92, 1.0)',
							pointBackgroundColor: 'rgba(50,172,92, 0.7)',
							borderWidth: 1

						},
						table5: {
							data: res.table5,
							lineTension: 0,
							label: 'Potência média produziada ' + tablesLabel[4] + ' (kWh)',
							backgroundColor: 'rgba(255, 0, 140, 1.0)',
							borderColor: 'rgba(255, 0, 140, 1.0)',
							pointBackgroundColor: 'rgba(255, 0, 140, 0.7)',
							borderWidth: 1

						},
						table6: {
							data: res.table6,
							lineTension: 0,
							label: 'Potência total produziada (kWh)',
							backgroundColor: tablesBackgroundColor[5],
							borderColor: tablesBorderColor[5],
							pointBackgroundColor: tablesPointBackgroundColor[5],
							borderWidth: 1

						}
					},
					options: {
						animation: {
							duration: 1000,
						},
						title: {
							display: true,
							fontsize: 24,
							text: "Produção",
						},
						labels: {
							fontStyle: 'bold',
						},
						scales: {
							yAxes: [{

								beginAtZero: true,
								position: "left",
								id: "performance"
							}],
							xAxes: [{
								beginAtZero: true,
								ticks: {
									callback: function (dataLabel, index) {
										return index % 4 === 0 ? dataLabel : '';
									},
									maxRotation: 0,
								}
							}]
						},
					},

				})
			}
		}
	}

	decrementDate = () => {

		let day = this.state.day;
		let month = this.state.month;
		let year = this.state.year;

		if (this.state.period == "day") {
			if (year >= 2018 && month >= 1 && day >= 1) {

				if (day > 1) {
					day--;
				} else if (day == 1 && month != 1) {
					day = howManyDaysThisMonth(month - 1);
					month--;
				} else {
					day = 31;
					month = 12;
					year--;
				}

				this.setState({
					day,
					month,
					year
				});

			}
		} else if (this.state.period == "month") {
			if (year >= 2018 && month >= 1) {

				if (month > 1) {
					month--;
				} else {
					month = 12;
					year--;
				}

				this.setState({
					month,
					year
				});

			}
		}

		this._isUpdated = false;


	}

	incrementDate = () => {

		let day = this.state.day;
		let month = this.state.month;
		let year = this.state.year;

		if (this.state.period == "day") {
			if (year < this.actualYear ||
				(year == this.actualYear && month < this.actualMonth) ||
				(year == this.actualYear && month == this.actualMonth && day < this.actualDay)) {

				if (day == 31 && month == 12) {
					day = 1;
					month = 1;
					year++;
				} else if (day == howManyDaysThisMonth(month)) {
					day = 1;
					month++;
				} else {
					day++;
				}

				this.setState({
					day,
					month,
					year
				});

			}
		} else if (this.state.period == "month") {
			if (year < this.actualYear ||
				(year == this.actualYear && month < this.actualMonth)) {

				if (month == 12) {
					month = 1;
					year++;
				} else {
					month++;
				}

				this.setState({
					month,
					year
				});

			}
		}

		this._isUpdated = false;

	}

	handleMonthRendering = () => {

		let date = dateFormater(this.actualDay, this.actualMonth, this.actualYear);
		this._isMounted = true;
		this.fetchApiResponse(date, 'month');
		this.setState({ monthActive: true });

	}

	handleDayRendering = () => {

		let date = dateFormater(this.actualDay, this.actualMonth, this.actualYear);
		this._isMounted = true;
		this.fetchApiResponse(date, 'day');
		this.setState({ monthActive: false });

	}

	UNSAFE_componentWillUpdate(newProps, newState) {

		if (!this._isUpdated) {
			let date = dateFormater(newState.day, newState.month, newState.year);
			this.fetchApiResponse(date, this.state.period);
		}

	}

	componentDidUpdate() {
		this._isUpdated = true;
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {

		if (this.state.period == "day" && !this.state.isLoading) {
			if (this.state.table < 6) {
				return (
					<React.Fragment>
						<Header logged={true} fixed={false} marginBottom={true} />
						<div className="row">
							<div className="col-11 mx-auto">
								<main className="col-lg-12 mx-auto p-0" role="main" id="main">

									<TitleBar text="Produção - Irecê" theme="production" />
									<Navigator
										date={this.state.monthDay}
										handlePrevDateNavigation={this.decrementDate}
										handleNextDateNavigation={this.incrementDate}
										monthActive={this.state.monthActive}
										month="allowed"
										handleMonthRendering={this.handleMonthRendering}
										handleDayRendering={this.handleDayRendering}
									/>

									<IndividualProductionCharts
										isLoading={this.state.isLoading}
										labels={this.state.labels}
										production={this.state.data.production}
										capacityFactor={this.state.data.capacityFactor}
										productionOptions={this.state.options.productionOptions}
										generalOptions={this.state.options.generalOptions}
										alternateCurrent={this.state.data.alternateCurrent}
										alternateVoltage={this.state.data.alternateVoltage}
										continuousCurrent={this.state.data.continuousCurrent}
										continuousVoltage={this.state.data.continuousVoltage}
									/>

								</main>
							</div>
						</div>
						<Footer />
					</React.Fragment>
				);
			} else if (this.state.table == 6) {
				return (
					<React.Fragment>
						<Header logged={true} fixed={false} marginBottom={true} />
						<div className="row">
							<div className="col-11 mx-auto">
								<main className="col-lg-12 mx-auto p-0" role="main" id="main">

									<TitleBar text="Produção - Irecê" theme="production" />
									<Navigator
										date={this.state.monthDay}
										handlePrevDateNavigation={this.decrementDate}
										handleNextDateNavigation={this.incrementDate}
										monthActive={this.state.monthActive}
										month="allowed"
										handleMonthRendering={this.handleMonthRendering}
										handleDayRendering={this.handleDayRendering}
									/>

									<TotalProductionsChart
										isLoading={this.state.isLoading}
										labels={this.state.labels}
										totalProduction={this.state.data.tableSum}
										table1={this.state.data.table1}
										table2={this.state.data.table2}
										table3={this.state.data.table3}
										table4={this.state.data.table4}
										table5={this.state.data.table5}
										totalOptions={this.state.options.totalOptions}
										comparisonOptions={this.state.comparisonOptions}
									/>

								</main>
							</div>
						</div>
						<Footer />
					</React.Fragment>
				);
			}

		} else if (this.state.period == "month" && !this.state.isLoading) {
			if (this.state.table < 6) {
				return (
					<React.Fragment>
						<Header logged={true} fixed={false} marginBottom={true} />
						<div className="row">
							<div className="col-11 mx-auto">
								<main className="col-lg-12 mx-auto p-0" role="main" id="main">

									<TitleBar text="Produção - Irecê" theme="production" />
									<Navigator
										date={this.state.monthDay}
										handlePrevDateNavigation={this.decrementDate}
										handleNextDateNavigation={this.incrementDate}
										monthActive={this.state.monthActive}
										month="allowed"
										handleMonthRendering={this.handleMonthRendering}
										handleDayRendering={this.handleDayRendering}
									/>

									<div className="row m-4 px-0 py-0" id="row-chart">
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-1">
											<BarChart
												data={{ labels: this.state.labels, datasets: [this.state.data.table5, this.state.data.table1] }}
												options={this.state.options.barOptions}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-2">
											<DoughnutChart
												data={{ labels: ['Performance Ratio Mensal'], datasets: [this.state.data.table2] }}
												options={this.state.options.doughnutOptions}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-3">
											<BarChart
												data={{ labels: this.state.labels, datasets: [this.state.data.table3] }}
												options={this.state.options.barOptions}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-4">
											<BarChart
												data={{ labels: this.state.labels, datasets: [this.state.data.table4] }}
												options={this.state.options.barOptions}
											/>
										</div>
									</div>

								</main>
							</div>
						</div>
						<Footer />
					</React.Fragment>
				)
			} else if (this.state.table == 6) {
				return (
					<React.Fragment>
						<Header logged={true} fixed={false} marginBottom={true} />
						<div className="row">
							<div className="col-11 mx-auto">
								<main className="col-lg-12 mx-auto p-0" role="main" id="main">

									<TitleBar text="Produção - Irecê" theme="production" />
									<Navigator
										date={this.state.monthDay}
										handlePrevDateNavigation={this.decrementDate}
										handleNextDateNavigation={this.incrementDate}
										monthActive={this.state.monthActive}
										month="allowed"
										handleMonthRendering={this.handleMonthRendering}
										handleDayRendering={this.handleDayRendering}
									/>

									<div className="row m-4 px-0 py-0" id="row-chart">
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-1">
											<BarChart
												data={{ labels: this.state.labels, datasets: [this.state.data.table6] }}
												options={this.state.options}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-2">
											<BarChart
												data={{ labels: this.state.labels, datasets: [this.state.data.table1] }}
												options={this.state.options}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-3">
											<BarChart
												data={{ labels: this.state.labels, datasets: [this.state.data.table2] }}
												options={this.state.options}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-4">
											<BarChart
												data={{ labels: this.state.labels, datasets: [this.state.data.table3] }}
												options={this.state.options}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-5">
											<BarChart
												data={{ labels: this.state.labels, datasets: [this.state.data.table4] }}
												options={this.state.options}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-6">
											<BarChart
												data={{ labels: this.state.labels, datasets: [this.state.data.table5] }}
												options={this.state.options}
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

		else if (this.state.isLoading) {
			return (
				<React.Fragment>
					<Header logged={true} fixed={false} marginBottom={true} />
					<div className="row">
						<div className="col-11 mx-auto">
							<main className="col-lg-12 mx-auto p-0" role="main" id="main">

								<TitleBar text="Produção - Irecê" theme="production" />
								<Navigator
									date={this.state.monthDay}
									handlePrevDateNavigation={this.decrementDate}
									handleNextDateNavigation={this.incrementDate}
									monthActive={this.state.monthActive}
									month="allowed"
									handleMonthRendering={this.handleMonthRendering}
									handleDayRendering={this.handleDayRendering}
								/>

								<div className="row m-4 px-0 py-0" id="row-chart">
									<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-1">
										<LineChart
											data={{ labels: [], datasets: [] }}
										/>
									</div>
									<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-2">
										<LineChart
											data={{ labels: [], datasets: [] }}
										/>
									</div>
								</div>

							</main>
						</div>
					</div>
					<Footer />
				</React.Fragment>
			);
		}

	}
}