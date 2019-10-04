/* eslint-disable eqeqeq */
import React, { Component } from 'react';

import LineChart from '../../components/LineChart';
import BarChart from '../../components/BarChart';
import TitleBar from '../../components/TitleBar';
import Navigator from '../../components/Navigator';
import Header from '../../components/HeaderWrapper';
import Footer from '../../components/FooterWrapper';
import Table from '../../components/Table';

import api from '../../services/api';

import dateFormater from '../../utils/dateFormater';
import howManyDaysThisMonth from '../../utils/daysInMonthDefiner';

export default class Enviromental extends Component {
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
	actualMonth = this.now.getMonth() + 1;
	actualYear = this.now.getFullYear();
	currentDay = this.now.getDate();
	currentMonth = this.now.getMonth() + 1;
	currentYear = this.now.getFullYear();

	componentDidMount() {
		let date = dateFormater(this.actualDay, this.actualMonth, this.actualYear);
		this._isMounted = true;
		this.fetchApiResponse(date, this.state.period);
	}

	fetchApiResponse = async (date, period) => {

		let apiResponse = await api.get('/irece/ambientais/' + date + '/' + period);
		
		this.refreshState(apiResponse.data, period)
		.then(async (newStateObject) => {

			if (this._isMounted || !this._isUpdated) {
				this.setState({
					day: newStateObject.day,
					month: newStateObject.month,
					year: newStateObject.year,
					monthDay: newStateObject.monthDay,
					period: newStateObject.period,
					labels: newStateObject.interval,
					data: newStateObject.data,
					dataForTable: newStateObject.dataForTable || [0],
					options: newStateObject.options,
					isLoading: (!newStateObject.interval.length)
				});

			}
		})

	}

	refreshState = async (res, period) => {

		return new Promise((resolve, reject) => {
			if (period === "day") {
				let differentDay = (this.currentDay != res.day || this.currentMonth != res.month || this.currentYear != res.year);
	
				let head = [
					(differentDay) ? 'Temperatura média' : 'Temperatura atual',
					(differentDay) ? 'Umidade média relativa do ar' : 'Umidade relativa do ar',
					'Precipitação acumulada',
					(differentDay) ? 'Velocidade do vento média' : 'Velocidade do vento atual',
					(differentDay) ? 'Pressão atmosférica média' : 'Pressão atmosférica atual'
				]
		
				let temperatureSum = res.temperature.reduce((acc, cur) => acc + cur);
				let temperatureAverage = temperatureSum / res.temperature.length;
				let humiditySum = res.humidity.reduce((acc, cur) => acc + cur);
				let humidityAverage = humiditySum / res.humidity.length;
				let windSpeedSum = res.windSpeed.reduce((acc, cur) => acc + cur);
				let windSpeedAverage = windSpeedSum / res.windSpeed.length;
				let atmPressureSum = res.atmPressure.reduce((acc, cur) => acc + cur);
				let atmPressureAverage = atmPressureSum / res.atmPressure.length;
		
				let windSpeed = res.windSpeed.pop() || 0
				let atmPressure = res.atmPressure.pop() || 0
				let temperature = res.temperature.pop() || 0
				let humidity = res.humidity.pop() || 0
		
				let body = [[
					(differentDay) ? parseFloat(temperatureAverage).toFixed(1) + " °C" : parseFloat(temperature).toFixed(1) + " °C",
					(differentDay) ? parseFloat(humidityAverage).toFixed(1) + " %" : parseFloat(humidity).toFixed(1) + " %",
					0 + " mm/m³",
					(differentDay) ? parseFloat(windSpeedAverage).toFixed(1) + " km/h" : parseFloat(windSpeed).toFixed(1) + " km/h",
					(differentDay) ? parseInt(atmPressureAverage) + " atm" : parseInt(atmPressure) + " atm"
				]]
		
				let dataForTable = {
					head,
					body
				}
		
				resolve ({
					day: res.day,
					month: res.month,
					year: res.year,
					monthDay: res.monthDay,
					period: res.period,
					interval: res.interval,
					dataForTable,
					data: {
						table1: {
							data: res.solarRadiation,
							lineTension: 0,
							label: 'Irradiação inclinada sobre a mesa (W/m²)',
							backgroundColor: 'rgba(66,161,245,0)',
							borderColor: 'rgba(66,161,245,1.0)',
							pointBackgroundColor: 'rgba(66,161,245,1.0)',
						},
						table2: {
							data: res.averageRadiation,
							lineTension: 0,
							label: 'Irradiação inclinada referencial (W/m²)',
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
							text: "Irradiação solar",
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
		
				})
			}
	
			else if (period === "month") {

				let items = {
					day: this.actualDay,
					month: res.month,
					year: res.year,
					monthDay: res.monthDay,
					period: res.period,
					interval: res.monthInterval,
					data: {
						averageIrradiations: {
							data: res.averageIrradiations,
							lineTension: 0,
							label: 'Média diária (W/m²)',
							backgroundColor: 'rgba(66,161,245,1.0)',
							borderColor: 'rgba(66,161,245,1.0)',
							pointBackgroundColor: 'rgba(66,161,245,1.0)',
							pointHoverRadius: 7
						},
						higherIrradiations: {
							type: 'line',
							data: res.higherIrradiations,
							lineTension: 0,
							label: 'Pico diário (W/m³)',
							borderWidth: 3,
							backgroundColor: 'rgba(255,48,48, 0)',
							borderColor: 'rgba(255,48,48, 1.0)',
							pointBackgroundColor: 'rgba(255,48,48, 0.7)',
							pointHoverRadius: 7
						},
						averageTemperatures: {
							data: res.averageTemperatures,
							lineTension: 0,
							label: 'Média diária (°C)',
							backgroundColor: 'rgba(66, 134, 244, 1.0)',
							borderColor: 'rgba(66, 134, 244, 1.0)',
							pointBackgroundColor: 'rgba(66, 134, 244, 0.7)',
							pointHoverRadius: 7
						},
						higherTemperatures: {
							type: 'line',
							data: res.higherTemperatures,
							lineTension: 0,
							label: 'Maior temperatura diária (°C)',
							borderWidth: 3,
							backgroundColor: 'rgba(255,48,48, 0)',
							borderColor: 'rgba(255,48,48, 1.0)',
							pointBackgroundColor: 'rgba(255,48,48, 0.7)',
							pointHoverRadius: 7,
							yAxisID: "right"
						},
						lowerTemperatures: {
							type: 'line',
							data: res.lowerTemperatures,
							lineTension: 0,
							label: 'Menor temperatura diária (°C)',
							borderWidth: 3,
							backgroundColor: 'rgba(255,166,0,0)',
							borderColor: 'rgba(255,166,0,1.0)',
							pointBackgroundColor: 'rgba(255,166,0, 0.7)',
							pointHoverRadius: 7,
							yAxisID: "right"
						},
						accumulateRainfall: {
							data: res.accumulateRainfall,
							lineTension: 0,
							label: 'Umidade acumulada (mm/M³)',
							backgroundColor: 'rgba(50,172,92, 1.0)',
							borderColor: 'rgba(50,172,92, 1.0)',
							pointBackgroundColor: 'rgba(50,172,92, 0.7)',
							pointHoverRadius: 7
						},
						averageWindSpeeds: {
							data: res.averageWindSpeeds,
							lineTension: 0,
							borderWidth: 3,
							label: 'Média diária (km/h)',
							backgroundColor: 'rgba(255,166,0, 0)',
							borderColor: 'rgba(255,166,0,1.0)',
							pointBackgroundColor: 'rgba(255,166,0, 0.7)',
							pointHoverRadius: 7
						}
					},
					options: {
						irradiationOptions: {
							animation: {
								duration: 1000,
							},
							title: {
								display: true,
								fontsize: 24,
								text: "Irradiação",
							},
							labels: {
								fontStyle: 'bold',
							},
							scales: {
								yAxes: [{
									beginAtZero: true,
									position: "left",
									id: "left"
								},
								{
									beginAtZero: true,
									position: "right",
									id: "right"
								},
	
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
						temperatureOptions: {
							animation: {
								duration: 1000,
							},
							title: {
								display: true,
								fontsize: 24,
								text: "Temperatura",
							},
							labels: {
								fontStyle: 'bold',
							},
							scales: {
								yAxes: [{
									beginAtZero: true,
									position: "left",
									id: "left"
								},
								{
									beginAtZero: true,
									position: "right",
									id: "right"
								},
	
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
						humidityOptions: {
							animation: {
								duration: 1000,
							},
							title: {
								display: true,
								fontsize: 24,
								text: "Umidade do ar",
							},
							labels: {
								fontStyle: 'bold',
							},
							scales: {
								yAxes: [{
									beginAtZero: true,
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
						windSpeedOptions: {
							animation: {
								duration: 1000,
							},
							title: {
								display: true,
								fontsize: 24,
								text: "Velocidade do vento",
							},
							labels: {
								fontStyle: 'bold',
							},
							scales: {
								yAxes: [{
									beginAtZero: true
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
					}

				}

				resolve(items)

			}

			else reject("Period not found")

		})

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

		if (this.state.period === "day") {
			if (!this.state.isLoading) {
				return (
					<React.Fragment>
						<Header logged={true} fixed={false} marginBottom={true} ufv="irece" />
						<div className="row">
							<div className="col-11 mx-auto">
								<main className="col-lg-12 mx-auto p-0" role="main" id="main">

									<TitleBar text="Ambientais - Irecê" theme="environmental" />
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
										<div className="col-md-10 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-1">
											<LineChart
												data={{ labels: this.state.labels, datasets: [this.state.data.table1, this.state.data.table2] }}
												options={this.state.options}
											/>
										</div>
									</div>

									<Table head={this.state.dataForTable.head} body={this.state.dataForTable.body} />

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

									<TitleBar text="Ambientais - Irecê" theme="environmental" />
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
										<div className="col-md-10 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-1">
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

		else if (this.state.period === "month") {

			if (!this.state.isLoading && this.state.labels != undefined) {
				return (
					<React.Fragment>
						<Header logged={true} fixed={false} marginBottom={true} />
						<div className="row">
							<div className="col-11 mx-auto">
								<main className="col-lg-12 mx-auto p-0" role="main" id="main">
									<TitleBar text="Ambientais - Irecê" theme="environmental" />
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
												data={{ labels: this.state.labels, datasets: [this.state.data.averageIrradiations, this.state.data.higherIrradiations] }}
												options={this.state.options.irradiationOptions}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-2">
											<BarChart
												data={{ labels: this.state.labels, datasets: [this.state.data.higherTemperatures, this.state.data.lowerTemperatures, this.state.data.averageTemperatures] }}
												options={this.state.options.temperatureOptions}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-3">
											<BarChart
												data={{ labels: this.state.labels, datasets: [this.state.data.accumulateRainfall] }}
												options={this.state.options.humidityOptions}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-4">
											<LineChart
												data={{ labels: this.state.labels, datasets: [this.state.data.averageWindSpeeds] }}
												options={this.state.options.windSpeedOptions}
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
									<TitleBar text="Ambientais - Irecê" theme="environmental" />
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
												data={{ labels: [], datasets: [] }}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-2">
											<BarChart
												data={{ labels: [], datasets: [] }}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-3">
											<BarChart
												data={{ labels: [], datasets: [] }}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-4">
											<BarChart
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
}
