import React, { Component } from 'react';
import { Radar } from 'react-chartjs-2';

export default class RadarChart extends Component {
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
				<Radar
					data={this.props.data}
					options={this.props.options}
					id={this.props.id}
				/>
			</React.Fragment>
		);
	}

}
