import React, {Component} from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      ads: [],
      items: 20,
      loadingState: false
    };
  }
  getFormValues = () => {
    return axios
      .get('http://localhost:3000/products')
      .then(response => {
        this.response = response.data;
        return this.response;
      })
      .catch(function(error) {
        alert(error);
      });
  };

  sortByPrice = () => {
    return axios
      .get('http://localhost:3000/products?_sort=price')
      .then(response => {
        this.response = response.data;
        this.setState({data: this.response});
      })
      .catch(function(error) {
        alert(error);
      });
  };

  sortByID = () => {
    return axios
      .get('http://localhost:3000/products?_sort=id')
      .then(response => {
        this.response = response.data;
        this.setState({data: this.response});
      })
      .catch(function(error) {
        alert(error);
      });
  };

  sortBySize = () => {
    return axios
      .get('http://localhost:3000/products?_sort=size')
      .then(response => {
        this.response = response.data;
        this.setState({data: this.response});
      })
      .catch(function(error) {
        alert(error);
      });
  };

  displayItems(data) {
    
    var items = [];
    var time = [];
    var millisecond = 1;
    var day = millisecond * 1000 * 60 * 60 * 24;

    function insertDecimal(num) {
      return (num / 100).toFixed(2);
    }
    for (var i = 0; i < this.state.items; i++) {
      if (data && data[i])
        var delta = Math.round(
          new Date() - (data[i] && new Date(data[i].date))
        );
      time = Math.floor(delta / day);
      items.push(
      <div>
          {i > 0 && i % 20 === 0 &&
            (
              <div className="pt-3 pb-3">
              Advertisement - <img alt="Ad" src={`http://localhost:3000/ads/?r=${Math.floor(Math.random() * 1000)}`} /></div>
            )
          }
          {data && <div key={i} className="row">
            <div className="col-3 pb-3">{data[i] && data[i].id}</div>
            <div className="col-2 pb-3">{data[i] && data[i].face}</div>
            <div className="col-2 pb-3">
              {data[i] && `$${insertDecimal(data[i].price)}`}
            </div>
            <div className="col-1 pb-3">{data[i] && data[i].size}</div>
            <div className="col-4 pb-3">
              {data[i] && time < 7 ? `${time} days ago` : data[i] && data[i].date}
            </div>
          </div>
          }
      </div>
      );
    }
    return items;
  }

  loadMoreItems() {
    this.setState({loadingState: true});
    setTimeout(() => {
      this.setState({items: this.state.items + 10, loadingState: false});
    }, 2000);
  }

  componentDidMount() {
    this.getFormValues().then(data => this.setState({data}));
    this.refs.iScroll.addEventListener('scroll', () => {
      if (
        this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=
        this.refs.iScroll.scrollHeight
      ) {
        this.loadMoreItems();
      }
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div className="App">
        <div className="container p-0">
          <header>
            <h1>Products Grid</h1>
            <p>
              Here you're sure to find a bargain on some of the finest ascii
              available to purchase. Be sure to peruse our selection of ascii
              faces in an exciting range of sizes and prices.
            </p>
          </header>
          <section>
            <div className="row mt-2 mb-5">
              <div className="col-3">
                ID
                <i
                  className="fas pl-4 fa-sort"
                  onClick={() => this.sortByID()}
                />
              </div>
              <div className="col-2">Font</div>
              <div className="col-2">
                Price
                <i
                  className="fas pl-4 fa-sort"
                  onClick={() => this.sortByPrice()}
                />
              </div>
              <div className="col-1">
                Size
                <i
                  className="fas pl-4 fa-sort"
                  onClick={() => this.sortBySize()}
                />
              </div>
              <div className="col-4">Date</div>
            </div>
            {data === undefined && <div>No Items To Display, Please make sure you are running the server</div>}
          </section>
          <div ref="iScroll" style={{height: '450px', overflow: 'auto'}}>
            <ul>{this.displayItems(data)}</ul>

            {this.state.loadingState ? (
              <p className="loading"> Loading More Items..</p>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
