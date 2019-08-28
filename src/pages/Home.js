import React, { Component } from 'react';
import HeaderWrapper from '../components/HeaderWrapper';
import MainWrapper from '../components/MainWrapper';
import FooterWrapper from '../components/FooterWrapper';

import './styles/Home.css';

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <HeaderWrapper logged={false} fixed={true} marginBottom={false}/>
        <MainWrapper />
        <FooterWrapper />
      </React.Fragment>
    );
  }
}
