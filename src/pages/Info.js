import React, { Component } from 'react';
import Header from '../components/HeaderWrapper';
import Footer from '../components/FooterWrapper';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

export default class Info extends Component {
  render() {
    return (
      <React.Fragment>
        <Header logged={false} fixed={false} marginBottom={false} ufv="campo-grande" />
        <div className="container-fluid">
          <div className="row">


            <main role="main" className="col-md-10 mx-auto col-lg-12 px-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
                <div className="flex-row">
                  <h2 id="unidadeUFMS">Campo Grande - MS, UFMS</h2>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                  <div className="btn-group mr-2">
                  </div>
                  <div className="btn-group" role="group">
                    
                    <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                      <Link className="dropdown-item" to="#unidadeUFMS">UFMS</Link>
                      <Link className="dropdown-item" to="#unidadeIrece">Irecê-BA</Link>
                      <Link className="dropdown-item" to="#unidadeCandeias">Candeias-BA</Link>
                    </div>
                  </div>
                </div>
              </div>

              <h6>Dados de produção instalada</h6>
              <div className="table-responsive pb-2">
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Tecnologia</th>
                      <th>Total de módulos</th>
                      <th>Módulos em série</th>
                      <th>String-boxes</th>
                      <th>Modelo do inversor</th>
                      <th>Capacidade de geração (Kwp)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Silício policristalino</td>
                      <td>38</td>
                      <td>19</td>
                      <td>2</td>
                      <td>PRIMO 8.2-1</td>
                      <td>8,2</td>
                    </tr>

                  </tbody>
                </table>
              </div>

              <hr className="featurette-divider" />
              <h6 className="pt-2">Dados da estação solarimétrica</h6>
              <div className="table-responsive pb-2">
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Qtd.</th>
                      <th>Modelo do Sensor</th>
                      <th>Fabricante</th>
                      <th>Variáveis mensuradas</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>UVM-30A</td>
                      <td>Wiltronics</td>
                      <td>Incidência de raios ultravioleta</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>DHT22</td>
                      <td>Aosong Electronics</td>
                      <td>Temperatura ambiente e umidade relativa</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>PB10</td>
                      <td><i>não informado</i></td>
                      <td>Direção do vento</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>SV10</td>
                      <td><i>não informado</i></td>
                      <td>Precipitação</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>DV10</td>
                      <td><i>não informado</i></td>
                      <td>Velocidade do vento</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>SPS30</td>
                      <td>Sensirion</td>
                      <td>Detector de particulados</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>DSM501A</td>
                      <td>Samyoung</td>
                      <td>Detector de particulados</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>SR05-DA2</td>
                      <td>Hukseflux</td>
                      <td>Irradiação</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <hr className="featurette-divider" />
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
                <div className="flex-row">
                  <h2 id="unidadeIrece">Irecê - BA, IFBA</h2>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                  <div className="btn-group mr-2">
                  </div>
                  <div className="btn-group" role="group">
                    
                    <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                      <Link className="dropdown-item" to="#unidadeUFMS">UFMS</Link>
                      <Link className="dropdown-item" to="#unidadeIrece">Irecê-BA</Link>
                      <Link className="dropdown-item" to="#unidadeCandeias">Candeias-BA</Link>
                    </div>
                  </div>
                </div>
              </div>

              <h6>Dados de produção instalada</h6>
              <div className="table-responsive pb-2">
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Tecnologia</th>
                      <th>Total de módulos</th>
                      <th>Módulos em série</th>
                      <th>String-boxes</th>
                      <th>Modelo do inversor</th>
                      <th>Capacidade de geração (Kwp)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Silício microamorfo</td>
                      <td>64</td>
                      <td>8</td>
                      <td>8</td>
                      <td>PVI-10.0-I</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>Silício microamorfo</td>
                      <td>66</td>
                      <td>3</td>
                      <td>22</td>
                      <td>PVI-10.0-I</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>Telureto de cadmio</td>
                      <td>96</td>
                      <td>12</td>
                      <td>8</td>
                      <td>PVL-10.0-TL</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>Disseleneto de cobre, índio e gálio</td>
                      <td>72</td>
                      <td>8</td>
                      <td>9</td>
                      <td>PVI-10.0-I</td>
                      <td>10</td>
                    </tr>
                    <tr>
                      <td>Silício policristalino</td>
                      <td>38</td>
                      <td>19</td>
                      <td>2</td>
                      <td>PVL-10.0-TL</td>
                      <td>10</td>
                    </tr>

                  </tbody>
                </table>
              </div>

              <hr className="featurette-divider" />
              <h6 className="pt-2">Dados da estação solarimétrica</h6>
              <div className="table-responsive pb-2">
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Qtd.</th>
                      <th>Modelo do Sensor</th>
                      <th>Fabricante</th>
                      <th>Variáveis mensuradas</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>WINDSONIC1-L3A</td>
                      <td>Campbell</td>
                      <td>Velocidade e direção do vento</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>HMP155A-LP12</td>
                      <td>Campbell</td>
                      <td>Temperatura ambiente e umidade relativa</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>CS106</td>
                      <td>Campbell</td>
                      <td>Pressão barométrica</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>TB4-L15</td>
                      <td>Campbell</td>
                      <td>Precipitação</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>CM11</td>
                      <td>Kipp and Zonen</td>
                      <td>Irradiância horizontal global</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>SPN1</td>
                      <td>Delta-T</td>
                      <td>Irradiância horizontal global, difusa e direta</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>CM11</td>
                      <td>Kipp and Zonen</td>
                      <td>Irradiância inclinada global</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <hr className="featurette-divider" />

              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
                <div className="flex-row">
                  <h2 id="unidadeCandeias">Candeias - BA</h2>
                </div>
                <div className="btn-toolbar mb-2 mb-md-0">
                  <div className="btn-group mr-2">
                  </div>
                  <div className="btn-group" role="group">
                    
                    <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                      <Link className="dropdown-item" to="#unidadeUFMS">UFMS</Link>
                      <Link className="dropdown-item" to="#unidadeIrece">Irecê-BA</Link>
                      <Link className="dropdown-item" to="#unidadeCandeias">Candeias-BA</Link>
                    </div>
                  </div>
                </div>
              </div>

              <h6>Dados de produção instalada</h6>
              <div className="table-responsive pb-2">
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th>Tecnologia</th>
                      <th>Total de módulos</th>
                      <th>Módulos em série</th>
                      <th>String-boxes</th>
                      <th>Modelo do inversor</th>
                      <th>Capacidade de geração (Kwp)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Silício policristalino</td>
                      <td>12</td>
                      <td>2 x 1/2</td>
                      <td>2 x 1/2</td>
                      <td>FRONIUS PRIMO 3.0-1</td>
                      <td>4,08</td>
                    </tr>

                  </tbody>
                </table>
              </div>

              <hr className="featurette-divider" />

              <div className="row pb-4 pt-2">
                <Link to="/" className="btn btn-outline-secondary mx-auto">Voltar ao inicio</Link>
              </div>

            </main>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
