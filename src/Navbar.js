import React, { Component } from 'react';
import Formphoto from './Formphoto';
class Navbar extends Component {
    state = {

    }
    handleClick = (e) => {
        console.log(e.target);
    }

    render() {
        return (
            <div className="app-content">
                <div>My photo Galary</div>
                <input type="text" id="search" name="search" placeholder="search by name" />
                <button onClick={this.handleClick}>Add a photo</button>
                <Formphoto/>
            </div>
        )
    }
}

export default Navbar;