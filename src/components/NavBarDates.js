import React, { Component } from 'react';

export default class NavBarDates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date:  this.props.date
        };
    } 

    render() {

        return (
            <div className="collapse navbar-collapse mx-auto" id="navbar-dates">
                <ul className="navbar-nav mr-auto">
                    <button className="btn btn-outline-light nav-link" onClick={this.props.handlePrevDateNavigation}>
                        <li className="nav-item flew-grow-1 mx-auto my-auto p-0" id="arrow-left">
                            <i className="material-icons">chevron_left</i>
                        </li>
                    </button>

                    <li className="nav-item flew-grow-1 mx-auto mt-2" id="now">{this.props.date}</li>

                    <button className="btn btn-outline-light nav-link" onClick={this.props.handleNextDateNavigation}>
                        <li className="nav-item flew-grow-1 mx-auto my-auto p-0" id="arrow-right">
                            <i className="material-icons">chevron_right</i>
                        </li>
                    </button>
                </ul>
            </div>
        );
    }
}
