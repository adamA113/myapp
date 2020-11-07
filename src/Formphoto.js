import React, { Component } from 'react';
class Formphoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        };
        console.log(this.props.handleClick)
    }
    handleSubmit = (e) => {
        e.preventDefault();
    }

    onTrigger = (event) => {
        this.props.parentCallback(false);
        event.preventDefault();
    }

    
    render() {
        return (
            <form id="add-photo" onSubmit={this.handleSubmit} style={{ display: this.props.handleAdd ?'block': 'none'}}>
                <h3>Add a new photo</h3>

                <label htmlFor="label">Label:</label><br />
                <input type="text" id="label" name="label" placeholder="Enter photo name" /><br />

                <label htmlFor="url">Photo URL:</label><br />
                <input type="url" id="url" name="url" placeholder="Enter photo url" /><br />

                <label htmlFor="Password">Password:</label><br />
                <input type="password" id="password" name="password" placeholder="Enter password photo" /><br />

                <button id="submit">Submit</button>
                <button id="cancel" onClick={this.onTrigger}>Cancel</button>
            </form>
        )
    }
}

export default Formphoto;