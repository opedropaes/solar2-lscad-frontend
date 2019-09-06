import React, { Component } from 'react';

// import { Container } from './styles';

export default class ToggleButton extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		if (this.props.logged) {
			return (
				<React.Fragment>
					<button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
				</React.Fragment>
			)
		} else {
			return <div></div>
		}
	}
}
