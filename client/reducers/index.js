import { combineReducers } from 'redux'
import data from './posts'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

const app = combineReducers({
    data,
    routing: routerReducer
})

export default app
