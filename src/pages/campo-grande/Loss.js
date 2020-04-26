/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import Header from '../../components/HeaderWrapper';
import Footer from '../../components/FooterWrapper';
import LineChart from '../../components/LineChart';
import DoughnutChart from '../../components/DoughnutChart';
import TitleBar from '../../components/TitleBar';
import Navigator from '../../components/Navigator';
import Table from '../../components/Table';
import howManyDaysThisMonth from '../../utils/daysInMonthDefiner';

import dateFormater from '../../utils/dateFormater';
import api from '../../services/api';
import BarChart from '../../components/BarChart';

export default class Loss extends Component {
	constructor(props) {
		super(props);
		this.state = {
			day: 0,
			monthDay: 'carregando...',
			period: 'day',
			monthActive: true,
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

		let path = "/campo-grande/perdas"
		let apiResponse = await api.get(path + "/" + date + "/" + period);

		this.refreshState(apiResponse.data)
			.then(newStateObject => {
				if (this._isMounted || !this._isUpdated) {
					this.setState({
						day: newStateObject.day,
						month: newStateObject.month,
						year: newStateObject.year,
						monthDay: newStateObject.monthDay,
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

		if (res.period === "day") {

			return ({

				day: res.day,
				month: res.month,
				year: res.year,
				monthDay: res.monthDay,
				period: res.period,
				interval: res.interval,
				data: {
					losses: {
						data: res.loss,
						label: 'Percentual de perdas (%)',
						borderColor: 'rgba(255,48,48, 1.0)',
						backgroundColor: 'rgba(255,48,48, 0.7)',
						lineTension: 0,
						borderWidth: 3,
						pointBackgroundColor: 'rgba(255,48,48, 1.0)'
					},
					lossesAverage: res.lossesAverage,
					totalLosses: res.totalLosses
				},
				options: {
					animation: {
						duration: 1000,
					},
					title: {
						display: true,
						fontsize: 24,
						text: "Perdas diárias",
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
				
			});
		}

		
	}

	decrementDate = () => {

		let day = this.state.day;
		let month = this.state.month;
		let year = this.state.year;

		if (this.state.period == "day") {
			
			if ((year == 2018 && month >= 9 && day >= 1) || (year > 2018)) {

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

				if (year == 2019 && month == 11 && day == 28) {
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
			if ((year == 2018 && month >= 9) && year > 2018) {

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

				if (year == 2018) {
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
			if (this.state.period === "day") {

				return (
					<React.Fragment>
						<Header logged={true} fixed={false} marginBottom={true} ufv="irece" />
						<div className="row">
							<div className="col-11 mx-auto">
								<main className="col-lg-12 mx-auto " role="main" id="main">

									<TitleBar text="Perdas" theme="losses" />
									<Navigator
										date={this.state.monthDay}
										handlePrevDateNavigation={this.decrementDate}
										handleNextDateNavigation={this.incrementDate}
										leftNavigationDisabled={this.state.leftNavigationDisabled}
										rightNavigationDisabled={this.state.rightNavigationDisabled}
									/>

									<div className="row m-4 px-0 py-0" id="row-chart">
										<ul className="text-left col-lg-12 pb-2 border-bottom">
											<li key="modelo1" className="ml-3">
												<h6>Perdas por modelo de predição por controle:</h6>
											</li>
										</ul>
										<div className="col-lg-12">
											<div className="col-md-8 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-1">
												<LineChart
													data={{ labels: this.state.labels, datasets: [this.state.data.losses] }}
													options={this.state.options}
												/>
											</div>
										</div>
										<div className="col-lg-12 col-md-12 col-sm-12 text-center mb-5 mt-2">
											<em>Percentual de perdas no exato momento obtido, em comparação com a produção total possível da mesa.</em>
										</div>
										
									</div>									
								</main>
							</div>
						</div>
						<Footer />
					</React.Fragment>
				);
			}
		} else {
			return (
				<React.Fragment>
					<Header logged={true} fixed={false} marginBottom={true} ufv="irece" />
					<div className="row">
						<div className="col-11 mx-auto">
							<main className="col-lg-12 mx-auto p-0" role="main" id="main">

								<TitleBar text="Perdas" theme="losses" />
								<Navigator
									date={this.state.monthDay}
									handlePrevDateNavigation={this.decrementDate}
									handleNextDateNavigation={this.incrementDate}
									leftNavigationDisabled={this.state.leftNavigationDisabled}
									rightNavigationDisabled={this.state.rightNavigationDisabled}
								/>
								<div className="row m-4 px-0 py-0" id="row-chart">

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
