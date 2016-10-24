import { combineReducers } from 'redux'
import posts from './posts'
import account from './account'
import message from './message'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

const app = combineReducers({
    posts,
    account,
    message,
    routing: routerReducer
})

export default app
