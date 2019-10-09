import React, { Component } from 'react';
import Header from '../components/HeaderWrapper';
import Footer from '../components/FooterWrapper';

import '../../src/App.js';

export default class Contact extends Component {
  render() {
    return (
      <React.Fragment>
        <Header logged={false} fixed={false} marginBottom={true} />
        <div className="main-wrapper">
          <main className="main" role="main">
            <div class="container-fluid py-5 align-items-center" >
              <div class="row mb-3 mx-auto">
                <div class="mx-auto">
                  <h1 class>Entre em contato</h1>
                  <p class="pb-3 text-justify">
                    Prof. Dr. Ricardo R. Santos <br/>
                    Faculdade de Computação <br/>
                    Universidade Federal de Mato Grosso do Sul <br/>
                    Campo Grande-MS <br/>
                    <em>solar2.lscad@gmail.com</em>
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}
