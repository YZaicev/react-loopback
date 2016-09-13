import React, { Component } from 'react'
import { Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header.js'

export default function App({ children }) {
    return (
    	<MuiThemeProvider>
    		<div>
			    <Header />
		        <div>{children}</div>
	        </div>
		</MuiThemeProvider>
    )
}
