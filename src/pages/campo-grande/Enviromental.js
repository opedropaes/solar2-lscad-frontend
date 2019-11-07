/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { Component } from 'react';

import LineChart from '../../components/LineChart';
import BarChart from '../../components/BarChart';
import RadarChart from '../../components/RadarChart';
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
	currentDay = this.now.getDate();
	currentMonth = this.now.getMonth() + 1;
	currentYear = this.now.getFullYear();

	componentDidMount() {
		let date = dateFormater(this.actualDay, this.actualMonth, this.actualYear);
		this._isMounted = true;
		this.fetchApiResponse(date, this.state.period);
	}

	fetchApiResponse = async (date, period) => {

		let apiResponse = await api.get('/campo-grande/ambientais/' + date + "/" + period);

		this.refreshState(apiResponse.data, period)
			.then(async (newStateObject) => {
				let toDonwload = {}
				
				if (period === "day") {
					toDonwload = this.formatCSV(newStateObject.toDonwload);
				}

				if (this._isMounted || !this._isUpdated) {
					this.setState({
						day: newStateObject.day,
						month: newStateObject.month,
						year: newStateObject.year,
						monthDay: newStateObject.monthDay,
						period: newStateObject.period,
						labels: newStateObject.interval,
						radarLabels: ["N", "NE", "L", "SE", "S", "SO", "O", "NO"],
						quarterLabels: newStateObject.quartersInterval || [0],
						irradiationQuartersLabels: newStateObject.irradiationQuartersInterval || [0],
						data: newStateObject.data,
						dataForTable: newStateObject.dataForTable || [0],
						options: newStateObject.options,
						toDonwload: toDonwload || [0],
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
					(differentDay) ? 'Velocidade do vento média' : 'Velocidade do vento atual',
					(differentDay) ? 'Umidade média do ar' : 'Umidade do ar atual',
					(differentDay) ? 'Média de massa PM1 sobre a mesa' : 'Massa PM1 sobre a mesa',
					(differentDay) ? 'Média de massa PM2 sobre a mesa' : 'Massa PM2 sobre a mesa',
					(differentDay) ? 'Média de massa PM4 sobre a mesa' : 'Massa PM4 sobre a mesa',
					(differentDay) ? 'Média de massa PM10 sobre a mesa' : 'Massa PM10 sobre a mesa'
				];

				let temperatureSum = (res.temperatures.length) ? res.temperatures.reduce((acc, cur) => acc + cur) : 0;
				let averageTemperature = temperatureSum / (res.temperatures.length || 1);
				let windSpeedsSum = (res.windSpeeds.length) ? res.windSpeeds.reduce((acc, cur) => acc + cur) : 0;
				let windSpeedsAverage = windSpeedsSum / (res.windSpeeds.length || 1);
				let PM1Sum = (res.PM1Particulates.length) ? res.PM1Particulates.reduce((acc, cur) => acc + cur) : 0;
				let PM1Average = PM1Sum / (res.PM1Particulates.length || 1);
				let PM2Sum = (res.PM2Particulates.length) ? res.PM2Particulates.reduce((acc, cur) => acc + cur) : 0;
				let PM2Average = PM2Sum / (res.PM2Particulates.length || 1);
				let PM4Sum = (res.PM4Particulates.length) ? res.PM4Particulates.reduce((acc, cur) => acc + cur) : 0;
				let PM4Average = PM4Sum / (res.PM4Particulates.length || 1);
				let PM10Sum = (res.PM10Particulates.length) ? res.PM10Particulates.reduce((acc, cur) => acc + cur) : 0;
				let PM10Average = PM10Sum / (res.PM10Particulates.length || 1);
				let totalHumidity = (res.humidity.length) ? res.humidity.reduce((acc, cur) => acc + cur) : 0;
				let averageHumidity = parseFloat((totalHumidity / (res.humidity.length || 1)).toFixed(1));

				let temperature = res.temperatures.pop();
				let windSpeed = res.windSpeeds.pop();
				let PM1 = res.PM1Particulates.pop();
				let PM2 = res.PM2Particulates.pop();
				let PM4 = res.PM4Particulates.pop();
				let PM10 = res.PM10Particulates.pop();
				let humidity = res.humidity.pop();

				let body = [[
					(differentDay) ? parseFloat(averageTemperature).toFixed(1) + " °C" : parseFloat(temperature).toFixed(1) + " °C" || 0 + " °C",
					(differentDay) ? parseFloat(windSpeedsAverage).toFixed(1) + " km/h" || 0 + " km/h" : parseFloat(windSpeed).toFixed(1) + " km/h" || 0 + " km/h",
					(differentDay) ? parseFloat(averageHumidity).toFixed(1) + " %" || "" : parseFloat(humidity).toFixed(1) + " %" || "",
					(differentDay) ? parseFloat(PM1Average).toFixed(1) + " μg/m³" || 0 + " μg/m³" : parseFloat(PM1).toFixed(1) + " μg/m³" || 0 + " μg/m³",
					(differentDay) ? parseFloat(PM2Average).toFixed(1) + " μg/m³" || 0 + " μg/m³" : parseFloat(PM2).toFixed(1) + " μg/m³" || 0 + " μg/m³",
					(differentDay) ? parseFloat(PM4Average).toFixed(1) + " μg/m³" || 0 + " μg/m³" : parseFloat(PM4).toFixed(1) + " μg/m³" || 0 + " μg/m³",
					(differentDay) ? parseFloat(PM10Average).toFixed(1) + " μg/m³" || 0 + " μg/m³" : parseFloat(PM10).toFixed(1) + " μg/m³" || 0 + " μg/m³",
				]];

				let dataForTable = {
					head,
					body
				};

				// let irradiation = res.irradiation.map(item => item * 1000);

				let items = {
					day: res.day,
					month: res.month,
					year: res.year,
					monthDay: res.monthDay,
					period: res.period,
					interval: res.interval,
					quartersInterval: res.quartersInterval,
					irradiationQuartersInterval: res.irradiationInterval,
					toDonwload: {
						date: res.monthDay,
						interval: res.interval,
						irradiations: res.irradiation,
						PM1Particulates: res.PM1Particulates,
						PM2Particulates: res.PM2Particulates,
						PM4Particulates: res.PM4Particulates,
						PM10Particulates: res.PM10Particulates,
						PM1Numbers: res.PM1Numbers,
						PM2Numbers: res.PM2Numbers,
						PM4Numbers: res.PM4Numbers,
						PM10Numbers: res.PM10Numbers,
						averageSizes: res.averageSizes,
						temperatures: res.temperatures,
						windDirections: res.windDirections,
						windSpeeds: res.windSpeeds,
					},
					dataForTable,
					data: {
						table1: {
							data: res.irradiation,
							lineTension: 0,
							label: 'Irradiação inclinada sobre a mesa (W/m²)',
							backgroundColor: 'rgba(66,161,245,0)',
							borderColor: 'rgba(66,161,245,1.0)',
							pointBackgroundColor: 'rgba(66,161,245,1.0)',
							pointHoverRadius: 7
						},
						table2: {
							data: res.PM1ParticulatesQuarters,
							lineTension: 0,
							label: 'Massa de particulados PM1 (μg/m³)',
							backgroundColor: 'rgba(66,161,245,1.0)',
							borderColor: 'rgba(66,161,245,1.0)',
							pointBackgroundColor: 'rgba(66,161,245,1.0)',
							pointHoverRadius: 7,
							yAxisID: 'left'
						},
						table3: {
							data: res.PM2ParticulatesQuarters,
							lineTension: 0,
							label: 'Massa de particulados PM2 (μg/m³)',
							backgroundColor: 'rgba(66,161,245,1.0)',
							borderColor: 'rgba(66,161,245,1.0)',
							pointBackgroundColor: 'rgba(66,161,245,1.0)',
							pointHoverRadius: 7,
							yAxisID: 'left'
						},
						table4: {
							data: res.PM4ParticulatesQuarters,
							lineTension: 0,
							label: 'Massa de particulados PM4 (μg/m³)',
							backgroundColor: 'rgba(66,161,245,1.0)',
							borderColor: 'rgba(66,161,245,1.0)',
							pointBackgroundColor: 'rgba(66,161,245,1.0)',
							pointHoverRadius: 7,
							yAxisID: 'left'
						},
						table5: {
							data: res.PM10ParticulatesQuarters,
							lineTension: 0,
							label: 'Massa de particulados PM10 (μg/m³)',
							backgroundColor: 'rgba(66,161,245,1.0)',
							borderColor: 'rgba(66,161,245,1.0)',
							pointBackgroundColor: 'rgba(66,161,245,1.0)',
							pointHoverRadius: 7,
							yAxisID: 'left'
						},
						table6: {
							type: 'line',
							data: res.PM1NumbersQuarters,
							lineTension: 0,
							label: 'Concentração de particulados PM1 (μ/m³)',
							backgroundColor: 'rgba(255,48,48, 0)',
							borderColor: 'rgba(255,48,48, 1.0)',
							pointBackgroundColor: 'rgba(255,48,48, 0.7)',
							pointHoverRadius: 7,
							yAxisID: 'right'
						},
						table7: {
							type: 'line',
							data: res.PM2NumbersQuarters,
							lineTension: 0,
							label: 'Concentração de particulados PM2 (μ/m³)',
							backgroundColor: 'rgba(255,48,48, 0)',
							borderColor: 'rgba(255,48,48, 1.0)',
							pointBackgroundColor: 'rgba(255,48,48, 0.7)',
							pointHoverRadius: 7,
							yAxisID: 'right'
						},
						table8: {
							type: 'line',
							data: res.PM4NumbersQuarters,
							lineTension: 0,
							label: 'Concentração de particulados PM4 (μ/m³)',
							backgroundColor: 'rgba(255,48,48, 0)',
							borderColor: 'rgba(255,48,48, 1.0)',
							pointBackgroundColor: 'rgba(255,48,48, 0.7)',
							pointHoverRadius: 7,
							yAxisID: 'right'
						},
						table9: {
							type: 'line',
							data: res.PM10NumbersQuarters,
							lineTension: 0,
							label: 'Concentração de particulados PM10 (μ/m³)',
							backgroundColor: 'rgba(255,48,48, 0)',
							borderColor: 'rgba(255,48,48, 1.0)',
							pointBackgroundColor: 'rgba(255,48,48, 0.7)',
							pointHoverRadius: 7,
							yAxisID: 'right'
						},
						windDirection: {
							data: [
								res.eachWindDirectionPercentage.north,
								res.eachWindDirectionPercentage.northEast,
								res.eachWindDirectionPercentage.east,
								res.eachWindDirectionPercentage.southEast,
								res.eachWindDirectionPercentage.south,
								res.eachWindDirectionPercentage.southWest,
								res.eachWindDirectionPercentage.west,
								res.eachWindDirectionPercentage.northWest
							],
							lineTension: 0,
							label: 'Percentagem nesta direção durante o dia',
							backgroundColor: 'rgba(66,161,245,0)',
							borderColor: 'rgba(66,161,245,1.0)',
							pointBackgroundColor: 'rgba(66,161,245,1.0)',
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
								},
	
								],
								xAxes: [{
									beginAtZero: true,
									ticks: {
										callback: function (dataLabel, index) {
											return index % 10 === 0 ? dataLabel : '';
										},
										maxRotation: 0,
									}
								}]
							},
						},
						particulateOptions: {
							animation: {
								duration: 1000,
							},
							title: {
								display: true,
								fontsize: 24,
								text: "Particulados",
							},
							labels: {
								fontStyle: 'bold',
							},
							scales: {
								yAxes: [{
									beginAtZero: false,
									position: "left",
									id: "left"
								},
								{
									beginAtZero: false,
									position: "right",
									id: "right"
								},
	
								],
								xAxes: [{
									beginAtZero: true,
									ticks: {
										callback: function (dataLabel, index) {
											return index % 10 === 0 ? dataLabel : '';
										},
										maxRotation: 0,
									}
								}]
							},
						},
						windDirectionOptions: {
							animation: {
								duration: 1000,
							},
							title: {
								display: true,
								fontsize: 24,
								text: "Direção do vento",
							},
							labels: {
								fontStyle: 'bold',
							},
							tooltips: {
								enabled: true,
								callbacks: {
									label: function(tooltipItem, data) {
										return data.datasets[tooltipItem.datasetIndex].label + ' : ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
									}
								}
							}
						}
					}

				}

				resolve(items)

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
						accumulateHumidities: {
							data: res.accumulateHumidities,
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
						},
						accumulatePM1: {
							data: res.accumulatePM1,
							lineTension: 0,
							label: 'PM1 acumulados (μg/m³)',
							backgroundColor: 'rgba(66,161,245,1.0)',
							borderColor: 'rgba(66,161,245,1.0)',
							pointBackgroundColor: 'rgba(66,161,245,1.0)',
							pointHoverRadius: 7,
							yAxisID: "right",
						},
						averagesPM1: {
							type: 'line',
							data: res.averagesPM1,
							lineTension: 0,
							label: 'Média de PM1 (μg/m³)',
							backgroundColor: 'rgba(255,48,48, 0)',
							borderColor: 'rgba(255,48,48, 1.0)',
							pointBackgroundColor: 'rgba(255,48,48, 0.7)',
							pointHoverRadius: 7,
							yAxisID: "left"

						},
						accumulatePM2: {
							data: res.accumulatePM2,
							lineTension: 0,
							label: 'PM2 acumulados (μg/m³)',
							backgroundColor: 'rgba(66,161,245,1.0)',
							borderColor: 'rgba(66,161,245,1.0)',
							pointBackgroundColor: 'rgba(66,161,245,1.0)',
							pointHoverRadius: 7,
							yAxisID: "left"
						},
						averagesPM2: {
							type: 'line',
							data: res.averagesPM2,
							lineTension: 0,
							label: 'Média de PM2 (μg/m³)',
							backgroundColor: 'rgba(255,48,48, 0)',
							borderColor: 'rgba(255,48,48, 1.0)',
							pointBackgroundColor: 'rgba(255,48,48, 0.7)',
							pointHoverRadius: 7,
							yAxisID: "right"
						},
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
						pm1Options: {
							animation: {
								duration: 1000,
							},
							title: {
								display: true,
								fontsize: 24,
								text: "Particulados PM1",
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
						pm2Options: {
							animation: {
								duration: 1000,
							},
							title: {
								display: true,
								fontsize: 24,
								text: "Particulados PM2",
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
					}

				}

				resolve(items)

			}

			else if (period === "year") {

				const {
					irradiations,
					temperatures,
					windSpeeds,
					rainfalls,
					PM1Array,
					PM2Array,
					yearInterval,
					year,
					period
				} = res;

				let higherIrradiations = [];
				let averageIrradiations = [];
				
				let lowerTemperature = [];
				let higherTemperature = [];
				let averageTemperature = [];

				let averageWindSpeed = [];
				let higherWindSpeed = [];

				let accumulateRainfall = [];
				let higherAccumulateRainfall = [];

				let averagePM1 = [];
				let accPM1 = [];
				let higherPM1Concentration = [];

				let averagePM2 = [];
				let accPM2 = [];
				let higherPM2Concentration = [];

				irradiations.map(item => {
					higherIrradiations.push(item.higherIrradiationDay + ": " + item.higherIrradiation );
					averageIrradiations.push(item.averageIrradiation);
				});

				temperatures.map(item => {
					lowerTemperature.push(item.lowerTemperatureDay + ": " + item.lowerTemperature);
					higherTemperature.push(item.higherTemperatureDay + ": " + item.higherTemperature);
					averageTemperature.push(item.averageTemperature);
				});

				windSpeeds.map(item => {
					let day = ((item.higherWindSpeedDay === 'null') ? 0 : item.higherWindSpeedDay);
					averageWindSpeed.push(item.averageWindSpeed);
					higherWindSpeed.push(day + ": " + item.higherWindSpeed);
				});

				rainfalls.map(item => {
					higherAccumulateRainfall.push(item.higherAccumulateRainfallDay + ": " + item.higherAccumulateRainfallDay + ": " + item.higherAccumulateRainfall);
					accumulateRainfall.push(item.accumulateRainfall);
				});

				PM1Array.map(item => {
					higherPM1Concentration.push(item.higherPM1ConcentrationDay + ": " + item.higherPM1Concentration);
					averagePM1.push(item.averagePM1);
					accPM1.push(item.accPM1);
				});

				PM2Array.map(item => {
					higherPM2Concentration.push(item.higherPM2ConcentrationDay + ": " + item.higherPM2Concentration);
					averagePM2.push(item.averagePM2);
					accPM2.push(item.accPM2);
				});

				let items = {
					day: this.actualDay,
					month: this.actualMonth,
					year: year,
					monthDay: year,
					period: period,
					interval: yearInterval,
					data: {
						irradiations: {
							averageIrradiations: {
								data: averageIrradiations,
								lineTension: 0,
								label: 'Média (W/m²)',
								backgroundColor: 'rgba(66,161,245,1.0)',
								borderColor: 'rgba(66,161,245,1.0)',
								pointBackgroundColor: 'rgba(66,161,245,1.0)',
								pointHoverRadius: 7
							},
							higherIrradiations: {
								type: 'line',
								data: higherIrradiations,
								lineTension: 0,
								label: 'Pico mensal - Dia (W/m³)',
								borderWidth: 3,
								backgroundColor: 'rgba(255,48,48, 0)',
								borderColor: 'rgba(255,48,48, 1.0)',
								pointBackgroundColor: 'rgba(255,48,48, 0.7)',
								pointHoverRadius: 7
							},
						},
						temperatures: {
							averageTemperature: {
								data: averageTemperature,
								lineTension: 0,
								label: 'Média (°C)',
								backgroundColor: 'rgba(66, 134, 244, 1.0)',
								borderColor: 'rgba(66, 134, 244, 1.0)',
								pointBackgroundColor: 'rgba(66, 134, 244, 0.7)',
								pointHoverRadius: 7
							},
							lowerTemperature: {
								type: 'line',
								data: lowerTemperature,
								lineTension: 0,
								label: 'Menor temperatura (°C)',
								borderWidth: 3,
								backgroundColor: 'rgba(255,166,0,0)',
								borderColor: 'rgba(255,166,0,1.0)',
								pointBackgroundColor: 'rgba(255,166,0, 0.7)',
								pointHoverRadius: 7,
								yAxisID: "right"
							},
							higherTemperature: {
								type: 'line',
								data: higherTemperature,
								lineTension: 0,
								label: 'Maior temperatura (°C)',
								borderWidth: 3,
								backgroundColor: 'rgba(255,48,48, 0)',
								borderColor: 'rgba(255,48,48, 1.0)',
								pointBackgroundColor: 'rgba(255,48,48, 0.7)',
								pointHoverRadius: 7,
								yAxisID: "right"
							}
						},
						windSpeeds: {
							averageWindSpeed: {
								data: averageWindSpeed,
								lineTension: 0,
								borderWidth: 3,
								label: 'Média (km/h)',
								backgroundColor: 'rgba(255,166,0, 0)',
								borderColor: 'rgba(255,166,0,1.0)',
								pointBackgroundColor: 'rgba(255,166,0, 0.7)',
								pointHoverRadius: 7
							},
							higherWindSpeed: {
								type: 'line',
								data: higherWindSpeed,
								lineTension: 0,
								label: 'Maior temperatura (km/h)',
								borderWidth: 3,
								backgroundColor: 'rgba(255,48,48, 0)',
								borderColor: 'rgba(255,48,48, 1.0)',
								pointBackgroundColor: 'rgba(255,48,48, 0.7)',
								pointHoverRadius: 7,
								yAxisID: "right"
							}
						},
						rainfalls: {
							higherAccumulateRainfall: {
								type: 'line',
								data: higherAccumulateRainfall,
								lineTension: 0,
								label: 'Pico mensal (mm/m³ - Dia)',
								borderWidth: 3,
								backgroundColor: 'rgba(255,48,48, 0)',
								borderColor: 'rgba(255,48,48, 1.0)',
								pointBackgroundColor: 'rgba(255,48,48, 0.7)',
								pointHoverRadius: 7,
								yAxisID: "right"
							},
							accumulateRainfall: {
								data: accumulateRainfall,
								lineTension: 0,
								borderWidth: 3,
								label: 'Total (mm/m³)',
								backgroundColor: 'rgba(255,166,0, 0)',
								borderColor: 'rgba(255,166,0,1.0)',
								pointBackgroundColor: 'rgba(255,166,0, 0.7)',
								pointHoverRadius: 7
							}
						},
						PM1: {
							higherPM1Concentration: {
								type: 'line',
								data: higherPM1Concentration,
								lineTension: 0,
								label: 'Concentração (#/m³)',
								backgroundColor: 'rgba(255,48,48, 0)',
								borderColor: 'rgba(255,48,48, 1.0)',
								pointBackgroundColor: 'rgba(255,48,48, 0.7)',
								pointHoverRadius: 7,
								yAxisID: "left"
							},
							averagePM1: {
								type: 'line',
								data: averagePM1,
								lineTension: 0,
								label: 'Média (μg/m³)',
								backgroundColor: 'rgba(255,48,48, 0)',
								borderColor: 'rgba(255,48,48, 1.0)',
								pointBackgroundColor: 'rgba(255,48,48, 0.7)',
								pointHoverRadius: 7,
								yAxisID: "left"
							},
							accPM1: {
								data: accPM1,
								lineTension: 0,
								label: 'Massa (#/m³)',
								backgroundColor: 'rgba(66,161,245,1.0)',
								borderColor: 'rgba(66,161,245,1.0)',
								pointBackgroundColor: 'rgba(66,161,245,1.0)',
								pointHoverRadius: 7,
								yAxisID: "right",
							}
						},
						PM2: {
							higherPM2Concentration: {
								type: 'line',
								data: higherPM2Concentration,
								lineTension: 0,
								label: 'Concentração (#/m³)',
								backgroundColor: 'rgba(255,48,48, 0)',
								borderColor: 'rgba(255,48,48, 1.0)',
								pointBackgroundColor: 'rgba(255,48,48, 0.7)',
								pointHoverRadius: 7,
								yAxisID: "left"
							},
							averagePM2: {
								type: 'line',
								data: averagePM2,
								lineTension: 0,
								label: 'Média (μg/m³)',
								backgroundColor: 'rgba(255,48,48, 0)',
								borderColor: 'rgba(255,48,48, 1.0)',
								pointBackgroundColor: 'rgba(255,48,48, 0.7)',
								pointHoverRadius: 7,
								yAxisID: "left"
							},
							accPM2: {
								data: accPM2,
								lineTension: 0,
								label: 'Massa (#/m³)',
								backgroundColor: 'rgba(66,161,245,1.0)',
								borderColor: 'rgba(66,161,245,1.0)',
								pointBackgroundColor: 'rgba(66,161,245,1.0)',
								pointHoverRadius: 7,
								yAxisID: "right",
							}
						},
						
					},
					options: {
						irradiation: {
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
						temperature: {
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
						rainfall: {
							animation: {
								duration: 1000,
							},
							title: {
								display: true,
								fontsize: 24,
								text: "Precipitação",
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
						windSpeed: {
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
						pm1: {
							animation: {
								duration: 1000,
							},
							title: {
								display: true,
								fontsize: 24,
								text: "Particulados PM1",
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
						pm2: {
							animation: {
								duration: 1000,
							},
							title: {
								display: true,
								fontsize: 24,
								text: "Particulados PM2",
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

	formatCSV = (obj) => {
		let response = []

		response.push([
			'Data',
			'Horario',
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
			'Velocidade do vento km/h',
			'Intervalo de irradiacao',
			'Irradiacao (W/m^3)'
		])

		for (let i = 0; i < obj.interval.length; i++) {
			response.push([
				obj.date,
				obj.interval[i],
				obj.irradiations[i],
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
				obj.windSpeeds[i],
			])
		}

		return response
	}

	render() {

		if (this.state.period === "day") {
			if (!this.state.isLoading) {
				return (
					<React.Fragment>
						<Header logged={true} fixed={false} marginBottom={true} ufv="campo-grande" />
						<div className="row">
							<div className="col-11 mx-auto">
								<main className="col-lg-12 mx-auto p-0" role="main" id="main">

									<TitleBar text="Ambientais - Campo Grande" theme="environmental" />
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
												data={{ labels: this.state.irradiationQuartersLabels, datasets: [this.state.data.table1] }}
												options={this.state.options.irradiationOptions}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-1">
											<RadarChart
												data={{ labels: this.state.radarLabels, datasets: [this.state.data.windDirection] }}
												options={this.state.options.windDirectionOptions}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-2">
											<BarChart
												data={{ labels: this.state.quarterLabels, datasets: [this.state.data.table6, this.state.data.table2] }}
												options={this.state.options.particulateOptions}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-3">
											<BarChart
												data={{ labels: this.state.quarterLabels, datasets: [this.state.data.table7, this.state.data.table3] }}
												options={this.state.options.particulateOptions}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-4">
											<BarChart
												data={{ labels: this.state.quarterLabels, datasets: [this.state.data.table8, this.state.data.table4] }}
												options={this.state.options.particulateOptions}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-5">
											<BarChart
												data={{ labels: this.state.quarterLabels, datasets: [this.state.data.table9, this.state.data.table5] }}
												options={this.state.options.particulateOptions}
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
											Download
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
									<TitleBar text="Ambientais - Campo Grande" theme="environmental" />
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
												data={{ labels: this.state.labels, datasets: [this.state.data.accumulateHumidities] }}
												options={this.state.options.humidityOptions}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-4">
											<LineChart
												data={{ labels: this.state.labels, datasets: [this.state.data.averageWindSpeeds] }}
												options={this.state.options.windSpeedOptions}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-5">
											<BarChart
												data={{ labels: this.state.labels, datasets: [this.state.data.averagesPM1, this.state.data.accumulatePM1] }}
												options={this.state.options.pm1Options}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-6">
											<BarChart
												data={{ labels: this.state.labels, datasets: [this.state.data.averagesPM2, this.state.data.accumulatePM2] }}
												options={this.state.options.pm2Options}
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
									<TitleBar text="Ambientais - Campo Grande" theme="environmental" />
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
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-5">
											<BarChart
												data={{ labels: [], datasets: [] }}
											/>
										</div>
										<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-6">
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
