import React from 'react';
import {StatusBar, NativeModules} from 'react-native';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';

import AppReducer from './reducers';
import AppWithNavigationState from './navigators/AppNavigator';
import {middleware} from './utils/redux';
import thunkMiddleware from 'redux-thunk';

const store = createStore(
    AppReducer,
    applyMiddleware(...[middleware, thunkMiddleware]),
);

export default class ReduxExampleApp extends React.Component {

    componentDidMount() {
        //加载完毕，关闭启动页
        NativeModules.SplashScreen.hide();
    }

    render() {
        return (
            <Provider store={store}>
                <AppWithNavigationState/>
            </Provider>
        );
    }
}