import React, { Component } from 'react';
class Navbar extends Component {
    state = {

    }
    handleClick(e) {
        console.log(e.target);
    }

    render() {
        return (
            <div className="app-content">
                <div>My photo Galary</div>
                <input type="text" id="search" name="search" placeholder="search by name" />
                <button onClick={this.handleClick}>Add a photo</button>
            </div>
        )
    }
}

export default Navbar;