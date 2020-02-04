import React, { Component } from 'react';
import Calendar from 'react-calendar';

export default class CalendarNav extends Component {
  constructor(props) {
	  super(props);
	  this.state = {};
  }

  render() {
	return <Calendar locale={this.props.locale} minDate={this.props.minDate} maxDate={this.props.maxDate} />;
  }

}
