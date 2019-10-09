/* eslint-disable eqeqeq */
import React, { Component } from 'react';

// import { Container } from './styles';

export default class NavButton extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
		
        if (this.props.active) {
			return (
				<button className="btn btn-outline-light nav-link active" >
					<li className="nav-item mx-auto" id={this.props.componentId}>
						{this.props.label}
					</li>
				</button>
			);
		} else {
			if (this.props.label == "Dia") {
				return (
					<button className="btn btn-outline-light nav-link" onClick={this.props.handleDayRendering}>
						<li className="nav-item mx-auto" id={this.props.componentId}>
							{this.props.label}
						</li>
					</button>
				);
			} else if (this.props.label == "Mês") {
				return (
					<button className="btn btn-outline-light nav-link" onClick={this.props.handleMonthRendering}>
						<li className="nav-item mx-auto" id={this.props.componentId}>
							{this.props.label}
						</li>
					</button>
				);
			}
		}
    }
}
