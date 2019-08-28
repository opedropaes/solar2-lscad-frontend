/* eslint-disable eqeqeq */
import React, { Component } from 'react';

import LineChart from '../../components/LineChart';
import TitleBar from '../../components/TitleBar';
import Navigator from '../../components/Navigator';
import Header from '../../components/HeaderWrapper';
import Footer from '../../components/FooterWrapper';
import Table from '../../components/Table';

import api from '../../services/api';

import dateFormater from '../../utils/dateFormater';
import howManyDaysThisMonth from '../../utils/daysInMonthDefiner';

export default class Enviromental extends Component {
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

    let apiResponse = await api.get('/irece/ambientais/' + date);
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
        dataForTable: newStateObject.dataForTable,
        options: newStateObject.options,
        isLoading: false
      });
    }

  }

  refreshState = async (res) => {

    let head = [
      'Temperatura média',
      'Umidade relativa do ar',
      'Precipitação acumulada',
      'Velocidade do vento atual (última coleta)',
      'Pressão atmosférica atual (última coleta)'
    ]

    // const totalRainfall = res.rainfall.reduce(
    //   (accumulator, currentValue) => accumulator + currentValue
    // )

    let windSpeed = res.windSpeed.pop() || 0
    let atmPressure = res.atmPressure.pop() || 0
    let temperature = res.temperature.pop() || 0
    let humidity = res.humidity.pop() || 0

    let body = [[
      parseFloat(temperature).toFixed(1) + " °C",
      parseFloat(humidity).toFixed(1) + " %",
      0 + " mm/m³",
      parseFloat(windSpeed).toFixed(1) + " km/h",
      parseInt(atmPressure) + " atm"
    ]]

    let dataForTable = {
      head,
      body
    }

    return ({
      day: res.day,
      month: res.month,
      year: res.year,
      monthDay: res.monthDay,
      period: res.period,
      interval: res.interval,
      dataForTable,
      data: {
        table1: {
          data: res.solarRadiation,
          lineTension: 0,
          label: 'Irradiação inclinada sobre a mesa (W/m²)',
          backgroundColor: 'rgba(66,161,245,0)',
          borderColor: 'rgba(66,161,245,1.0)',
          pointBackgroundColor: 'rgba(66,161,245,1.0)',
        },
        table2: {
          data: res.averageRadiation,
          lineTension: 0,
          label: 'Irradiação inclinada referencial (W/m²)',
          backgroundColor: 'rgba(255,48,48, 0)',
          borderColor: 'rgba(255,48,48, 1.0)',
          pointBackgroundColor: 'rgba(255,48,48, 0.7)',
        },
      },
      options: {
        animation: {
          duration: 1000,
        },
        title: {
          display: true,
          fontsize: 24,
          text: "Irradiação solar",
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

    if (!this.state.isLoading) {
      return (
        <React.Fragment>
          <Header logged={true} fixed={false} marginBottom={true} ufv="irece" />
          <div className="row">
            <div className="col-11 mx-auto">
              <main className="col-lg-12 mx-auto p-0" role="main" id="main">

                <TitleBar text="Ambientais - Irecê" theme="environmental" />
                <Navigator date={this.state.monthDay} handlePrevDateNavigation={this.decrementDate} handleNextDateNavigation={this.incrementDate} />

                <div className="row m-4 px-0 py-0" id="row-chart">
                  <div className="col-md-10 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-1">
                    <LineChart
                      data={{ labels: this.state.labels, datasets: [this.state.data.table1, this.state.data.table2] }}
                      options={this.state.options}
                    />
                  </div>
                </div>

                <Table head={this.state.dataForTable.head} body={this.state.dataForTable.body} />

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

                <TitleBar text="Ambientais - Irecê" theme="environmental" />
                <Navigator date={this.state.monthDay} handlePrevDateNavigation={this.decrementDate} handleNextDateNavigation={this.incrementDate} />

                <div className="row m-4 px-0 py-0" id="row-chart">
                  <div className="col-md-10 container-fluid pb-3 pt-0 py-0 mx-auto my-auto" id="canvas-container-1">
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