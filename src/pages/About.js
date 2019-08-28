import React, { Component } from 'react';
import { Link } from 'react-router-dom'

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
                    <Link to="https://globalparticipacoesenergia.com.br/energia/cec-companhia-energetica-candeias/"
                      target="_blank" className="text-dark font-italic">
                      Companhia Energética Candeias
                    </Link>
                    ,&nbsp;
                    <Link to="https://globalparticipacoesenergia.com.br/energia/companhia-energetica-manauara-s-a-cem/"
                      target="_blank" className="text-dark font-italic">
                      Companhia Energética Manauara&nbsp;
                    </Link>
                    e&nbsp;
                    <Link to="https://globalparticipacoesenergia.com.br/energia/companhia-energetica-potiguar/"
                      target="_blank" className="text-dark font-italic">
                      Companhia Energética Potiguar
                  </Link>
                    , no âmbito do programa de&nbsp;
                  <Link to="http://www.aneel.gov.br/programa-de-p-d"
                      target="_blank" className="text-dark font-italic">
                      P&D Aneel.
                  </Link>
                  </p>

                  <h1 className="h1">Executores</h1>
                  <p className="pb-3 text-justify">
                    As instituições executoras desse projeto são a&nbsp;
                  <Link to="https://www.ufms.br/" target="_blank" className="text-dark font-italic">
                      Universidade Federal de Mato Grosso do Sul,
                  </Link>
                  &nbsp;a empresa&nbsp;
                  <Link to="http://nexsolar.com.br/" target="_blank" className="text-dark font-italic">
                      NexSolar Ltda,&nbsp;
                  </Link>
                    <Link to="http://portal.ifba.edu.br/" target="_blank" className="text-dark font-italic">
                      Instituto Federal da Bahia&nbsp;
                  </Link>
                    e&nbsp;
                  <Link to="http://www.ifms.edu.br/" target="_blank" className="text-dark font-italic">
                      Instituto Federal de Mato Grosso do Sul.
                  </Link>
                  </p>

                </div>

                <div className="col-lg-6">
                  <div className="text-center pb-3 p-0">
                    <Link to="http://www.aneel.gov.br/programa-de-p-d" target="_blank">
                      <img src={aneel} alt="ANEEL P&D" className="rounded pb-3 shrink img-fluid mx-4"></img>
                    </Link>
                    <Link to="https://globalparticipacoesenergia.com.br/energia/cec-companhia-energetica-candeias/"
                      target="_blank">
                      <img src={cec} alt="Companhia Energética Candeias"
                        className="rounded py-3 shrink img-fluid mx-2"></img>
                    </Link>
                    <Link to="https://globalparticipacoesenergia.com.br/energia/companhia-energetica-potiguar/" target="_blank">
                      <img src={cep} alt="Companhia Energética Potiguar"
                        className="rounded pb-3 shrink img-fluid"></img>
                    </Link>
                    <Link to="https://globalparticipacoesenergia.com.br/energia/companhia-energetica-manauara-s-a-cem/"
                      target="_blank">
                      <img src={manauara} alt="Companhia Energética Manauara"
                        className="rounded shrink img-fluid"></img>
                    </Link>
                    <Link to="http://portal.ifba.edu.br/" target="_blank">
                      <img src={ifba} alt="Instituto Federal da Bahia"
                        className="rounded shrink img-fluid"></img>
                    </Link>
                    <Link to="http://www.ifms.edu.br/" target="_blank">
                      <img src={ifms} alt="Instituto Federal de Mato Grosso do Sul"
                        className="rounded shrink img-fluid mx-3"></img>
                    </Link>
                    <Link to="https://www.ufms.br/" target="_blank">
                      <img src={ufms} alt="Universidade Federal de Mato Grosso do Sul"
                        className="rounded shrink img-fluid mx-3 mt-3 mb-0"></img>
                    </Link>
                    <Link to="http://nexsolar.com.br/" target="_blank">
                      <img src={nexsolar} alt="Nexsolar Ltda." className="rounded shrink img-fluid"></img>
                    </Link>
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
