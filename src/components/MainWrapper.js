import React, { Component } from 'react';
import Carousel from './Carousel';
import Info from './MarketingInfo';

// import { Container } from './styles';

export default class MainWrapper extends Component {
	render() {
		return (
			<div className="main-wrapper">
				<main className="main" role="main">
					<Carousel />
					<Info />
				</main>
			</div>
		);
	}
}
