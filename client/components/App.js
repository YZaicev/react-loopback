import React, { Component } from 'react'
import { Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header.js'
import Message from './Message.js'

export default function App({ children }) {
    return (
    	<MuiThemeProvider>
    		<div>
			    <Header />
			    <Message />
		        <div className="container-fluid">{children}</div>
	        </div>
		</MuiThemeProvider>
    )
}
