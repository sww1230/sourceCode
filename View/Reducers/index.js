import {
    createStore,
    combineReducers
} from 'redux'
import {
    routerReducer
} from 'react-router-redux'


import FetchData from './fetchData'



const Store = createStore(
    combineReducers({
        FetchData,
        routing: routerReducer
    })
);

module.exports = Store