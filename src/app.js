// Main application file

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider} from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

// Actions imports
import { login, logout } from './actions/auth';
import { startSetCredentials } from './actions/account';
import { getEverything } from './actions/trading';

// CSS imports
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';


export const store = configureStore();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

// Render app.js only once
let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

// Firebase login, when user is logged in or logged out
firebase.auth().onAuthStateChanged( async (user) => {
    // if user is logged in
    if (user) {
        const authUser = {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
        }
        store.dispatch(login(authUser));
        let creds = await store.dispatch(startSetCredentials());
        creds && store.dispatch(getEverything());
        renderApp();
        // push to dashboard on login
        if (history.location.pathname === '/') {
            history.push('/dashboard');
        }
    // logout    
    } else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});