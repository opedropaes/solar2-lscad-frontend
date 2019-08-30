/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import Header from '../../components/HeaderWrapper';
import Footer from '../../components/FooterWrapper';
import LineChart from '../../components/LineChart';
import DoughnutChart from '../../components/DoughnutChart';
import TitleBar from '../../components/TitleBar';
import Navigator from '../../components/Navigator';
import Table from '../../components/Table';

import dateFormater from '../../utils/dateFormater';
import api from '../../services/api';

export default class LossPerTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: 0,
      yearMonth: 'carregando...',
      period: 'day',
      labels: [],
      data: [],
      isLoading: true
    };
  }

  _isMounted = false;
  _isUpdated = true;
  now = new Date();
  actualDay = this.now.getDate();
  actualMonth = this.now.getMonth() + 1;
  actualYear = this.now.getFullYear();

  componentDidMount() {

    let date = dateFormater(this.actualDay, this.actualMonth, this.actualYear);
    this._isMounted = true;
    this.fetchApiResponse(date);

  }

  fetchApiResponse = async (date) => {

    const path = this.props.location.pathname;
    let apiResponse = await api.get(path + "/" + date);
    let newStateObject = await this.refreshState(apiResponse.data);

    if (this._isMounted || !this._isUpdated) {
      this.setState({
        day: newStateObject.day,
        month: newStateObject.month,
        year: newStateObject.year,
        yearMonth: newStateObject.yearMonth,
        period: newStateObject.period,
        labels: newStateObject.interval,
        doughnutlabels: newStateObject.doughnutlabels,
        data: newStateObject.data,
        dataForTable: newStateObject.dataForTable,
        options: newStateObject.options,
        table: newStateObject.table,
        isLoading: false
      });
    }

  }

  refreshState = async (res) => {

    let body = []
    let head = []
    
    for (let i = 0; i < res.completeDates.length; i++) {
      body.push([
        res.completeDates[i],
        res.idealProd[i],
        res.realProd[i],
        res.loss[i],
        res.lossPercentage[i],
        (res.viability[i]) ? "Viável" : "Não viável"
      ])
    }

    head = [
      "Data",
      "Potência Esperada (kW)",
      "Potência Produzida (kW)",
      "Perdas (kW)", "Perdas (%)",
      "Viabilidade Econômica"
    ]

    let dataForTable = { head, body }

    return ({

      month: res.month,
      year: res.year,
      yearMonth: res.yearMonth,
      period: res.period,
      interval: res.interval,
      doughnutlabels: res.comparationLabels,
      table: res.table,
      data: {
        table1: {
          data: res.idealProd,
          label: 'Produção esperada (kWh)',
          borderColor: 'rgba(29, 82, 168, 1.0)',
          backgroundColor: 'rgba(29, 82, 168, 0)',
          lineTension: 0,
          borderWidth: 3,
          pointBackgroundColor: 'rgba(29, 82, 168, 1.0)'
        },
        table2: {
          data: res.realProd,
          label: 'Produção real (kWh)',
          borderColor: 'rgba(247, 111, 91, 1.0)',
          backgroundColor: 'rgba(247, 111, 91, 0)',
          lineTension: 0,
          pointBackgroundColor: 'rgba(247, 111, 91, 1.0)'
        },
        table3: {
          data: res.comparation,
          label: 'Percentual de perdas em relação a produção',
          backgroundColor: ['rgba(29, 82, 168, 1.0)', 'rgba(247, 111, 91, 1.0)'],
        }
      },
      dataForTable,
      options: {
        animation: {
          duration: 1000,
        },
        title: {
          display: true,
          fontsize: 24,
          text: "Perdas mensais (kWh)",
        },
        labels: {
          fontStyle: 'bold',
        },
        scales: {
          yAxes: [{
            beginAtZero: true,
            position: "left",
            id: "performance"
          },

          ],
          xAxes: [{
            beginAtZero: true,
            ticks: {
              callback: function (dataLabel, index) {
                return index % 2 === 0 ? dataLabel : '';
              },
              maxRotation: 0,
            }
          }]
        },
      },
      doughnutOptions: {
        animation: {
          duration: 1000,
        },
        title: {
          display: false,
          fontsize: 24,
          text: "Perdas e ganhos diários",
        },
        labels: {
          fontStyle: 'bold',
        },
        responsive: true,
      }

    })

  }

  decrementDate = () => {

    let day = this.state.day;
    let month = this.state.month;
    let year = this.state.year;

    if (year >= 2018 && month >= 1) {

      if (month == 1) {
        month = 12;
        year--;
      } else {
        month--;
      }

      this.setState({
        day,
        month,
        year
      });

      this._isUpdated = false;

    }

  }

  incrementDate = () => {

    let day = this.state.day;
    let month = this.state.month;
    let year = this.state.year;

    if (year < this.actualYear ||
      (year == this.actualYear && month < this.actualMonth)) {

      if (month == 12) {
        month = 1;
        year++;
      } else {
        month++;
      }

      this.setState({
        day,
        month,
        year
      });

      this._isUpdated = false;

    }

  }

  UNSAFE_componentWillUpdate(newProps, newState) {

    if (!this._isUpdated) {
      let date = dateFormater(newState.day, newState.month, newState.year);
      this.fetchApiResponse(date);
    }

  }

  componentDidUpdate() {
    this._isUpdated = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <React.Fragment>
          <Header logged={true} fixed={false} marginBottom={true} ufv="irece" />
          <div className="row">
            <div className="col-11 mx-auto">
              <main className="col-lg-12 mx-auto " role="main" id="main">

                <TitleBar text={"Perdas: Mesa " + this.state.table} theme="losses" />
                <Navigator date={this.state.yearMonth} handlePrevDateNavigation={this.decrementDate} handleNextDateNavigation={this.incrementDate} />

                <div className="row m-4 px-0 py-0" id="row-chart">
                  <div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-1">
                    <LineChart
                      data={{ labels: this.state.labels, datasets: [this.state.data.table1, this.state.data.table2] }}
                      options={this.state.options}
                    />
                  </div>
                  <div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-2">
                    <DoughnutChart
                      data={{ labels: this.state.doughnutlabels, datasets: [this.state.data.table3] }}
                      options={this.state.doughnutOptions}
                    />
                  </div>
                </div>
                <div className="row p-0">
                  <Table head={this.state.dataForTable.head} body={this.state.dataForTable.body} />
                </div>

              </main>
            </div>
          </div>
          <Footer />
        </React.Fragment>
      );

    } else {
      return (
        <React.Fragment>
          <Header logged={true} fixed={false} marginBottom={true} ufv="irece" />
          <div className="row">
            <div className="col-11 mx-auto">
              <main className="col-lg-12 mx-auto p-0" role="main" id="main">

                <TitleBar text="Perdas" theme="losses" />
                <Navigator date={this.state.monthDay} handlePrevDateNavigation={this.decrementDate} handleNextDateNavigation={this.incrementDate} />

                <div className="row m-4 px-0 py-0" id="row-chart">
                  <div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-1">
                    <LineChart
                      data={{ labels: [], datasets: [] }}
                    />
                  </div>
                  <div className="col-md-6 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-2">
                    <DoughnutChart
                       data={{ labels: [], datasets: [] }}
                    />
                  </div>
                </div>

              </main>

            </div>
          </div>
          <Footer />
        </React.Fragment>
      )
    }
  }
}
