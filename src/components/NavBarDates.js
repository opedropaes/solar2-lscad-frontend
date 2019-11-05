import React, { Component } from 'react';
import Spinner from '../components/Spinner';

export default class NavBarDates extends Component {
	constructor(props) {
		super(props);
		this.state = {
			date: this.props.date,
			loading: false
		};
	}

	handleClick = () => {
		this.setState({
			loading: true,
			date: this.props.date
		});
	}

	UNSAFE_componentWillUpdate (newProps, newState) {
		if (newProps.date !== this.props.date) {
			this.setState({ loading: false });
		}
	}

	render() {

		return (
			<div className="collapse navbar-collapse mx-auto" id="navbar-dates">
				<ul className="navbar-nav mr-auto">
					<button className="btn btn-outline-light nav-link " onClick={this.props.handlePrevDateNavigation} onClickCapture={this.handleClick} disabled={this.props.leftNavigationDisabled}>
						<li className="nav-item flew-grow-1 mx-auto my-auto p-0" id="arrow-left">
							<i className="material-icons">chevron_left</i>
						</li>
					</button>

					<li className="nav-item flew-grow-1 mx-auto mt-2" id="now">{this.props.date}</li>

					<button className="btn btn-outline-light nav-link" onClick={this.props.handleNextDateNavigation} onClickCapture={this.handleClick} disabled={this.props.rightNavigationDisabled}>
						<li className="nav-item flew-grow-1 mx-auto my-auto p-0" id="arrow-right">
							<i className="material-icons">chevron_right</i>
						</li>
					</button>

					<Spinner loading={this.state.loading} />

				</ul>
			</div>
		);
	}
}
