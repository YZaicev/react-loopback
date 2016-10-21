import { combineReducers } from 'redux'
import posts from './posts'
import account from './account'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

const app = combineReducers({
    posts,
    account,
    routing: routerReducer
})

export default app
