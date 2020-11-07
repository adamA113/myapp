import React, { Component } from 'react';
class Formphoto extends Component {
  state = {

  }
  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <form id="add-photo" onSubmit={this.handleSubmit}>
        <h3>Add a new photo</h3>

        <label htmlFor="label">Label:</label><br />
        <input type="text" id="label" name="label" placeholder="Enter photo name"/><br />

        <label htmlFor="url">Photo URL:</label><br />
        <input type="text" id="url" name="url" placeholder="Enter photo url"/><br />

        <label htmlFor="Password">Password:</label><br />
        <input type="password" id="password" name="password" placeholder="Enter password photo"/><br />

        <button id="submit">Submit</button>
        <button id="cancel">Cancel</button>
      </form>
    )
  }
}

export default Formphoto;