/* eslint-disable eqeqeq */
import React, { Component } from 'react';

import LineChart from '../../components/LineChart';
import TitleBar from '../../components/TitleBar';
import Navigator from '../../components/Navigator';
import Header from '../../components/HeaderWrapper';
import Footer from '../../components/FooterWrapper';

import api from '../../services/api';

import dateFormater from '../../utils/dateFormater';
import howManyDaysThisMonth from '../../utils/daysInMonthDefiner';
import BarChart from '../../components/BarChart';
import DoughnutChart from '../../components/DoughnutChart';

export default class Production extends Component {
	constructor(props) {
		super(props);

		this.state = {
			day: 0,
			monthDay: 'carregando...',
			period: 'day',
			dayActive: true,
			labels: [],
			data: [],
			isLoading: true,
			rightNavigationDisabled: true,
			leftNavigationDisabled: false
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
		this.fetchApiResponse(date, this.state.period);

	}

	fetchApiResponse = async (date, period) => {

		let apiResponse = await api.get('/campo-grande/producao/' + date + '/' + period);
		let newStateObject = await this.refreshState(apiResponse.data);

		if (this._isMounted || !this._isUpdated) {
			this.setState({
				period: newStateObject.period,
				day: newStateObject.day,
				month: newStateObject.month,
				year: newStateObject.year,
				monthDay: newStateObject.monthDay,
				labels: newStateObject.interval,
				data: newStateObject.data,
				performanceRatio: newStateObject.performanceRatio,
				options: newStateObject.options,
				isLoading: (!newStateObject.interval.length)
			});
		}
	}

	refreshState = async (res) => {

		if (res.period == "day") {
			return ({
				day: res.day,
				month: res.month,
				year: res.year,
				monthDay: res.monthDay,
				period: res.period,
				interval: res.interval,
				performanceRatio: res.performanceRatio,
				data: {
					table1: {
						data: res.averages,
						lineTension: 0,
						label: 'Potência produziada #1: p-Si (kWh)',
						backgroundColor: 'rgba(66,161,245,0)',
						borderColor: 'rgba(66,161,245,1.0)',
						pointBackgroundColor: 'rgba(66,161,245,1.0)',
						borderWidth: 3,
						yAxisID: "performance",
					},
					table2: {
						data: res.alternateCurrent,
						lineTension: 0,
						label: 'Corrente alternada (A)',
						backgroundColor: 'rgba(255,48,48, 0)',
						borderColor: 'rgba(255,48,48, 1.0)',
						pointBackgroundColor: 'rgba(255,48,48, 0.7)',
					},
					table3: {
						data: res.continuousCurrent,
						lineTension: 0,
						label: 'Corrente contínua (A)',
						backgroundColor: 'rgba(255,166,0,0)',
						borderColor: 'rgba(255,166,0,1.0)',
						pointBackgroundColor: 'rgba(255,166,0, 0.7)'
					},
					table4: {
						data: res.alternateTension,
						lineTension: 0,
						label: 'Tensão alternada (V)',
						backgroundColor: 'rgba(66, 134, 244, 0)',
						borderColor: 'rgba(66, 134, 244, 1.0)',
						pointBackgroundColor: 'rgba(66, 134, 244, 0.7)',
					},
					table5: {
						data: res.continuousTension,
						lineTension: 0,
						label: 'Tensão contínua (V)',
						backgroundColor: 'rgba(50,172,92, 0)',
						borderColor: 'rgba(50,172,92, 1.0)',
						pointBackgroundColor: 'rgba(50,172,92, 0.7)',
					},
					table6: {
						data: res.capacityFactor,
						lineTension: 0,
						label: 'Percentual de capacidade da mesa',
						borderColor: 'rgba(255,48,48,1.0)',
						backgroundColor: 'rgba(255,48,48,0)',
						borderWidth: 3,
						yAxisID: "capacidade",
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
				}

			})
		} else if (res.period == "month") {
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
						label: 'Potência média produziada #1: p-Si (kWh)',
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

			})
		} else if (res.period == "year") {

			return ({
				day: this.actualDay,
				month: this.actualMonth,
				year: res.year,
				monthDay: res.year,
				period: res.period,
				interval: res.yearInterval,
				data: {
					totalProductions: {
						data: res.productionsSum,
						lineTension: 0,
						label: 'Produção mensal #1: p-Si (kWh)',
						backgroundColor: 'rgba(66,161,245,1.0)',
						borderColor: 'rgba(66,161,245,1.0)',
						pointBackgroundColor: 'rgba(66,161,245,1.0)',
						borderWidth: 3,
						yAxisID: "performance",
					},
					capacityFactorAverages: {
						data: res.capacityFactorAverages,
						lineTension: 0,
						label: 'Percentual de PR',
						borderColor: 'rgba(255,48,48,1.0)',
						backgroundColor: 'rgba(255,48,48,0)',
						borderWidth: 3,
						yAxisID: "capacidade",
						type: 'line'
					},
					higherAverages: {
						data: res.higherAverages,
						lineTension: 0,
						label: 'Maior potência (kW)',
						backgroundColor: 'rgba(66,161,245,1.0)',
						borderColor: 'rgba(66,161,245,1.0)',
						pointBackgroundColor: 'rgba(66,161,245,1.0)',
						yAxisID: "performance",
					},
					higherAverageDays: {
						data: res.higherAverageDays,
						lineTension: 0,
						label: 'Dia',
						borderColor: 'rgba(255,48,48,1.0)',
						backgroundColor: 'rgba(255,48,48,0)',
						borderWidth: 3,
						yAxisID: "capacidade",
						type: 'line'
					},
					performancesAverages: {
						data: res.performancesAverages,
						lineTension: 0,
						label: 'Média de PR',
						borderColor: 'rgba(255,48,48,1.0)',
						backgroundColor: 'rgba(255,48,48,0)',
						borderWidth: 3,
						yAxisID: "capacidade",
						type: 'line'
					},
					totalProductionAverages: {
						data: res.totalProductionAverages,
						lineTension: 0,
						label: 'Produção total',
						backgroundColor: 'rgba(66,161,245,1.0)',
						borderColor: 'rgba(66,161,245,1.0)',
						pointBackgroundColor: 'rgba(66,161,245,1.0)',
						yAxisID: "performance",
					}
				},
				options: {
					production: {
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
					power: {
						animation: {
							duration: 1000,
						},
						title: {
							display: true,
							fontsize: 24,
							text: "Potência média alcançada",
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
					performance: {
						animation: {
							duration: 1000,
						},
						title: {
							display: true,
							fontsize: 24,
							text: "Produção total vs. Performance ratio média",
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
				},


			})
		}

	}

	decrementDate = () => {

		let day = this.state.day;
		let month = this.state.month;
		let year = this.state.year;

		if (this.state.period == "day") {
			if ((year == 2018 && month >= 9 && day >= 1) || year > 2018) {

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

				if (year == 2018 && month == 9 && day == 1) {
					this.setState({ leftNavigationDisabled: true });
				}
	
				this.setState({
					day,
					month,
					year,
					rightNavigationDisabled: false
				});
		
			}
		} else if (this.state.period == "month") {
			if ((year == 2018 && month >= 9) || year > 2018) {

				if (month > 1) {
					month--;
				} else {
					month = 12;
					year--;
				}
	
				this.setState({
					month,
					year,
					rightNavigationDisabled: false
				});

				if (year == 2018 && month == 9) {
					this.setState({ leftNavigationDisabled: true });
				}
		
			} 
		} else if (this.state.period == "year") {
			if (year > 2018) {
				year--;
				this.setState({
					year,
					rightNavigationDisabled: false
				});

				if (year == 2018){
					this.setState({ leftNavigationDisabled: true })
				}

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
					year,
					leftNavigationDisabled: false
				});

				if (year == this.actualYear && month == this.actualMonth && day == this.actualDay) {
					this.setState({ rightNavigationDisabled: true })
				}
		
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
					year,
					leftNavigationDisabled: false
				});

				if (month == this.actualMonth && year == this.actualYear) {
					this.setState({ rightNavigationDisabled: true })
				}
		
			} 
		} else if (this.state.period == "year") {
			if (year < this.actualYear) {
				year++;
				this.setState({ 
					year,
					leftNavigationDisabled: false
				});
				if (year == this.actualYear) {
					this.setState({ rightNavigationDisabled: true })
				}
			}
		}

		this._isUpdated = false;

	}

	handleDayRendering = () => {

		let date = dateFormater(this.actualDay, this.actualMonth, this.actualYear);
		this._isMounted = true;
		this.fetchApiResponse(date, 'day');
		this.setState({ 
			dayActive: true,
			monthActive: false,
			yearActive: false,
			leftNavigationDisabled: false,
			rightNavigationDisabled: true
		});

	}

	handleMonthRendering = () => {

		let date = dateFormater(this.actualDay, this.actualMonth, this.actualYear);
		this._isMounted = true;
		this.fetchApiResponse(date, 'month');
		this.setState({
			dayActive: false,
			monthActive: true,
			yearActive: false,
			leftNavigationDisabled: false,
			rightNavigationDisabled: true
		});

	}

	handleYearRendering = () => {

		let date = dateFormater(this.actualDay, this.actualMonth, this.actualYear);
		this._isMounted = true;
		this.fetchApiResponse(date, 'year');
		this.setState({
			dayActive: false,
			monthActive: false,
			yearActive: true,
			leftNavigationDisabled: false,
			rightNavigationDisabled: true
		 });

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

		if (this.state.period == "day") {
			let pr = (typeof this.state.performanceRatio == "number") ? this.state.performanceRatio : 0

			if (!this.state.isLoading && this.state.labels != undefined) {
				return (
					<React.Fragment>
						<Header logged={true} fixed={false} marginBottom={true} />
						<div className="row">
							<div className="col-11 mx-auto">
								<main className="col-lg-12 mx-auto p-0" role="main" id="main">

									<TitleBar text="Produção - Campo Grande" theme="production" pr={"Performance Ratio: " + pr + "%"} />
									<Navigator
										date={this.state.monthDay}
										handlePrevDateNavigation={this.decrementDate}
										handleNextDateNavigation={this.incrementDate}
										yearActive={this.state.yearActive}
										monthActive={this.state.monthActive}
										dayActive={this.state.dayActive}
										month="allowed"
										year="allowed"
										handleYearRendering={this.handleYearRendering}										
										handleMonthRendering={this.handleMonthRendering}
										handleDayRendering={this.handleDayRendering}
										leftNavigationDisabled={this.state.leftNavigationDisabled}
										rightNavigationDisabled={this.state.rightNavigationDisabled}
									/>
									<div className="row m-4 px-0 py-0" id="row-chart">
										<div className="col-md-10 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-1">
											<LineChart
												data={{ labels: this.state.labels, datasets: [this.state.data.table1, this.state.data.table6] }}
												options={this.state.options}
											/>
										</div>
										<div className="col-md-5 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-2">
											<LineChart
												data={{ labels: this.state.labels, datasets: [this.state.data.table2] }}
												options={this.state.options}
											/>
										</div>
										<div className="col-md-5 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-3">
											<LineChart
												data={{ labels: this.state.labels, datasets: [this.state.data.table3] }}
												options={this.state.options}
											/>
										</div>
										<div className="col-md-5 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-4">
											<LineChart
												data={{ labels: this.state.labels, datasets: [this.state.data.table4] }}
												options={this.state.options}
											/>
										</div><div className="col-md-5 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-5">
											<LineChart
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
				);

			} else {
				return (
					<React.Fragment>
						<Header logged={true} fixed={false} marginBottom={true} />
						<div className="row">
							<div className="col-11 mx-auto">
								<main className="col-lg-12 mx-auto p-0" role="main" id="main">

									<TitleBar text="Produção - Campo Grande" theme="production" />
									<Navigator
										date={this.state.monthDay}
										handlePrevDateNavigation={this.decrementDate}
										handleNextDateNavigation={this.incrementDate}
										yearActive={this.state.yearActive}
										monthActive={this.state.monthActive}
										dayActive={this.state.dayActive}
										month="allowed"
										year="allowed"
										handleYearRendering={this.handleYearRendering}		
										handleMonthRendering={this.handleMonthRendering}
										handleDayRendering={this.handleDayRendering}
										leftNavigationDisabled={this.state.leftNavigationDisabled}
										rightNavigationDisabled={this.state.rightNavigationDisabled}
									/>

									<div className="row m-4 px-0 py-0" id="row-chart">
										<div className="col-md-10 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-1">
											<LineChart
												data={{ labels: [], datasets: [] }}
											/>
										</div>
										<div className="col-md-5 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-2">
											<LineChart
												data={{ labels: [], datasets: [] }}
											/>
										</div>
										<div className="col-md-5 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-3">
											<LineChart
												data={{ labels: [], datasets: [] }}
											/>
										</div>
										<div className="col-md-5 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-4">
											<LineChart
												data={{ labels: [], datasets: [] }}
											/>
										</div>
										<div className="col-md-5 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-5">
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
				)
			}
		} else if (this.state.period == "month") {

			if (!this.state.isLoading && this.state.labels != undefined) {
				return (
					<React.Fragment>
						<Header logged={true} fixed={false} marginBottom={true} />
						<div className="row">
							<div className="col-11 mx-auto">
								<main className="col-lg-12 mx-auto p-0" role="main" id="main">

									<TitleBar text="Produção - Campo Grande" theme="production" />
									<Navigator
										date={this.state.monthDay}
										handlePrevDateNavigation={this.decrementDate}
										handleNextDateNavigation={this.incrementDate}
										yearActive={this.state.yearActive}
										monthActive={this.state.monthActive}
										dayActive={this.state.dayActive}
										month="allowed"
										year="allowed"
										handleYearRendering={this.handleYearRendering}			
										handleMonthRendering={this.handleMonthRendering}
										handleDayRendering={this.handleDayRendering}
										leftNavigationDisabled={this.state.leftNavigationDisabled}
										rightNavigationDisabled={this.state.rightNavigationDisabled}
									/>
									<div className="row m-4 px-0 py-0" id="row-chart">
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-1">
											<BarChart
												data={{ labels: this.state.labels, datasets: [this.state.data.table5, this.state.data.table1] }}
												options={this.state.options}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-2">
											<DoughnutChart
												data={{ labels: ['Performance Ratio Mensal'], datasets: [this.state.data.table2] }}
												options={this.state.doughnutOptions}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-3">
											<BarChart
												data={{ labels: this.state.labels, datasets: [this.state.data.table3] }}
												options={this.state.options}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-4">
											<BarChart
												data={{ labels: this.state.labels, datasets: [this.state.data.table4] }}
												options={this.state.options}
											/>
										</div>
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
						<Header logged={true} fixed={false} marginBottom={true} />
						<div className="row">
							<div className="col-11 mx-auto">
								<main className="col-lg-12 mx-auto p-0" role="main" id="main">

									<TitleBar text="Produção - Campo Grande" theme="production" />
									<Navigator
										date={this.state.monthDay}
										handlePrevDateNavigation={this.decrementDate}
										handleNextDateNavigation={this.incrementDate}
										yearActive={this.state.yearActive}
										monthActive={this.state.monthActive}
										dayActive={this.state.dayActive}
										month="allowed"
										year="allowed"
										handleYearRendering={this.handleYearRendering}			
										handleMonthRendering={this.handleMonthRendering}
										handleDayRendering={this.handleDayRendering}
										leftNavigationDisabled={this.state.leftNavigationDisabled}
										rightNavigationDisabled={this.state.rightNavigationDisabled}
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
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-3">
											<LineChart
												data={{ labels: [], datasets: [] }}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-4">
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
				)
			}
		} else if (this.state.period == "year") {

			if (!this.state.isLoading && this.state.labels != undefined) {
				
				let totalProductionThisYear = this.state.data.totalProductions.data.reduce((acc, cur) => parseFloat(cur) + parseFloat(acc));
				let savedPrice = totalProductionThisYear * 0.53561;

				return (
					<React.Fragment>
						<Header logged={true} fixed={false} marginBottom={true} />
						<div className="row">
							<div className="col-11 mx-auto">
								<main className="col-lg-12 mx-auto p-0" role="main" id="main">

									<TitleBar text="Produção - Campo Grande" theme="production" />
									<Navigator
										date={this.state.monthDay}
										handlePrevDateNavigation={this.decrementDate}
										handleNextDateNavigation={this.incrementDate}
										yearActive={this.state.yearActive}
										monthActive={this.state.monthActive}
										dayActive={this.state.dayActive}
										month="allowed"
										year="allowed"
										handleYearRendering={this.handleYearRendering}
										handleMonthRendering={this.handleMonthRendering}
										handleDayRendering={this.handleDayRendering}
										leftNavigationDisabled={this.state.leftNavigationDisabled}
										rightNavigationDisabled={this.state.rightNavigationDisabled}
									/>
									<div className="row m-4 px-0 py-0" id="row-chart">
										<div className="col-md-8 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-1">
											<BarChart
												data={{ labels: this.state.labels, datasets: [this.state.data.capacityFactorAverages, this.state.data.totalProductions] }}
												options={this.state.options.production}
											/>
										</div>
										<div className="col-md-4 container-fluid pb-3 pt-0 py-0 mx-auto my-auto text-center" id="canvas-container-0">
											Total produzido esse ano: <h5>{(totalProductionThisYear).toFixed(3)} kWh</h5>
											<br></br>
											Foram salvos <h5>R${(savedPrice).toFixed(2)}</h5> 
											<small>com tarifa de R$0,53561 kWh</small>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-2">
											<BarChart
												data={{ labels: this.state.labels, datasets: [this.state.data.higherAverageDays, this.state.data.higherAverages] }}
												options={this.state.options.power}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-3">
											<BarChart
												data={{ labels: this.state.labels, datasets: [this.state.data.performancesAverages, this.state.data.totalProductionAverages] }}
												options={this.state.options.performance}
											/>
										</div>
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
						<Header logged={true} fixed={false} marginBottom={true} />
						<div className="row">
							<div className="col-11 mx-auto">
								<main className="col-lg-12 mx-auto p-0" role="main" id="main">

									<TitleBar text="Produção - Campo Grande" theme="production" />
									<Navigator
										date={this.state.monthDay}
										handlePrevDateNavigation={this.decrementDate}
										handleNextDateNavigation={this.incrementDate}
										yearActive={this.state.yearActive}
										monthActive={this.state.monthActive}
										dayActive={this.state.dayActive}
										month="allowed"
										year="allowed"
										handleYearRendering={this.handleYearRendering}			
										handleMonthRendering={this.handleMonthRendering}
										handleDayRendering={this.handleDayRendering}
										leftNavigationDisabled={this.state.leftNavigationDisabled}
										rightNavigationDisabled={this.state.rightNavigationDisabled}
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
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-3">
											<LineChart
												data={{ labels: [], datasets: [] }}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-4">
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
				)
			}
		}

	}
}
