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
    handleCallback = (childData) => {
        this.setState({ show: childData })
    }

    render() {
        return (
            <div className="app-content">
                <div>My photo Galary</div>
                <input type="text" id="search" name="search" placeholder="search by name" />
                <button onClick={this.handleClick}>Add a photo</button>
                <Formphoto handleAdd={this.state.show} parentCallback={this.handleCallback}  />
            </div>
        )
    }
}

export default Navbar;