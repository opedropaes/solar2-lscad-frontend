import React, { Component } from 'react';
import LineChart from '../../components/LineChart';

export default class IndividualProductions extends Component {
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
							<LineChart
								data={{ labels: this.props.labels, datasets: [this.props.production, this.props.capacityFactor] }}
								options={this.props.productionOptions}
							/>
						</div>
						<div className="col-md-5 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-2">
							<LineChart
								data={{ labels: this.props.labels, datasets: [this.props.alternateCurrent] }}
								options={this.props.generalOptions}
							/>
						</div>
						<div className="col-md-5 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-3">
							<LineChart
								data={{ labels: this.props.labels, datasets: [this.props.continuousCurrent] }}
								options={this.props.generalOptions}
							/>
						</div>
						<div className="col-md-5 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-4">
							<LineChart
								data={{ labels: this.props.labels, datasets: [this.props.alternateVoltage] }}
								options={this.props.generalOptions}
							/>
						</div><div className="col-md-5 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-5">
							<LineChart
								data={{ labels: this.props.labels, datasets: [this.props.continuousVoltage] }}
								options={this.props.generalOptions}
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
							<LineChart
								data={{ labels: [], datasets: [] }}
							/>
						</div>
						<div className="col-md-5 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-2">
							<LineChart
								data={{ labels: [], datasets: [] }}
							/>
						</div>
						<div className="col-md-5 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-3">
							<LineChart
								data={{ labels: [], datasets: [] }}
							/>
						</div>
						<div className="col-md-5 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-4">
							<LineChart
								data={{ labels: [], datasets: [] }}
							/>
						</div><div className="col-md-5 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-5">
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
