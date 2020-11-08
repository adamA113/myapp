// import './App.css';
import React, { Component } from 'react';
import Navbar from './Navbar'
import Formphoto from './Formphoto'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false

    };
  }
  handleCallback = (Data) => {
    this.setState({ show: Data })
  }
  render() {
    return (
      <div>
        <Navbar callback={this.handleCallback}/>
        <Formphoto handleAdd={this.state.show} callback={this.handleCallback}/>
      </div>

    );
  }
}

export default App;
