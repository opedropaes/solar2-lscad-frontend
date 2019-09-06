import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderUI from './HeaderUI';
import Toggle from './ToggleButton';

export default class HeaderWrapper extends Component {

	constructor(props) {
		super(props);
		this.state = { to: "/campo-grande/painel" }
	}

	render() {
		if (this.props.transition) {
			return (
				<div className="header-wrapper">
					<header>
						<nav className="navbar navbar-expand-lg navbar-dark bg-dark my-2">
							<button className="navbar-toggler mx-auto" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
								<span className="navbar-toggler-icon"></span>
							</button>
							<HeaderUI logged={false} ufv={this.props.ufv} transition={this.props.transition} />
						</nav>
					</header>
				</div>
			);
		} else {
			if (this.props.fixed && this.props.marginBottom) {
				return (
					<div className="header-wrapper">
						<header>
							<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top mb-3">
								<Link className="nav-link text-white pl-0 ml-2" to="/painel" alt="Home">SOLAR II</Link>
								<Toggle logged={this.props.logged} />
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
								<Link className="nav-link text-white pl-0 ml-2" to="/painel" alt="Home">SOLAR II</Link>
								<Toggle logged={this.props.logged} />
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
								<Link className="nav-link text-white pl-0 ml-2" to="/painel" alt="Home">SOLAR II</Link>
								<Toggle logged={this.props.logged} />
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
								<Link className="nav-link text-white pl-0 ml-2" to="/painel" alt="Home">SOLAR II</Link>
								<Toggle logged={this.props.logged} />
								<HeaderUI logged={this.props.logged} ufv={this.props.ufv} />
							</nav>
						</header>
					</div>
				);
			}
		}
	}
}
