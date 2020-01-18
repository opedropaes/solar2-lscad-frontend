import React, { Component } from 'react';

// import { Container } from './styles';

export default class DynamoDBAttributes extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			this.props.attributes.map(att => {
				return (
					<option key={att} value={att}>{att}</option>
				)
			})
		);
	}
}
