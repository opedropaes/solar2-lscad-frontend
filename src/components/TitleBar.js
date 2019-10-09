/* eslint-disable eqeqeq */
import React, { Component } from 'react';

export default class TitleBar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        if(this.props.theme == 'production') {
            return (
                <React.Fragment>
                    <div id="pac-hoje" className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-1 px-3 ">
                        <h3 className="h3" id="h3"><i className="material-icons md-24 title-bar-icon" >trending_up</i> {this.props.text}</h3>
                        <h5 className="h5" id="performance-ratio">{this.props.pr}</h5>
                    </div>
                </React.Fragment>
            );
        } else if (this.props.theme == 'environmental') {
            return (
                <React.Fragment>
                    <div id="pac-hoje" className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-1 ml-3 ">
                        <h3 className="h3" id="h3"><i className="material-icons md-24 title-bar-icon" >wb_sunny</i> {this.props.text}</h3>
                    </div>
                </React.Fragment>
            );
        } else if (this.props.theme == 'losses') {
            return (
                <React.Fragment>
                    <div id="pac-hoje" className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-1 ml-3 ">
                        <h3 className="h3" id="h3"><i className="material-icons md-24 title-bar-icon" >trending_down</i> {this.props.text}</h3>
                        <h5 className="h5" id="loss-percentage">{this.props.lossPercentage}</h5>
                    </div>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <div id="pac-hoje" className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 mb-1 ml-3 ">
                        <h3 className="h3" id="h3">{this.props.text}</h3>
                    </div>
                </React.Fragment>
            );
        }
    }
}
