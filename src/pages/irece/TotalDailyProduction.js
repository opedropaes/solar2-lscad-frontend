import React, { Component } from 'react';
import LineChart from '../../components/LineChart';
import BarChart from '../../components/BarChart';

export default class TotalDailyProduction extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		if (!this.props.isLoading) {
			return (
				<React.Fragment>
					<div className="row m-4 px-0 py-0" id="row-chart">
						<div className="col-md-10 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-1">
							<BarChart
								data={{ labels: this.props.labels, datasets: [this.props.totalProduction] }}
								options={this.props.totalOptions}
							/>
						</div>
						<div className="col-md-10 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-2">
							<LineChart
								data={{ labels: this.props.labels, datasets: [this.props.table1, this.props.table2, this.props.table3, this.props.table4, this.props.table5] }}
								options={this.props.comparisonOptions}
							/>
						</div>
					</div>
				</React.Fragment>
			);

		} else {
			return (
				<React.Fragment>
					<div className="row m-4 px-0 py-0" id="row-chart">
						<div className="col-md-10 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-1">
							<BarChart
								data={{ labels: [], datasets: [] }}
							/>
						</div>
						<div className="col-md-10 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-2">
							<LineChart
								data={{ labels: [], datasets: [] }}
							/>
						</div>
					</div>
				</React.Fragment>
			);
		}
	}
}
