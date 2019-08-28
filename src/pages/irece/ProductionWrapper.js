import React, { Component } from 'react';
import TitleBar from '../../components/TitleBar';
import Navigator from '../../components/Navigator';
import Header from '../../components/HeaderWrapper';
import Footer from '../../components/FooterWrapper';
import Production from '../../pages/irece/Production';

// import { Container } from './styles';

export default class ProductionWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        if (!this.state.isLoading) {
          return (
            <React.Fragment>
              <Header logged={true} fixed={false} marginBottom={true} />
              <div className="row">
                <div className="col-11 mx-auto">
                  <main className="col-lg-12 mx-auto p-0" role="main" id="main">
    
                    <TitleBar text="Produção" />
                    <Navigator date={this.state.monthDay} />
                    <Production date={this.state.monthDay} />
                    
                  </main>
                </div>
              </div>
              <Footer />
              {/* {this.state.res.map(item => <ul key={item.table}>{JSON.stringify(item.res)}</ul>)} */}
            </React.Fragment>
          );
    
        } else {
          return (
            <React.Fragment>
              <Header logged={true} fixed={false} marginBottom={true} />
              <div className="row">
                <div className="col-11 mx-auto">
                  <main className="col-lg-12 mx-auto p-0" role="main" id="main">
    
                    <TitleBar text="Produção" />
                    <Navigator date="--/--/----" />
                    <Production date="" />
    
                   
                  </main>
    
                </div>
              </div>
              <Footer />
            </React.Fragment>
          )
        }
    
      }
}
