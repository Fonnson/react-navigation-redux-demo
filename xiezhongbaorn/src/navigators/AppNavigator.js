import React from 'react';
import {BackHandler} from 'react-native';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {NavigationActions, StackNavigator,} from 'react-navigation';
import Interpolator from "react-navigation/src/views/StackView/StackViewStyleInterpolator";
import LoginPage from '../components/LoginPage';
import ProfilePage from '../components/ProfilePage';
import {addListener} from '../utils/redux';
import AppDrawerLayout from './AppDrawerLayout'


/**
 * 页面容器
 */
export const AppNavigator = StackNavigator(
    {
        Login: {screen: LoginPage},
        Main: {screen: AppDrawerLayout},
        Profile: {screen: ProfilePage},
    },
    {
        headerMode: 'none',//隐藏stackNavigator所有标题栏
        mode: 'modal',
        transitionConfig: () => ({
            // 只要修改最后的forVertical就可以实现不同的动画了。
            screenInterpolator: Interpolator.forHorizontal,
        })
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
