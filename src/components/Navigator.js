/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import NavButton from './NavButton';
import NavBarDates from './NavBarDates';
import Spinner from './Spinner';
// import { Container } from './styles';

export default class Navigator extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		if (this.props.month == "allowed" && this.props.year == "allowed") {
			return (
				<React.Fragment>
					<div className="container-fluid mx-auto p-0 m-0" id="nav-box">
						<nav className="navbar navbar-expand-lg navbar-light bg-light border-top py-0 mt-0 pt-0" id="nav-chart">
							<button className="navbar-toggler mx-auto" aria-expanded="false" aria-controls="#navbar-dates" aria-label="Toggle navigation" type="button" data-toggle="collapse" data-target="#navbar-dates">
								<span className="navbar-toggler-icon"></span>
							</button>

							<NavBarDates
								date={this.props.date}
								handlePrevDateNavigation={this.props.handlePrevDateNavigation}
								handleNextDateNavigation={this.props.handleNextDateNavigation}
								leftNavigationDisabled={this.props.leftNavigationDisabled}
								rightNavigationDisabled={this.props.rightNavigationDisabled}
							/>

							<div className="collapse navbar-collapse mx-auto" id="navbar-dates">
								<ul className="navbar-nav ml-auto">
									<Spinner loading={this.props.isLoading} />
									<NavButton label="Dia" componentId="day-nav" active={this.props.dayActive} handleDayRendering={this.props.handleDayRendering} />
									<NavButton label="Mês" componentId="month-nav" active={this.props.monthActive} handleMonthRendering={this.props.handleMonthRendering} />
									<NavButton label="Ano" componentId="year-nav" active={this.props.yearActive} handleYearRendering={this.props.handleYearRendering} />
								</ul>
							</div>

						</nav>
					</div>
				</React.Fragment>
			)
		} else if (this.props.month == "allowed" && this.props.year != "allowed") {
			return (
				<React.Fragment>
					<div className="container-fluid mx-auto p-0 m-0" id="nav-box">
						<nav className="navbar navbar-expand-lg navbar-light bg-light border-top py-0 mt-0 pt-0" id="nav-chart">
							<button className="navbar-toggler mx-auto" aria-expanded="false" aria-controls="#navbar-dates" aria-label="Toggle navigation" type="button" data-toggle="collapse" data-target="#navbar-dates">
								<span className="navbar-toggler-icon"></span>
							</button>

							<NavBarDates
								date={this.props.date}
								handlePrevDateNavigation={this.props.handlePrevDateNavigation}
								handleNextDateNavigation={this.props.handleNextDateNavigation}
								leftNavigationDisabled={this.props.leftNavigationDisabled}
								rightNavigationDisabled={this.props.rightNavigationDisabled}
							/>

							<div className="collapse navbar-collapse mx-auto" id="navbar-dates">
								<ul className="navbar-nav ml-auto">
									<Spinner loading={this.props.isLoading} />
									<NavButton label="Dia" componentId="day-nav" active={!this.props.monthActive} handleDayRendering={this.props.handleDayRendering} />
									<NavButton label="Mês" componentId="month-nav" active={this.props.monthActive} handleMonthRendering={this.props.handleMonthRendering} />
								</ul>
							</div>

						</nav>
					</div>
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					<div className="container-fluid mx-auto p-0 m-0" id="nav-box">
						<nav className="navbar navbar-expand-lg navbar-light bg-light border-top pl-0 pr-3 m-0 py-0" id="nav-chart">
							<button className="navbar-toggler mx-auto" aria-expanded="false" aria-controls="#navbar-dates" aria-label="Toggle navigation" type="button" data-toggle="collapse" data-target="#navbar-dates">
								<span className="navbar-toggler-icon"></span>
							</button>

							<NavBarDates 
								date={this.props.date}
								handlePrevDateNavigation={this.props.handlePrevDateNavigation}
								handleNextDateNavigation={this.props.handleNextDateNavigation}
								leftNavigationDisabled={this.props.leftNavigationDisabled}
								rightNavigationDisabled={this.props.rightNavigationDisabled}
							/>

							<div className="collapse navbar-collapse mx-auto" id="navbar-dates">
								<ul className="navbar-nav ml-auto">
									<NavButton label="Dia" componentId="day-nav" />
								</ul>
							</div>

						</nav>
					</div>
				</React.Fragment>
			);
		}
	}
}
