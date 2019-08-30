/* eslint-disable no-unused-vars */
import React, { Component } from 'react';

// import { Container } from './styles';

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    renderTDElement = (item) => {
        return (<td>{item}</td>);
    }


    render() {

        let rows = [];
        let i = 1;
        
        for (let array of this.props.body) {
            
            let items = [];
            let success = false;
            
            for (let item of array) {
                items.push(<td key={i+item} className="text-center">{item}</td>)
                if (item === "Viável") 
                    success = true;
                i++
            }
            
            if (success) {
                rows.push(<tr key={i} className="table-success">{items}</tr>)
            } else {
                rows.push(<tr key={i}>{items}</tr>)
            }
        
        }


        return (
            <React.Fragment>
                <div className="col-lg-11 container-fluid py-0 pb-0 mx-auto my-auto px-0 py-3">
                    <table className="table table-borderless table-hover table-sm table-light mx-auto col-lg-12">
                        <thead id="thead">
                            <tr  className="mx-auto text-center">
                                {
                                    this.props.head.map(item =>
                                        <th scope="col" className="mx-auto" key={item}>
                                            {item}
                                        </th>)
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }

}
