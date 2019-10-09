import React, { Component } from 'react';
import TitleBar from './TitleBar';
import Navigator from './Navigator';
import Production from '../pages/irece/Production';

// import { Container } from './styles';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="row">
                <div className="col-11 mx-auto">
                    <main className="col-lg-12 mx-auto" role="main" id="main">

                        <TitleBar text="Produção" />
                        <Navigator date="20/08/2019" />
                        <Production />

                    </main>

                </div>

            </div>
        )
    }
}
