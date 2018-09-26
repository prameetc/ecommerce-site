import React, {Component} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  getFormValues = () => {
    try {
      // Sample API GET request using axios. Can be replaced with actual GET call.
      axios
        .get('http://localhost:3000/products') // Dummy URL
        .then(function (response) {
          console.log('GET Response', response);
        })
        .catch(function (error) {
          console.log(error);
        });

    } catch (error) {

    }
  }
  componentDidMount() {
    this.getFormValues();
  }

  render() {
    return (
      <div className="App">
  
      </div>
    );
  }
}

export default App;
