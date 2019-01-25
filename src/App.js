import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    photos: []
  };
  render() {
    return (
      <div>
        {this.state.photos.map(e => (
          <img className="img" src={e} alt="not found" />
        ))}
      </div>
    );
  }
  componentDidMount() {
    fetch(
      'https://cors-anywhere.herokuapp.com/https://api.pexels.com/v1/search?query=sexy+query&per_page=15&page=1',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            '563492ad6f9170000100000154dfd7cac5734ffbab147db82c7618e9'
        }
      }
    )
      .then(res => res.json())
      .then(data =>
        data.photos.forEach(url =>
          this.setState({ photos: this.state.photos.concat(url.src.original) })
        )
      );
  }
}

export default App;
