import React, { Component } from 'react';
import './Formphoto.css';
class Formphoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            label: null,
            url: null,
            password: null
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.callback1(this.state);
        /////used to reset the form input after submission
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
        this.setState({
            itemvalues: [{}]
        });
        /////////
    }

    handleChange = (e) => {
        // console.log(e.targrt)
        this.setState({
            [e.target.id]: e.target.value
        // }, () => {
        //     console.log(this.state)
        })

    }

    onTrigger = (event) => {
        this.props.callback(false);
        event.preventDefault();
    }

    render() {
        return (
            <form id="add-photo" onSubmit={this.handleSubmit} style={{ display: this.props.handleAdd ? 'block' : 'none' }}>
                <h3>Add a new photo</h3>

                <label htmlFor="label">Label:</label><br />
                <input type="text" id="label" name="label" placeholder="Enter photo name" onChange={this.handleChange} /><br />

                <label htmlFor="url">Photo URL:</label><br />
                <input type="url" id="url" name="url" placeholder="Enter photo url" onChange={this.handleChange} /><br />

                <label htmlFor="Password">Password:</label><br />
                <input type="password" id="password" name="password" placeholder="Enter password photo" onChange={this.handleChange} /><br />

                <button id="submit">Submit</button>
                <button id="cancel" onClick={this.onTrigger}>Cancel</button>
            </form>
        )
    }
}

export default Formphoto;