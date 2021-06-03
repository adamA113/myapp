import './App.css';
import React from 'react';
// import Navbar from './Navbar';
// import Formphoto from './Formphoto';
import UploadPhoto from './components/UploadPhoto/UploadPhoto';
import Gallery from './components/Gallery';
// import Photo from './Photo';

function App() {
	return (
		<div className="main">
			{/* <Navbar callback={this.handleCallback} />
          <Formphoto handleAdd={this.state.show} callback={this.handleCallback} callback1={this.handleCallback1} addPhoto={this.addPhoto} />
          <Photo photo={this.state} /> */}
			<UploadPhoto />
			<Gallery />
		</div>
	);
}

export default App;
