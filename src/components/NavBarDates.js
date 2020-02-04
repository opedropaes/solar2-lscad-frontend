import React, { Component } from 'react';
import Spinner from '../components/Spinner';
import CalendarNav from '../components/CalendarNav';

export default class NavBarDates extends Component {

	now = new Date();

	constructor(props) {
		super(props);
		this.state = {
			date: this.props.date,
			loading: false,
			minDate: new Date(2018, 0, 1),
			maxDate: new Date(this.now.getFullYear(), this.now.getMonth(), this.now.getDate())
		};
	}

	handleClick = () => {
		this.setState({
			loading: true,
			date: this.props.date
		});
	}

	UNSAFE_componentWillUpdate(newProps, newState) {
		if (newProps.date !== this.props.date) {
			this.setState({ loading: false });
		}
	}

	render() {

		return (
			<>
				<div className="collapse navbar-collapse mx-auto" id="navbar-dates">
					<ul className="navbar-nav mr-auto">
						<button className="btn btn-outline-light nav-link " onClick={this.props.handlePrevDateNavigation} onClickCapture={this.handleClick} disabled={this.props.leftNavigationDisabled}>
							<li className="nav-item flew-grow-1 mx-auto my-auto p-0" id="arrow-left">
								<i className="material-icons">chevron_left</i>
							</li>
						</button>
						<button type="button" className="btn btn-outline-light nav-link" data-toggle="modal" data-target="#exampleModalCenter">
							<li className="nav-item flew-grow-1 mx-auto mb-1 pb-1 pt-0" id="now">
								{this.props.date}
							</li>
						</button>

						<button className="btn btn-outline-light nav-link" onClick={this.props.handleNextDateNavigation} onClickCapture={this.handleClick} disabled={this.props.rightNavigationDisabled}>
							<li className="nav-item flew-grow-1 mx-auto my-auto p-0" id="arrow-right">
								<i className="material-icons">chevron_right</i>
							</li>
						</button>

						<Spinner loading={this.state.loading} />

					</ul>
				</div>

				<div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered modal-sm" role="document">
						<div className="modal-content p-0">
							<div className="container-fluid p-0">
								<div className="modal-body p-0 mx-auto">
									<div className="container-fluid p-0">
										<div className="row mx-auto">
											<div className="col-lg-12 p-0">
												<CalendarNav locale="pt-BR" minDate={this.state.minDate} maxDate={this.state.maxDate} />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}
