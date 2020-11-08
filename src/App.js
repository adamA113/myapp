import './App.css';
import React, { Component } from 'react';
import Navbar from './Navbar';
import Formphoto from './Formphoto';
import Gallery from './Gallery';
import Photo from './Photo';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      photos: [],
      label: null,
      url: null,
      password: null
    };
    console.log(this.state);
  }

  addPhoto = (photo) => {
    let photos = [...this.state.photos, photo];
    this.setState({
      photos: photos
    });
  }
  handleCallback = (Data) => {
    this.setState({ show: Data })
  }
  handleCallback1 = (data) => {
    this.setState({ label: data.label, url: data.url, password: data.password })
    // console.log(data.url);
  }
  render() {
    return (
      <div className="main">
        <Navbar callback={this.handleCallback}/>
        <Formphoto handleAdd={this.state.show} callback={this.handleCallback} callback1={this.handleCallback1} addPhoto={this.addPhoto}/>
        <Photo photo={this.state}/>
        {/* <Gallery photos={this.state.photos}/> */}

      </div>
    );
  }
}

export default App;
