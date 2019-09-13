import React, { Component } from 'react';
import HeaderWrapper from '../components/HeaderWrapper';
import MainWrapper from '../components/MainWrapper';
import FooterWrapper from '../components/FooterWrapper';
import api from '../services/api';

import './styles/Home.css';

export default class Home extends Component {

	componentDidMount () { api.get('/'); }

	render() {
		return (
			<React.Fragment>
				<HeaderWrapper logged={false} fixed={true} marginBottom={false} />
				<MainWrapper />
				<FooterWrapper />
			</React.Fragment>
		);
	}
}
