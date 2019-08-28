import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';

export default class BarChart extends Component {
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
				<Bar
					data={this.props.data}
					options={this.props.options}
				/>
			</React.Fragment>
		);
	}

}
