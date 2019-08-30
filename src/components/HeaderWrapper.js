import React, { Component } from 'react';
import HeaderUI from './HeaderUI';

export default class HeaderWrapper extends Component {

	toggle = <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

	callToggle = () => {
		if(this.props.logged) return this.toggle;
	}

	render() {
		if (this.props.fixed && this.props.marginBottom) {
			return (
				<div className="header-wrapper">
					<header>
						<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top mb-3">
							<a className="nav-link text-white pl-0" href="/" alt="Home">SOLAR II</a>
							{this.callToggle}
							<HeaderUI logged={this.props.logged} ufv={this.props.ufv} />
						</nav>
					</header>
				</div>
			);
		} else if (!this.props.fixed && this.props.marginBottom) {
			return (
				<div className="header-wrapper">
					<header>
						<nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
							<a className="nav-link text-white pl-0" href="/" alt="Home">SOLAR II</a>
							<button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>
							<HeaderUI logged={this.props.logged} ufv={this.props.ufv} />
						</nav>
					</header>
				</div>
			);
		} else if (this.props.fixed && !this.props.marginBottom) {
			return (
				<div className="header-wrapper">
					<header>
						<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
							<a className="nav-link text-white pl-0" href="/" alt="Home">SOLAR II</a>
							<button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>
							<HeaderUI logged={this.props.logged} ufv={this.props.ufv} />
						</nav>
					</header>
				</div>
			);
		} else {
			return (
				<div className="header-wrapper">
					<header>
						<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
							<a className="nav-link text-white pl-0" href="/" alt="Home">SOLAR II</a>
							<button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>
							<HeaderUI logged={this.props.logged} ufv={this.props.ufv} />
						</nav>
					</header>
				</div>
			);
		}
	}
}
