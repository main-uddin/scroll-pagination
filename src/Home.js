import React, { Component } from 'react';
import './home.css';

class Home extends Component {
  state = {
    photos: [],
    queryStr: 'sexy',
    page: 1
  };

  componentDidMount() {
    fetch(
      `https://cors-anywhere.herokuapp.com/https://api.pexels.com/v1/search?query=${
        this.state.queryStr
      }+query&per_page=100&page=${this.state.page}`,
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

    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll = e => {
      let scrlHeight = document.scrollingElement.scrollHeight
      let clntHeight = document.scrollingElement.clientHeight
      let goingToScroll = scrlHeight - clntHeight
      let scrlTop = document.scrollingElement.scrollTop
      let parcentage = Math.ceil(scrlTop / goingToScroll * 100)
      // console.log(`${parcentage}%`)
      if(parcentage === 94) {
        console.log('94')
        fetch(
          `https://cors-anywhere.herokuapp.com/https://api.pexels.com/v1/search?query=hill+query&per_page=100&page=${this.state.page}`,
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
      }
  }

  render() {
    return (
      <div className="photos">
        {this.state.photos.map(e => (
          <img className="img" src={e} alt="not found" />
        ))}
      </div>
    );
  }
}

export default Home;
