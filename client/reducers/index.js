import { combineReducers } from 'redux'
import users from './users'
import user from './user'
import session from './account'
import message from './message'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

const app = combineReducers({
    users,
    user,
    session,
    message,
    routing: routerReducer
})

export default app
