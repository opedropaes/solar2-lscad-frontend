import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ufvUFMS from '../pages/imgs/ufvufms3.png';
import ufvCandeias from '../pages/imgs/ufvcandeias1.png';
import ufvIrece from '../pages/imgs/ufvirece1.png';

export default class Carousel extends Component {
  render() {
	return (
		<div id="myCarousel" className="carousel slide" data-ride="carousel">
			<ol className="carousel-indicators">
				<li data-target="#myCarousel" data-slide-to="0" className="active"></li>
				<li data-target="#myCarousel" data-slide-to="1" className=""></li>
				<li data-target="#myCarousel" data-slide-to="2" className=""></li>
			</ol>
			<div className="carousel-inner">
				<div className="carousel-item active">
					<img id="header-img" src={ufvUFMS} className="img-fluid d-block" alt="UFV-UFMS, planta fotovoltáica" focusable="true" width="100%" height="100%"></img>
					<div className="container">
						<div className="carousel-caption text-left" id="containerSlide1">
							<h1 id="carouselText1" className="d-none d-sm-inline-block">Controle total dos dados.</h1>
							<p>Visualize, compare e monitore os dados da sua unidade fotovoltáica com facilidade.</p>
							<p><Link className="btn btn-lg btn-primary d-none d-sm-inline-block" to="/painel" role="button">Monitorar agora</Link></p>
						</div>
					</div>
				</div>
				<div className="carousel-item">
					<img src={ufvCandeias} className="img-fluid d-block" alt="UFV-Candeias, planta fotovoltáica" width="100%" height="100%"></img>
					<div className="container">
						<div className="carousel-caption">
							<h1 id="carouselText2" className="d-none d-md-inline-block">Mantenha sempre limpo.</h1>
							<p id="carouselP2">Monitore as ações do dispositivo de limpeza em tempo real, agende limpezas e solicite fotos do estado da sua planta fotovoltáica.</p>
							<p><Link className="btn btn-lg btn-primary d-none d-md-inline-block" to="/painel" role="button">Monitorar agora</Link></p>
						</div>
					</div>
				</div>
				<div className="carousel-item">
					<img src={ufvIrece} className="img-fluid d-block" alt="UFV-Irece, planta fotovoltáica" width="100%" height="100%"></img>
					<div className="container">
						<div className="carousel-caption">
							<h1 id="carouselText2" className="d-none d-md-inline-block">Acompanhe a situação de cada unidade.</h1>
							<p id="carouselP2">Veja a produção do dia, dados energéticos e ambientais na sua unidade fotovoltáica.</p>
							<p><Link className="btn btn-lg btn-primary d-none d-md-inline-block" to="/painel" role="button">Monitorar agora</Link></p>
						</div>
					</div>
				</div>
			</div>
			<Link className="carousel-control-prev" to="#myCarousel" role="button" data-slide="prev">
				<span className="carousel-control-prev-icon" aria-hidden="true"></span>
				<span className="sr-only">Anterior</span>
			</Link>
			<Link className="carousel-control-next" to="#myCarousel" role="button" data-slide="next">
				<span className="carousel-control-next-icon" aria-hidden="true"></span>
				<span className="sr-only">Próximo</span>
			</Link>
		</div>
	);
  }
}
