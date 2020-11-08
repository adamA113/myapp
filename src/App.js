// import './App.css';
import React, { Component } from 'react';
import Navbar from './Navbar';
import Formphoto from './Formphoto';
import Photo from './Photo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      label: null,
      url: null,
      password: null
    };
    // console.log(this.state)
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
      <div>
        <Navbar callback={this.handleCallback}/>
        <Formphoto handleAdd={this.state.show} callback={this.handleCallback} callback1={this.handleCallback1}/>
        <Photo photo={this.state}/>
      </div>

    );
  }
}

export default App;
