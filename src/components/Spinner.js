import React, { Component } from 'react';

export default class Spinner extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		if (this.props.loading) {
			return (
				<div className="mx-auto mt-2" id="loading">
					<div className="spinner-border spinner-border-sm text-dark mb-1 mr-1" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				</div>
			);
		} else {
			return (
				<div></div>
			);
		}
	}
}
