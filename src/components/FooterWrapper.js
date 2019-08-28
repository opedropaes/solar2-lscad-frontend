import React, { Component } from 'react';

export default class FooterWrapper extends Component {
	render() {
		return (
			<div className="footer-wrapper">
				<footer className="page-footer font-small dark" id="footer">
					<small>
						<div className="footer text-center py-3" id="footer-inner-div">Projeto Solar II -
               				<a href="https://lscad.facom.ufms.br" target="_blank" rel="noopener noreferrer"> LSCAD - UFMS</a>
						</div>
					</small>
				</footer>
			</div>
		);
	}
}
