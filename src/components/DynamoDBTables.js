import React, { Component } from 'react';

// import { Container } from './styles';

export default class DynamoDBTables extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			this.props.tables.map(table => {
				return (
					<option key={table} value={table}>{table}</option>
				)
			})
		);
	}
}
