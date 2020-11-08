import React, { Component } from 'react';
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
    handleCallback = (Data) => {
        this.setState({ show: Data })
    }

    render() {
        return (
            <div className="app-content">
                <div>My photo Galary</div>
                <input type="search" id="search" name="search" placeholder="search by name" />
                <button onClick={this.handleClick}>Add a photo</button>
                <Formphoto handleAdd={this.state.show} callback={this.handleCallback} />
            </div>
        )
    }
}

export default Navbar;