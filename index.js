import React from "react";
import { AppRegistry } from 'react-native';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from "./app/store/configureStore";

const store = configureStore();

const RNRedux = ()=> (
    <Provider store={store}>
        <App/>
    </Provider>

)

AppRegistry.registerComponent('Kraft', () => RNRedux);
