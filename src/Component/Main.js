import React from 'react';
import axios from 'axios';
import ImgUrl from './ImgUrl';
import FormFun from './FormFun';
import WeatherData from './WeatherData';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SQUrl: '',
      data: '',
      show: false,
      hammoda: {},
      myApiUrl: process.env.REACT_APP_MY_API_URL,
      myKey: process.env.REACT_APP_LOCATION_API_KEY
    };
  }

  urlLocation = async (e) => {
    e.preventDefault();
    try {
      const url = `https://us1.locationiq.com/v1/search.php?key=${this.state.myKey}&q=${this.state.SQUrl}&format=json`;

      const expressWeatherUrl = `${this.state.myApiUrl}weather`;
      const expressReq = await axios.get(expressWeatherUrl);

      const dataAxios = await axios.get(url);

      console.log(expressReq.data);

      this.setState({
        data: dataAxios.data[0],
        show: true,
        hammoda: expressReq.data,
      });
      console.log(this.state.hammoda);

    } catch (error) {
      console.log('not working');
    }

    // console.log(ti);
  };

  updateUrl = (e) => {
    this.setState({ SQUrl: e.target.value });
    console.log(this.state.SQUrl);
  }

  render() {
    return (
      <div>
        <FormFun data={this.state.data.display_name} updateUrl={this.updateUrl} urlLocation={this.urlLocation} />
        {this.state.show &&
          <>
            <ImgUrl data={this.state.data} date={this.state.data.display_name} />

            <WeatherData test ={this.state.hammoda} />
          </>
        }
      </div >
    );
  }
}

export default App;

//weather={this.state.hammoda}
