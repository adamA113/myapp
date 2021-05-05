import React, { Component } from 'react';
import './Navbar.css';
import Formphoto from './Formphoto';
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
    
        };
    }
    handleClick = (e) => {
        this.setState({ show: true });
    }
    // handleCallback = (Data) => {
    //     this.setState({ show: Data })
    // }
    onTrigger = (event) => {
        this.props.callback(true);
        event.preventDefault();
    }

    render() {
        return (
            <div className="nav">
                <div>My photo Galary</div>
                <input type="search" id="search" name="search" placeholder="search by name" />
                <button id="add" onClick={this.onTrigger}>Add a photo</button>
                {/* <Formphoto handleAdd={this.state.show} callback={this.handleCallback} /> */}
            </div>
        )
    }
}

export default Navbar;