import React, { Component } from 'react';

import painelSolar1 from '../pages/imgs/painel-solar-1.png';
import painelSolar2 from '../pages/imgs/painel-solar.png';
import painelSolar3 from '../pages/imgs/painel-solar-3.png';

export default class MarketingInfo extends Component {
  render() {
	return (
		<div className="container marketing pt-5 pb-5 ">
			<div className="row">
				<div className="col-lg-4 mb-3">
					<img src={painelSolar1} className="bd-placeholder-img" alt="UFV-UFMS, planta fotovoltáica" width="140" height="140" focusable="false" aria-label="Placeholder: 140x140"></img>
					<h2>UFV UFMS</h2>
					<p className="text-justify">Com o total de 38 módulos, a planta fotovoltáica de Campo Grande-MS, localizada na Faculdade de Medicina Veterinária
					  e Zootecnia da Universidade Federal de Mato Grosso do Sul, utiliza o sistema de silício policristalino em suas placas e é capaz de gerar até 8,2 kWp.
                  				</p>
					<p className="pt-auto align-self-end">
						<a className="btn btn-secondary" href="/dados" role="button" id="detalhesUfms">Veja detalhes »</a>
					</p>
				</div>
				<div className="col-lg-4 mb-3">
					<img src={painelSolar2} className="bd-placeholder-img" alt="UFV-Irece-BA, planta fotovoltáica" width="140" height="140" focusable="false" aria-label="Placeholder: 140x140"></img>
					<h2>UFV Irecê-BA</h2>
					<p className="text-justify">A planta fotovoltáica de Irecê, na Bahia, localiza-se no Instituto Federal da Bahia - Unidade Irecê, possui 336 módulos divididos em 5 mesas,
					  com tecnologias diferentes, todas estas com capacidade de geração de 10 kWp.
                  				</p>
					<p className="pt-auto align-self-end">
						<a className="btn btn-secondary" href="/dados#unidadeIrece" role="button" id="detalhesUfms">Veja detalhes »</a>
					</p>
				</div>
				<div className="col-lg-4 mb-3">
					<img src={painelSolar3} className="bd-placeholder-img" alt="UFV-Candeias-BA, planta fotovoltáica" width="140" height="140" focusable="false" aria-label="Placeholder: 140x140"></img>
					<h2>UFV Candeias-BA</h2>
					<p className="text-justify">A planta fotovoltáica de Candeias, na Bahia, possui 12 módulos divididos em 2 mesas, sendo cada uma a metade de uma mesa inteira.
					  Possui um sistema de silício policristalino e sua capacidade de geração é de 4,08 kWp.
                  				</p>
					<p className="pt-auto align-self-end">
						<a className="btn btn-secondary" href="/dados#unidadeCandeias" role="button" id="detalhesUfms">Veja detalhes »</a>
					</p>
				</div>
			</div>
		</div>
	);
  }
}
