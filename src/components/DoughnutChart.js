import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
// import { Container } from './styles';

export default class DoughnutChart extends Component {
    constructor(props) {
        // eslint-disable-next-line no-undef
        super(props);
        this.state = {
            data: []
        }
    }
    render() {
        return (
            <React.Fragment>
                <Doughnut
                    data={this.props.data}
                    options={this.props.options}
                />
            </React.Fragment>
        );
    }
}
