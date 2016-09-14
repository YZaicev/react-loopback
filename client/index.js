import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import App from './components/App'
import Posts from './components/Posts'
import Login from './components/Login'

import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

const store = configureStore()

const history = syncHistoryWithStore(browserHistory, store)

// styles
import './styles/styles.css'

render(
    <Provider store={store}>
	    <Router history={history}>
			<Route path="/" component={App}>
			<Route path="/login" component={Login} />
			<Route path="/posts" component={Posts} />
			</Route>
	    </Router>
    </Provider>,
    document.getElementById('root')
)
