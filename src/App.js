import React, {Component} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      ads: []
    };
  }
  getFormValues = () => {
    // Sample API GET request using axios. Can be replaced with actual GET call.
    return axios
      .get('http://localhost:3000/products?_limit=20') // Dummy URL
      .then(response => {
        this.response = response.data;
        return this.response;
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  getAds = () => {
    return axios
      .get(
        'http://localhost:3000/ads/?r=' + Math.floor(Math.random() * 1000) + ''
      ) // Dummy URL
      .then(response => {
        this.response = response.data;
        return this.response;
        console.log(response);
      })
      .catch(function(error) {
        console.log('hola', error);
      });
  };

  componentDidMount() {
    this.getFormValues().then(data => this.setState({data}));
    this.getAds().then(ads => {
      return <img className="ad" src={ads} />;
    });
  }

  render() {
    console.log('dataa', this.state.data, this.state.ads);
    const {data} = this.state;
    return (
      <div className="App">
        <div className="container">
          <header>
            <h1>Products Grid</h1>
            <p>
              Here you're sure to find a bargain on some of the finest ascii
              available to purchase. Be sure to peruse our selection of ascii
              faces in an exciting range of sizes and prices.
            </p>
            <p>But first, a word from our sponsors:</p>{' '}
            <script>
              document.write('<img
                className="ad"
                src="/ads/?r=' + Math.floor(Math.random()*1000) + '"
              />');
            </script>
          </header>

          <section className="products">
            <div className="row mt-2 mb-2">
              <div className="col-4">Font</div>
              <div className="col-4">Price</div>
              <div className="col-4">Size</div>
            </div>
            {data &&
              data.map((index, key) => {
                console.log(key);
                return (
                  <div className="row">
                    <div className="col-4">{index.face}</div>
                    <div className="col-4">{index.price}</div>
                    <div className="col-4">{index.size}</div>
                  </div>
                );
              })}
          </section>
        </div>
      </div>
    );
  }
}

export default App;
