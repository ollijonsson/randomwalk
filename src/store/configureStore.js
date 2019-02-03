// Redux store configuration with React

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import accountReducer from '../reducers/account';
import tradingReducer from '../reducers/trading';
import filtersReducer from '../reducers/filters';
import errorsReducer from '../reducers/errors';
import { composeWithDevTools } from 'redux-devtools-extension';

// Did not work with some browsers:
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            account: accountReducer,
            trading: tradingReducer,
            filters: filtersReducer,
            errors: errorsReducer
        }),
        composeWithDevTools(applyMiddleware(thunk))
    );
    return store;
};