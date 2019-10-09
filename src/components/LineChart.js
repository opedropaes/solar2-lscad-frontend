import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

export default class LineChart extends Component {
	constructor(props) {
		// eslint-disable-next-line no-undef
		super(props);
		this.state = {
			data: []
		}
	}

	render() {

		return (
			<React.Fragment>
				<Line
					data={this.props.data}
					options={this.props.options}
				/>
			</React.Fragment>
		);
		
	}
}
