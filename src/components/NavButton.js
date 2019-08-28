import React, { Component } from 'react';

// import { Container } from './styles';

export default class NavButton extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <button className="btn btn-outline-light nav-link">
                <li className="nav-item mx-auto active" id={this.props.componentId}>
                    {this.props.label}
                </li>
            </button>
        );
    }
}
