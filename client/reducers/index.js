import { combineReducers } from 'redux'
import users from './users'
import session from './account'
import message from './message'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

const app = combineReducers({
    users,
    session,
    message,
    routing: routerReducer
})

export default app
