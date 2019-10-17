import React, { Component } from 'react';

import Header from '../components/HeaderWrapper';
import Footer from '../components/FooterWrapper';

// import ufvUFMS from '../../src/pages/imgs/osolarii.png';
import aneel from '../pages/imgs/aneel.png';
import cec from '../../src/pages/imgs/cec.png';
import cep from '../pages/imgs/cep.png';
import manauara from '../pages/imgs/manauara.png';
import ifba from '../pages/imgs/ifba.png';
import ifms from '../pages/imgs/ifms.png';
import ufms from '../pages/imgs/ufms.png';
import nexsolar from '../pages/imgs/nexsolar.png';

export default class About extends Component {
 
 
  render() {
    return (
      <React.Fragment>
        <Header logged={false} fixed={false} marginBottom={true} />
        <div className="main-wrapper">
          <main className="main" role="main">
          {/* <img id="header-img" alt="sobre" scr={ufvUFMS} className="img-fluid d-block" focusable="true" width="100%" height="100%"></img> */}
            <div className="container py-5">
              <div className="row">
                <div className="col-lg-6">

                  <h1 className="h1">Quem somos</h1>
                  <p className="pb-3 text-justify">
                    O projeto <b>"Projeto e desenvolvimento de tecnologias para identificação de sujidade e limpeza automática
                    em sistemas fotovoltaicos"</b>, também chamado de "Solar2" é um projeto de pesquisa, desenvolvimento e
                    inovação (P&D&I) que visa o desenvolvimento de tecnologias para automatizar as atividades de operação e
                    manutenção em usinas solares fotovoltaícas (UFVs). Especificamente, o projeto visa determinar a influência
                    da sujidade na perda de geração elétrica em UFVs e, de maneira automática e inteligente, realizar a
                    atividade (manutenção) de limpeza sobre os módulos fotovoltaícos.
                    <br />
                    O desenvolvimento é de fundamental importância para a evolução da indústria de o fotovoltaícos, uma vez que,
                    ao automatizar procedimentos de operação e manutenção, os custos com essas atividades serão reduzidos,
                    permitindo, como consequência, que o custo total da geração de energia elétrica fotovoltaíca também seja
                    reduzido.
                  </p>

                  <h1 className="h1">Financiadores</h1>
                  <p className="pb-3 text-justify">
                    Esse projeto é financiado pelas empresas&nbsp;
                    <a href={"https://www.globalparticipacoesenergia.com.br/energia/cec-companhia-energetica-candeias/"}
                    	className="text-dark font-italic"
						target="_blank"
						rel="noopener noreferrer">
                      	Companhia Energética Candeias
                    </a>
                    ,&nbsp;
                    <a href="https://www.globalparticipacoesenergia.com.br/energia/companhia-energetica-manauara-s-a-cem/"
					  target="_blank"
					  rel="noopener noreferrer"
					  className="text-dark font-italic">
                      Companhia Energética Manauara&nbsp;
                    </a>
                    e&nbsp;
                    <a href="https://www.globalparticipacoesenergia.com.br/energia/companhia-energetica-potiguar/"
					  target="_blank" 
					  rel="noopener noreferrer"
					  className="text-dark font-italic">
                      Companhia Energética Potiguar
                  </a>
                    , no âmbito do programa de&nbsp;
                  <a href="http://www.aneel.gov.br/programa-de-p-d"
					  target="_blank" 
					  rel="noopener noreferrer"
					  className="text-dark font-italic">
                      P&D Aneel.
                  </a>
                  </p>

                  <h1 className="h1">Executores</h1>
                  <p className="pb-3 text-justify">
                    As instituições executoras desse projeto são a&nbsp;
				  <a href="https://www.ufms.br/" 
					  target="_blank"
					  rel="noopener noreferrer"
					  className="text-dark font-italic">
                      Universidade Federal de Mato Grosso do Sul,
                  </a>
                  &nbsp;a empresa&nbsp;
				  <a href="http://nexsolar.com.br/" 
					  target="_blank"
					  rel="noopener noreferrer"
					  className="text-dark font-italic">
                      NexSolar Ltda,&nbsp;
                  </a>
					<a href="http://portal.ifba.edu.br/" 
						target="_blank"
						rel="noopener noreferrer"
						className="text-dark font-italic">
                      Instituto Federal da Bahia&nbsp;
                  </a>
                    e&nbsp;
				  <a href="http://www.ifms.edu.br/"
					  target="_blank" 
					  rel="noopener noreferrer"
					  className="text-dark font-italic">
                      Instituto Federal de Mato Grosso do Sul.
                  </a>
                  </p>

                </div>

                <div className="col-lg-6">
                  <div className="text-center pb-3 p-0">
                    <a href="http://www.aneel.gov.br/programa-de-p-d" target="_blank" 
					  rel="noopener noreferrer">
                      <img src={aneel} alt="ANEEL P&D" className="rounded pb-3 shrink img-fluid mx-4"></img>
                    </a>
                    <a href="https://globalparticipacoesenergia.com.br/energia/cec-companhia-energetica-candeias/"
                      target="_blank" 
					  rel="noopener noreferrer">
                      <img src={cec} alt="Companhia Energética Candeias"
                        className="rounded py-3 shrink img-fluid mx-2"></img>
                    </a>
                    <a href="https://globalparticipacoesenergia.com.br/energia/companhia-energetica-potiguar/" target="_blank" 
					  rel="noopener noreferrer">
                      <img src={cep} alt="Companhia Energética Potiguar"
                        className="rounded pb-3 shrink img-fluid"></img>
                    </a>
                    <a href="https://globalparticipacoesenergia.com.br/energia/companhia-energetica-manauara-s-a-cem/"
                      target="_blank" 
					  rel="noopener noreferrer">
                      <img src={manauara} alt="Companhia Energética Manauara"
                        className="rounded shrink img-fluid"></img>
                    </a>
                    <a href="http://portal.ifba.edu.br/" target="_blank" 
					  rel="noopener noreferrer">
                      <img src={ifba} alt="Instituto Federal da Bahia"
                        className="rounded shrink img-fluid"></img>
                    </a>
                    <a href="http://www.ifms.edu.br/" target="_blank" 
					  rel="noopener noreferrer">
                      <img src={ifms} alt="Instituto Federal de Mato Grosso do Sul"
                        className="rounded shrink img-fluid mx-3"></img>
                    </a>
                    <a href="https://www.ufms.br/" target="_blank" 
					  rel="noopener noreferrer">
                      <img src={ufms} alt="Universidade Federal de Mato Grosso do Sul"
                        className="rounded shrink img-fluid mx-3 mt-3 mb-0"></img>
                    </a>
                    <a href="http://nexsolar.com.br/" target="_blank" 
					  rel="noopener noreferrer">
                      <img src={nexsolar} alt="Nexsolar Ltda." className="rounded shrink img-fluid"></img>
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </main>

          <Footer />

        </div>

      </React.Fragment>
    )
  }
}
