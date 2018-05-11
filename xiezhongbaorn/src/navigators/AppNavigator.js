import React from 'react';
import {BackHandler} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {StackNavigator,NavigationActions,TabNavigator,DrawerNavigator} from 'react-navigation';

import LoginScreen from '../components/LoginScreen';
import MainScreen from '../components/MainScreen';
import ProfileScreen from '../components/ProfileScreen';
import {addListener} from '../utils/redux';

export const AppNavigator = StackNavigator(
    {
        Login: {screen: LoginScreen},
        Main: {screen: MainScreen},
        Profile: {screen: ProfileScreen},
    },
    {
        headerMode: 'none'
    }
);

class AppWithNavigationState extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        nav: PropTypes.object.isRequired,
    };

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    onBackPress = () => {
        const {dispatch, nav} = this.props;
        if (nav.index === 0) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

    render() {
        const {dispatch, nav} = this.props;
        const navigation = ({
            dispatch,
            state: nav,
            addListener,
        });
        return (
            <AppNavigator navigation={navigation}/>
        );
    }
}

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
