import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../pages/styles/Home.css';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {} 
    }

    render() {
        if(this.props.theme === "production") {
            if (this.props.buttonActive) {
                return (
                    <div className="card" id={this.props.id}>
                        <div className="card-header text-center h5">
                        <i className="material-icons md-24 title-bar-icon" >trending_up</i>&nbsp;
                            {this.props.title}
                        </div>
                        <div className="card-body text-center">
                            <p className="card-text">{this.props.text}</p>
                            <Link to={this.props.link} className="btn btn-primary waves-effect waves-light">{this.props.buttonText}</Link>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="card" id={this.props.id}>
                        <div className="card-header text-center h5">
                        <i className="material-icons md-24 title-bar-icon" >trending_up</i>&nbsp;
                            {this.props.title}
                        </div>
                        <div className="card-body text-center">
                            <p className="card-text">{this.props.text}</p>
                            <Link to={this.props.link} className="btn btn-primary waves-effect waves-light disabled">{this.props.buttonText}</Link>
                        </div>
                    </div>
                );
            }
        } else if(this.props.theme === "loss") {
            if (this.props.buttonActive) {
                return (
                    <div className="card" id={this.props.id}>
                        <div className="card-header text-center h5">
                        <i className="material-icons md-24 title-bar-icon" >trending_down</i>&nbsp;
                            {this.props.title}
                        </div>
                        <div className="card-body text-center">
                            <p className="card-text">{this.props.text}</p>
                            <Link to={this.props.link} className="btn btn-primary waves-effect waves-light">{this.props.buttonText}</Link>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="card" id={this.props.id}>
                        <div className="card-header text-center h5">
                        <i className="material-icons md-24 title-bar-icon" >trending_down</i>&nbsp;
                            {this.props.title}
                        </div>
                        <div className="card-body text-center">
                            <p className="card-text">{this.props.text}</p>
                            <Link to={this.props.link} className="btn btn-primary waves-effect waves-light disabled">{this.props.buttonText}</Link>
                        </div>
                    </div>
                );
            }
        } else if (this.props.theme === "environmental") {
            if (this.props.buttonActive) {
                return (
                    <div className="card" id={this.props.id}>
                        <div className="card-header text-center h5">
                        <i className="material-icons md-24 title-bar-icon" >wb_sunny</i>&nbsp;
                            {this.props.title}
                        </div>
                        <div className="card-body text-center">
                            <p className="card-text">{this.props.text}</p>
                            <Link to={this.props.link} className="btn btn-primary waves-effect waves-light">{this.props.buttonText}</Link>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="card" id={this.props.id}>
                        <div className="card-header text-center h5">
                        <i className="material-icons md-24 title-bar-icon" >wb_sunny</i>&nbsp;
                            {this.props.title}
                        </div>
                        <div className="card-body text-center">
                            <p className="card-text">{this.props.text}</p>
                            <Link to={this.props.link} className="btn btn-primary waves-effect waves-light disabled">{this.props.buttonText}</Link>
                        </div>
                    </div>
                );
            }
        } else if(this.props.theme === "robot") {
            if (this.props.buttonActive) {
                return (
                    <div className="card" id={this.props.id}>
                        <div className="card-header text-center h5">
                        <i className="material-icons md-24 title-bar-icon" >memory</i>&nbsp;
                            {this.props.title}
                        </div>
                        <div className="card-body text-center">
                            <p className="card-text">{this.props.text}</p>
                            <Link to={this.props.link} className="btn btn-primary waves-effect waves-light">{this.props.buttonText}</Link>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="card" id={this.props.id}>
                        <div className="card-header text-center h5">
                        <i className="material-icons md-24 title-bar-icon" >memory</i>&nbsp;
                            {this.props.title}
                        </div>
                        <div className="card-body text-center">
                            <p className="card-text">{this.props.text}</p>
                            <Link to={this.props.link} className="btn btn-primary waves-effect waves-light disabled">{this.props.buttonText}</Link>
                        </div>
                    </div>
                );
            }
        } else {
            if (this.props.buttonActive) {
                return (
                    <div className="card" id={this.props.id}>
                        <div className="card-header text-center h5">
                            {this.props.title}
                        </div>
                        <div className="card-body text-center">
                            <p className="card-text">{this.props.text}</p>
                            <Link to={this.props.link} className="btn btn-primary waves-effect waves-light">{this.props.buttonText}</Link>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="card" id={this.props.id}>
                        <div className="card-header text-center h5">
                            {this.props.title}
                        </div>
                        <div className="card-body text-center">
                            <p className="card-text">{this.props.text}</p>
                            <Link to={this.props.link} className="btn btn-primary waves-effect waves-light disabled">{this.props.buttonText}</Link>
                        </div>
                    </div>
                );
            }
        }
    }
}
