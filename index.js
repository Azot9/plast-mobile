import { AppRegistry } from 'react-native';
import App from './App';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import { name as appName } from './app.json';
import React, {Component} from 'react';


const store = createStore(reducer)

const RNRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);
