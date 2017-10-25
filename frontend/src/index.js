import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import PostDetails from './components/PostDetails';
import PostsByCategory from './components/PostsByCategory';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/RootReducer';
import createHistory from 'history/createBrowserHistory';
import { Route, Switch } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);
    return result;
};

//we're using a browser history in this case
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const routerReduxMiddleware = routerMiddleware(history)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(logger, thunk, routerReduxMiddleware)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/postdetails/:post_id" component={PostDetails} />
                <Route path="/postsbycategory/:category" component={PostsByCategory} />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
