/* eslint-disable eqeqeq */
import React, { Component } from 'react';

import LineChart from '../../components/LineChart';
import TitleBar from '../../components/TitleBar';
import Navigator from '../../components/Navigator';
import Header from '../../components/HeaderWrapper';
import Footer from '../../components/FooterWrapper';

import api from '../../services/api';

import dateFormater from '../../utils/dateFormater';
import howManyDaysThisMonth from '../../utils/daysInMonthDefiner';

export default class Production extends Component {
  constructor(props) {
    super(props);

    this.state = {
      day: 0,
      monthDay: 'carregando...',
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

    let apiResponse = await api.get('/campo-grande/producao/' + date);
    let newStateObject = await this.refreshState(apiResponse.data);

    if (this._isMounted || !this._isUpdated) {
      this.setState({
        day: newStateObject.day,
        month: newStateObject.month,
        year: newStateObject.year,
        monthDay: newStateObject.monthDay,
        period: newStateObject.period,
        labels: newStateObject.interval,
        data: newStateObject.data,
        performanceRatio: newStateObject.performanceRatio,
        options: newStateObject.options,
        isLoading: false
      });
    }

  }

  refreshState = async (res) => {

    return ({
      day: res.day,
      month: res.month,
      year: res.year,
      monthDay: res.monthDay,
      period: res.period,
      interval: res.interval,
      performanceRatio: res.performanceRatio,
      data: {
        table1: {
          data: res.averages,
          lineTension: 0,
          label: 'Potência produziada #1: p-Si (kWh)',
          backgroundColor: 'rgba(66,161,245,0)',
          borderColor: 'rgba(66,161,245,1.0)',
          pointBackgroundColor: 'rgba(66,161,245,1.0)',
          borderWidth: 3,
          yAxisID: "performance",
        },
        table2: {
          data: res.alternateCurrent,
          lineTension: 0,
          label: 'Corrente alternada (A)',
          backgroundColor: 'rgba(255,48,48, 0)',
          borderColor: 'rgba(255,48,48, 1.0)',
          pointBackgroundColor: 'rgba(255,48,48, 0.7)',
        },
        table3: {
          data: res.continuousCurrent,
          lineTension: 0,
          label: 'Corrente contínua (A)',
          backgroundColor: 'rgba(255,166,0,0)',
          borderColor: 'rgba(255,166,0,1.0)',
          pointBackgroundColor: 'rgba(255,166,0, 0.7)'
        },
        table4: {
          data: res.alternateTension,
          lineTension: 0,
          label: 'Tensão alternada (V)',
          backgroundColor: 'rgba(66, 134, 244, 0)',
          borderColor: 'rgba(66, 134, 244, 1.0)',
          pointBackgroundColor: 'rgba(66, 134, 244, 0.7)',
        },
        table5: {
          data: res.continuousTension,
          lineTension: 0,
          label: 'Tensão contínua (V)',
          backgroundColor: 'rgba(50,172,92, 0)',
          borderColor: 'rgba(50,172,92, 1.0)',
          pointBackgroundColor: 'rgba(50,172,92, 0.7)',
        },
        table6: {
          data: res.capacityFactor,
          lineTension: 0,
          label: 'Percentual de capacidade da mesa',
          borderColor: 'rgba(255,48,48,1.0)',
          backgroundColor: 'rgba(255,48,48,0)',
          borderWidth: 3,
          yAxisID: "capacidade",
        }
      },
      options: {
        animation: {
          duration: 1000,
        },
        title: {
          display: true,
          fontsize: 24,
          text: "Produção",
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
          {
            beginAtZero: false,
            position: "right",
            id: "capacidade"
          }

          ],
          xAxes: [{
            beginAtZero: true,
            ticks: {
              callback: function (dataLabel, index) {
                return index % 4 === 0 ? dataLabel : '';
              },
              maxRotation: 0,
            }
          }]
        },
      }

    })

  }

  decrementDate = () => {

    let day = this.state.day;
    let month = this.state.month;
    let year = this.state.year;

    if (year >= 2018 && month >= 1 && day >= 1) {

      if (day > 1) {
        day--;
      } else if (day == 1 && month != 1) {
        day = howManyDaysThisMonth(month - 1);
        month--;
      } else {
        day = 31;
        month = 12;
        year--;
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
      (year == this.actualYear && month < this.actualMonth) ||
      (year == this.actualYear && month == this.actualMonth && day < this.actualDay)) {

      if (day == 31 && month == 12) {
        day = 1;
        month = 1;
        year++;
      } else if (day == howManyDaysThisMonth(month)) {
        day = 1;
        month++;
      } else {
        day++;
      }

      this.setState({
        day,
        month,
        year
      });

      this._isUpdated = false;

    }

  }

  componentWillUpdate(newProps, newState) {

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

    let pr = (typeof this.state.performanceRatio == "number" ) ? this.state.performanceRatio : 0

    if (!this.state.isLoading && this.state.labels != undefined) {
      return (
        <React.Fragment>
          <Header logged={true} fixed={false} marginBottom={true} />
          <div className="row">
            <div className="col-11 mx-auto">
              <main className="col-lg-12 mx-auto p-0" role="main" id="main">

              <TitleBar text="Produção - Campo Grande" theme="production" pr={"Performance Ratio: " + pr + "%"} />
                <Navigator date={this.state.monthDay} handlePrevDateNavigation={this.decrementDate} handleNextDateNavigation={this.incrementDate} />

                <div className="row m-4 px-0 py-0" id="row-chart">
                  <div className="col-md-10 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-1">
                    <LineChart
                      data={{ labels: this.state.labels, datasets: [this.state.data.table1, this.state.data.table6] }}
                      options={this.state.options}
                    />
                  </div>
                  <div className="col-md-5 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-2">
                    <LineChart
                      data={{ labels: this.state.labels, datasets: [this.state.data.table2] }}
                      options={this.state.options}
                    />
                  </div>
                  <div className="col-md-5 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-3">
                    <LineChart
                      data={{ labels: this.state.labels, datasets: [this.state.data.table3] }}
                      options={this.state.options}
                    />
                  </div>
                  <div className="col-md-5 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-4">
                    <LineChart
                      data={{ labels: this.state.labels, datasets: [this.state.data.table4] }}
                      options={this.state.options}
                    />
                  </div><div className="col-md-5 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-5">
                    <LineChart
                      data={{ labels: this.state.labels, datasets: [this.state.data.table5] }}
                      options={this.state.options}
                    />
                  </div>
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
          <Header logged={true} fixed={false} marginBottom={true} />
          <div className="row">
            <div className="col-11 mx-auto">
              <main className="col-lg-12 mx-auto p-0" role="main" id="main">

                <TitleBar text="Produção - Campo Grande" theme="production" />
                <Navigator date={this.state.monthDay} handlePrevDateNavigation={this.decrementDate} handleNextDateNavigation={this.incrementDate} />

                <div className="row m-4 px-0 py-0" id="row-chart">
                  <div className="col-md-10 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-1">
                    <LineChart
                      data={{ labels: [], datasets: [] }}
                    />
                  </div>
                  <div className="col-md-5 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-2">
                    <LineChart
                      data={{ labels: [], datasets: [] }}
                    />
                  </div>
                  <div className="col-md-5 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-3">
                    <LineChart
                      data={{ labels: [], datasets: [] }}
                    />
                  </div>
                  <div className="col-md-5 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-4">
                    <LineChart
                      data={{ labels: [], datasets: [] }}
                    />
                  </div>
                  <div className="col-md-5 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-5">
                    <LineChart
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
