import React, { Component } from 'react';
import './home.css';

class Home extends Component {
  state = {
    photos: [],
    queryStr: 'wine',
    page: 1,
    notSent: true
  };

  componentDidMount() {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.pexels.com/v1/search?query=${
        this.state.queryStr
      }+query&per_page=20&page=${this.state.page}`,
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
          this.setState({ photos: this.state.photos.concat(url.src.portrait) })
        )
      );

    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll = e => {
    let scrlHeight = document.scrollingElement.scrollHeight;
    let clntHeight = document.scrollingElement.clientHeight;
    let goingToScroll = scrlHeight - clntHeight;
    let scrlTop = document.scrollingElement.scrollTop;
    let parcentage = Math.ceil((scrlTop / goingToScroll) * 100);
    if (parcentage === 96 && this.state.notSent) {
      console.log(this.state.page);
      this.setState({
        page: this.state.page + 1,
        notSent: false
      });
      fetch(
        `https://cors-anywhere.herokuapp.com/https://api.pexels.com/v1/search?query=${
          this.state.queryStr
        }+query&per_page=20&page=${this.state.page}`,
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
            this.setState({
              photos: this.state.photos.concat(url.src.portrait),
              notSent: true
            })
          )
        )
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div className="home__root">
        <input type="text" placeholder="Search Here" />
        <div className="photos">
          {this.state.photos.map(images => (
            <img className="img" src={images} alt="not found" />
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
