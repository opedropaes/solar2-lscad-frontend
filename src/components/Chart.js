import React, { Component } from 'react';
import api from '../services/api';
import { Line } from 'react-chartjs-2';

const data = {
	period: "day",
	type: 'line',
	backgroundColor: 'rgba(66,161,245, 0)',
	borderColor: 'rgba(66,161,245,1.0)',
	pointBackgroundColor: 'rgba(66,161,245,0.7)',
	pointHoverRadius: 7,
	borderWidth: 3,
	lineTension: 0,
}

export default class Chart extends Component {
	state = {
		period: this.props.period,
		interval: [],
		collected: [],
	}

	async componentDidMount() {
		let response = await api.get('/irece/producao');
	}

	render() {
		return (
			<React.Fragment>
				<div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container">
					<div id="chart-box">
						<Line />
					</div>
				</div>
			</React.Fragment>
		);
	}
}
