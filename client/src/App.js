import './App.css';
import React, { Component } from 'react';
// import Navbar from './Navbar';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
// import Formphoto from './Formphoto';
import UploadPhoto from './components/UploadPhoto/UploadPhoto';
import Gallery from './components/Gallery';
// import Photo from './Photo';

const client = new ApolloClient({
	uri: 'http://localhost:3001/graphql',
	cache: new InMemoryCache()
});

function App() {
	return (
		<ApolloProvider client={client}>
			<div className="main">
				{/* <Navbar callback={this.handleCallback} />
          <Formphoto handleAdd={this.state.show} callback={this.handleCallback} callback1={this.handleCallback1} addPhoto={this.addPhoto} />
          <Photo photo={this.state} /> */}
				<UploadPhoto />
				<Gallery />
			</div>
		</ApolloProvider>

	);
}

export default App;
