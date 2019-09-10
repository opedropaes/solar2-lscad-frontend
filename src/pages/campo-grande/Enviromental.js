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
import { CSVLink } from 'react-csv-3';

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

	componentDidMount() {

		let date = dateFormater(this.actualDay, this.actualMonth, this.actualYear);
		this._isMounted = true;
		this.fetchApiResponse(date);

	}

	fetchApiResponse = async (date) => {

		let apiResponse = await api.get('/campo-grande/ambientais/' + date);
		let newStateObject = await this.refreshState(apiResponse.data);

		let toDonwload = await this.formatCSV(newStateObject.toDonwload);

		if (this._isMounted || !this._isUpdated) {
			this.setState({
				day: newStateObject.day,
				month: newStateObject.month,
				year: newStateObject.year,
				monthDay: newStateObject.monthDay,
				period: newStateObject.period,
				labels: newStateObject.interval,
				quarterLabels: newStateObject.quartersInterval,
				irradiationQuartersLabels: newStateObject.irradiationQuartersInterval,
				data: newStateObject.data,
				dataForTable: newStateObject.dataForTable,
				options: newStateObject.options,
				toDonwload: toDonwload,
				isLoading: false
			});

		}

	}

	refreshState = async (res) => {

		let head = [
			'Temperatura atual (°C)',
			'Velocidade do vento atual (km/h)',
			'Massa PM1 (μg/m³)',
			'Massa PM2 (μg/m³)',
			'Massa PM4 (μg/m³)',
			'Massa PM10 (μg/m³)'
		]


		let temperature = res[1].temperatures.pop()
		let windSpeed = res[1].windSpeeds.pop()
		let PM1 = res[1].PM1Particulates.pop()
		let PM2 = res[1].PM2Particulates.pop()
		let PM4 = res[1].PM4Particulates.pop()
		let PM10 = res[1].PM10Particulates.pop()

		let body = [[
			parseFloat(temperature).toFixed(1) || 0,
			parseFloat(windSpeed).toFixed(1) || 0,
			parseFloat(PM1) || 0,
			parseFloat(PM2) || 0,
			parseFloat(PM4) || 0,
			parseFloat(PM10) || 0
		]]

		let dataForTable = {
			head,
			body
		}

		let irradiation = res[0].irradiation.map(item => item * 1000);

		return ({
			day: res[1].day,
			month: res[1].month,
			year: res[1].year,
			monthDay: res[1].monthDay,
			period: 'day',
			interval: res[1].interval,
			quartersInterval: res[1].quartersInterval,
			irradiationQuartersInterval: res[0].interval,
			toDonwload: {
				date: res[1].monthDay,
				interval: res[1].interval,
				PM1Particulates: res[1].PM1Particulates,
				PM2Particulates: res[1].PM2Particulates,
				PM4Particulates: res[1].PM4Particulates,
				PM10Particulates: res[1].PM10Particulates,
				PM1Numbers: res[1].PM1Numbers,
				PM2Numbers: res[1].PM2Numbers,
				PM4Numbers: res[1].PM4Numbers,
				PM10Numbers: res[1].PM10Numbers,
				averageSizes: res[1].averageSizes,
				temperatures: res[1].temperatures,
				windDirections: res[1].windDirections,
				windSpeeds: res[1].windSpeeds,
				irradiationInterval: res[0].completeInterval,
				irradiation: res[0].completeIrradiation
			},
			dataForTable,
			data: {
				table1: {
					data: irradiation,
					lineTension: 0,
					label: 'Irradiação inclinada sobre a mesa (W/m²)',
					backgroundColor: 'rgba(66,161,245,0)',
					borderColor: 'rgba(66,161,245,1.0)',
					pointBackgroundColor: 'rgba(66,161,245,1.0)',
					pointHoverRadius: 7
				},
				table2: {
					data: res[1].PM1ParticulatesQuarters,
					lineTension: 0,
					label: 'Massa de particulados PM1 (μg/m³)',
					backgroundColor: 'rgba(255,166,0,1.0)',
					borderColor: 'rgba(255,166,0,1.0)',
					pointBackgroundColor: 'rgba(255,166,0, 0.7)',
					pointHoverRadius: 7
				},
				table3: {
					data:  res[1].PM2ParticulatesQuarters,
					lineTension: 0,
					label: 'Massa de particulados PM2 (μg/m³)',
					backgroundColor: 'rgba(66, 134, 244, 1.0)',
					borderColor: 'rgba(66, 134, 244, 1.0)',
					pointBackgroundColor: 'rgba(66, 134, 244, 0.7)',
					pointHoverRadius: 7
				},
				table4: {
					data: res[1].PM4ParticulatesQuarters,
					lineTension: 0,
					label: 'Massa de particulados PM4 (μg/m³)',
					backgroundColor: 'rgba(50,172,92, 1.0)',
					borderColor: 'rgba(50,172,92, 1.0)',
					pointBackgroundColor: 'rgba(50,172,92, 0.7)',
					pointHoverRadius: 7
				},
				table5: {
					data: res[1].PM10ParticulatesQuarters,
					lineTension: 0,
					label: 'Massa de particulados PM10 (μg/m³)',
					backgroundColor: 'rgba(255,48,48, 1.0)',
					borderColor: 'rgba(255,48,48, 1.0)',
					pointBackgroundColor: 'rgba(255,48,48, 0.7)',
					pointHoverRadius: 7
				},
				table6: {
					type: 'line',
					data: res[1].PM1NumbersQuarters,
					lineTension: 0,
					label: 'Concentração de particulados PM1 (μ/m³)',
					backgroundColor: 'rgba(255,166,0,0)',
					borderColor: 'rgba(255,166,0,1.0)',
					pointBackgroundColor: 'rgba(255,166,0, 0.7)',
					pointHoverRadius: 7
				},
				table7: {
					type: 'line',
					data: res[1].PM2NumbersQuarters,
					lineTension: 0,
					label: 'Concentração de particulados PM2 (μ/m³)',
					backgroundColor: 'rgba(66, 134, 244, 0)',
					borderColor: 'rgba(66, 134, 244, 1.0)',
					pointBackgroundColor: 'rgba(66, 134, 244, 0.7)',
					pointHoverRadius: 7
				},
				table8: {
					type: 'line',
					data: res[1].PM4NumbersQuarters,
					lineTension: 0,
					label: 'Concentração de particulados PM4 (μ/m³)',
					backgroundColor: 'rgba(50,172,92, 0)',
					borderColor: 'rgba(50,172,92, 1.0)',
					pointBackgroundColor: 'rgba(50,172,92, 0.7)',
					pointHoverRadius: 7
				},
				table9: {
					type: 'line',
					data: res[1].PM10NumbersQuarters,
					lineTension: 0,
					label: 'Concentração de particulados PM10 (μ/m³)',
					backgroundColor: 'rgba(255,48,48, 0)',
					borderColor: 'rgba(255,48,48, 1.0)',
					pointBackgroundColor: 'rgba(255,48,48, 0.7)',
					pointHoverRadius: 7
				},
			},
			options: {
				animation: {
					duration: 1000,
				},
				title: {
					display: true,
					fontsize: 24,
					text: "Ambientais",
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
								return index % 5 === 0 ? dataLabel : '';
							},
							maxRotation: 0,
						}
					}]
				},
			}

		})

	}

	decrementDate = () => {

		let day = this.state.day;
		let month = this.state.month;
		let year = this.state.year;

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

			this._isUpdated = false;

		}

	}

	incrementDate = () => {

		let day = this.state.day;
		let month = this.state.month;
		let year = this.state.year;

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

	formatCSV = (obj) => {
		let response = []

		response.push([
			'Data',
			'Horario',
			'Irradiacao (W/m^3)',
			'PM1 massa (mg/m^3)',
			'PM2 massa (mg/m^3)',
			'PM4 massa (mg/m^3)',
			'PM10 massa (mg/m^3)',
			'PM1 concentracao (mg/m^3)',
			'PM2 concentracao (mg/m^3)',
			'PM4 concentracao (mg/m^3)',
			'PM10 concentracao (mg/m^3)',
			'Concentracao padrao (mg/m^3)',
			'Temperatura (°C)',
			'Direcao do vento (°)',
			'Velocidade do vento km/h'
		])

		for (let i = 0; i < obj.interval.length; i++) {
			response.push([
				obj.date,
				obj.interval[i],
				(obj.irradiationInterval[i] == obj.interval[i]) ? obj.irradiation[i] : 0,
				obj.PM1Particulates[i],
				obj.PM2Particulates[i],
				obj.PM4Particulates[i],
				obj.PM10Particulates[i],
				obj.PM1Numbers[i],
				obj.PM2Numbers[i],
				obj.PM4Numbers[i],
				obj.PM10Numbers[i],
				obj.averageSizes[i],
				obj.temperatures[i],
				obj.windDirections[i],
				obj.windSpeeds[i]
			])
		}

		return response
	}

	render() {

		if (!this.state.isLoading) {
			return (
				<React.Fragment>
					<Header logged={true} fixed={false} marginBottom={true} ufv="campo-grande" />
					<div className="row">
						<div className="col-11 mx-auto">
							<main className="col-lg-12 mx-auto p-0" role="main" id="main">

								<TitleBar text="Ambientais - Campo Grande" theme="environmental" />
								<Navigator date={this.state.monthDay} handlePrevDateNavigation={this.decrementDate} handleNextDateNavigation={this.incrementDate} />

								<div className="row m-4 px-0 py-0" id="row-chart">
									<div className="col-md-10 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-1">
										<LineChart
											data={{ labels: this.state.irradiationQuartersLabels, datasets: [this.state.data.table1] }}
											options={this.state.options}
										/>
									</div>
									<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-2">
										<BarChart
											data={{ labels: this.state.quarterLabels, datasets: [this.state.data.table2, this.state.data.table6] }}
											options={this.state.options}
										/>
									</div>
									<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-3">
										<BarChart
											data={{ labels: this.state.quarterLabels, datasets: [this.state.data.table3, this.state.data.table7] }}
											options={this.state.options}
										/>
									</div>
									<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-4">
										<BarChart
											data={{ labels: this.state.quarterLabels, datasets: [this.state.data.table4, this.state.data.table8] }}
											options={this.state.options}
										/>
									</div>
									<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-5">
										<BarChart
											data={{ labels: this.state.quarterLabels, datasets: [this.state.data.table5, this.state.data.table9] }}
											options={this.state.options}
										/>
									</div>
								</div>
								<Table head={this.state.dataForTable.head} body={this.state.dataForTable.body} />
								<strong ><hr className="mx-4"></hr></strong>
								<div className="text-center mx-auto mb-2">{"Baixar dados de " + this.state.monthDay + " como CSV:"}</div>
								<div className="container row flex-row mx-auto px-0">
									<CSVLink 
										data={this.state.toDonwload}
										className="btn btn-sm btn-info text-light mx-auto mb-3"
										filename={this.state.monthDay + "-Campo-Grande-Ambientais.csv"}>
										<i className="material-icons pr-2 pb-1 text-light outline-assessment" id="painel-icon">arrow_downward</i>
										Donwload
									</CSVLink>
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
					<Header logged={true} fixed={false} marginBottom={true} ufv="campo-grande" />
					<div className="row">
						<div className="col-11 mx-auto">
							<main className="col-lg-12 mx-auto p-0" role="main" id="main">

								<TitleBar text="Ambientais - Campo Grande" theme="environmental" />
								<Navigator date={this.state.monthDay} handlePrevDateNavigation={this.decrementDate} handleNextDateNavigation={this.incrementDate} />

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
}
