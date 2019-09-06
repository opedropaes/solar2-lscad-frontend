import React, { Component } from 'react';

export default class FormButton extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		if (this.props.loading) {
			return (
				<button className="btn btn-primary btn-lg btn-block mb-3 mt-2" id="submit" disabled>
					<div className="spinner-border spinner-border-sm text-light mb-1 mr-1" role="status">
						<span className="sr-only">Loading...</span>
					</div>
					{this.props.label}
				</button>
			);
		}
		else {
			return (
				<button className="btn btn-primary btn-lg btn-block mb-3 mt-2" id="submit">
					{this.props.label}
				</button>
			);
		}
	}
}
