/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import LineChart from '../../components/LineChart';
import BarChart from '../../components/BarChart';
import TitleBar from '../../components/TitleBar';
import Navigator from '../../components/Navigator';
import Header from '../../components/HeaderWrapper';
import Footer from '../../components/FooterWrapper';

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
	// actualDay = this.now.getDate();
	actualDay = 1;
	actualMonth = this.now.getMonth() + 1;
	actualYear = this.now.getFullYear();

	componentDidMount() {

		let date = dateFormater(this.actualDay, this.actualMonth, this.actualYear);
		this._isMounted = true;
		this.fetchApiResponse(date, 'day');

	}

	fetchApiResponse = async (date, period) => {

		const table = this.props.location.pathname;
		let apiResponse = await api.get('/irece/producao/' + table + '/' + date + '/' + period);
		let newStateObject = await this.refreshState(apiResponse.data, table, period);

		if (this._isMounted || !this._isUpdated) {
			this.setState({
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
		let tablesBackgroundColor = ['rgba(255,48,48, 0)', 'rgba(255,166,0,0)', 'rgba(66, 134, 244, 0)', 'rgba(50,172,92, 0)', 'rgba(255,48,48, 0)', 'rgba(66,161,245,1.0)'];
		let tablesBorderColor = ['rgba(255,48,48, 1.0)', 'rgba(255,166,0,1.0)', 'rgba(66, 134, 244, 1.0)', 'rgba(50,172,92, 1.0)', 'rgba(255,48,48, 1.0)', 'rgba(66,161,245,1.0)'];
		let tablesPointBackgroundColor = ['rgba(255,48,48, 0.7)', 'rgba(255,166,0,0.7)', 'rgba(66, 134, 244, 0.7)', 'rgba(50,172,92, 0.7)', 'rgba(255,48,48, 0.7)', 'rgba(66,161,245,0.7)'];
		
		if (period == "day") {
			if (table <= 6) {
			
				return ({
					day: res.day || this.actualDay,
					month: res.month || this.actualMonth,
					year: res.year,
					monthDay: res.monthDay,
					period: res.period,
					interval: res.interval,
					data: {
						tableData: {
							data: res.tableData,
							lineTension: 0,
							label: tablesLabel[res.table-1],
							backgroundColor: tablesBackgroundColor[res.table-1],
							borderColor: tablesBorderColor[res.table-1],
							pointBackgroundColor: tablesPointBackgroundColor[res.table-1],
						},
					},
					options: {
						animation: {
							duration: 1000,
						},
						title: {
							display: true,
							fontsize: 24,
							text: "Potência (kW)",
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
							borderWidth: 1,
							pointHoverBorderWidth: 7,
							label: tablesLabel[0],
							backgroundColor: tablesBackgroundColor[0],
							borderColor: tablesBorderColor[0],
							pointBackgroundColor: tablesPointBackgroundColor[0],
						},
						table2: {
							data: res.table2,
							lineTension: 0,
							borderWidth: 1,
							pointHoverBorderWidth: 7,
							label: tablesLabel[1],
							backgroundColor: tablesBackgroundColor[1],
							borderColor: tablesBorderColor[1],
							pointBackgroundColor: tablesPointBackgroundColor[1],
						},
						table3: {
							data: res.table3,
							lineTension: 0,
							borderWidth: 1,
							pointHoverBorderWidth: 7,
							label: tablesLabel[2],
							backgroundColor: tablesBackgroundColor[2],
							borderColor: tablesBorderColor[2],
							pointBackgroundColor: tablesPointBackgroundColor[2],
						},
						table4: {
							data: res.table4,
							lineTension: 0,
							borderWidth: 1,
							pointHoverBorderWidth: 7,
							label: tablesLabel[3],
							backgroundColor: tablesBackgroundColor[3],
							borderColor: tablesBorderColor[3],
							pointBackgroundColor: tablesPointBackgroundColor[3],
						},
						table5: {
							data: res.table5,
							lineTension: 0,
							borderWidth: 1,
							pointHoverBorderWidth: 7,
							label: tablesLabel[4],
							backgroundColor: tablesBackgroundColor[4],
							borderColor: tablesBorderColor[4],
							pointBackgroundColor: tablesPointBackgroundColor[4],
						},
						tableSum: {
							data: res.table6,
							lineTension: 0,
							borderWidth: 1,
							label: tablesLabel[5],
							backgroundColor: tablesBackgroundColor[5],
							borderColor: tablesBorderColor[5],
							pointBackgroundColor: tablesPointBackgroundColor[5],
						},
					},
					options: {
						animation: {
							duration: 1000,
						},
						title: {
							display: true,
							fontsize: 24,
							text: "Potência (kW)",
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

		if (!this.state.isLoading) {
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
									<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-sum">
										<BarChart
											data={{ labels: this.state.labels, datasets: [this.state.data.tableSum] }}
											options={this.state.options}
										/>
									</div>
									<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-1">
										<LineChart
											data={{ labels: this.state.labels, datasets: [this.state.data.table1] }}
											options={this.state.options}
										/>
									</div>
									<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-2">
										<LineChart
											data={{ labels: this.state.labels, datasets: [this.state.data.table2] }}
											options={this.state.options}
										/>
									</div>
									<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-containe-3">
										<LineChart
											data={{ labels: this.state.labels, datasets: [this.state.data.table3] }}
											options={this.state.options}
										/>
									</div>
									<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-4">
										<LineChart
											data={{ labels: this.state.labels, datasets: [this.state.data.table4] }}
											options={this.state.options}
										/>
									</div>
									<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-5">
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
					{/* {this.state.res.map(item => <ul key={item.table}>{JSON.stringify(item.res)}</ul>)} */}
				</React.Fragment>
			);

		} else {
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
									<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-sum">
										<BarChart
											data={{ labels: [], datasets: [] }}
										/>
									</div>
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
									<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-containe-3">
										<LineChart
											data={{ labels: [], datasets: [] }}
										/>
									</div>
									<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-4">
										<LineChart
											data={{ labels: [], datasets: [] }}
										/>
									</div>
									<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-5">
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