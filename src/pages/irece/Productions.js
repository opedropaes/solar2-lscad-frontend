import React, { Component } from 'react';
import Header from '../../components/HeaderWrapper';
import Footer from '../../components/FooterWrapper';
import Card from '../../components/Card';

import '../styles/Home.css';

export default class Productions extends Component {

  render() {
    return (
      <React.Fragment>
        <Header logged={true} fixed={false} marginBottom={true} ufv="irece" />
        <div className="container" id="inner-box">
          <main className="col-lg-12 p-5" role="main" id="main">

            <div className="row p-3">
              <div className="col-lg-4 mb-4" id="painel-cards-wrapper">
                <Card
                  id="mesa-1"
                  title="Mesa 1"
                  text="Mesa com tecnologia de silício microamorfo de baixa tensão, com 64 módulos e capacidade de geração de 10 kWp."
                  link="/irece/producao/mesas/1"
                  buttonText="Monitorar produção agora"
                  buttonActive={true}
                  theme="production"
                />
              </div>

              <div className="col-lg-4 mb-4" id="painel-cards-wrapper">
                <Card
                  id="mesa-2"
                  title="Mesa 2"
                  text="Mesa com tecnologia de silício microamorfo de alta tensão, com 66 módulos e capacidade de geração de 10 kWp."
                  link="/irece/producao/mesas/2"
                  buttonText="Monitorar produção agora"
                  buttonActive={true}
                  theme="production"
                />
              </div>

              <div className="col-lg-4" id="painel-cards-wrapper">
                <Card
                  id="mesa-3"
                  title="Mesa 3"
                  text="Mesa com tecnologia de telureto de cadmio, com 96 módulos e capacidade de geração de 10 kWp."
                  link="/irece/producao/mesas/3"
                  buttonText="Monitorar produção agora"
                  buttonActive={true}
                  theme="production"
                />
              </div>

            </div>

            <div className="row pb-3 px-3">
              <div className="col-lg-4" id="painel-cards-wrapper">
                <Card
                  id="mesa-4"
                  title="Mesa 4"
                  text="Mesa com tecnologia de disseleneto de cobre, indio e galio, com 72 módulos e capacidade de geração de 10 kWp."
                  link="/irece/producao/mesas/4"
                  buttonText="Monitorar produção agora"
                  buttonActive={true}
                  theme="production"
                />
              </div>
              <div className="col-lg-4" id="painel-cards-wrapper">
                <Card
                  id="mesa-5"
                  title="Mesa 5"
                  text="Mesa com tecnologia de silício policristalino, com 38 módulos e capacidade de geração de 10 kWp."
                  link="/irece/producao/mesas/5"
                  buttonText="Monitorar produção agora"
                  buttonActive={true}
                  theme="production"
                />
              </div>
              <div className="col-lg-4" id="painel-cards-wrapper">
                <Card
                  id="mesa-total"
                  title="Produção total"
                  text="Monitore toda a produção referentes à unidade de Irecê, em conjunto, comparando a produção das mesas uma a uma."
                  link="/irece/producao/mesas/total"
                  buttonText="Monitorar produção agora"
                  buttonActive={true}
                  theme="production"
                />
              </div>
            </div>


          </main>


        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
