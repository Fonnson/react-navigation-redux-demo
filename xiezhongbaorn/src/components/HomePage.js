import React from 'react';
import PropTypes from 'prop-types';
import {Button, StatusBar, StyleSheet, Text, View} from 'react-native';
import * as type from "../actions/actionType";
import {NavigationActions} from "react-navigation";
import {connect} from "react-redux";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    btn: {
        display: 'none'
    }
});

const HomePage = ({logout, loginScreen, isLoggedIn, openProfile, user}) => (
    <View style={styles.container}>
        <StatusBar
            animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
            hidden={false}  //是否隐藏状态栏。
            backgroundColor={'#305da255'} //状态栏的背景色
            translucent={true}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
            barStyle={'light-content'} // enum('default', 'light-content', 'dark-content')
        />

        <Text style={styles.welcome}>
            {isLoggedIn ? '你好' + user.name + ",年龄：" + user.age : "请登录"}
        </Text>
        <View
            style={isLoggedIn ? {} : {display: "none"}}>
            <Button
                onPress={openProfile}
                title="简介"
            />
        </View>
        <Button
            title={isLoggedIn ? '注销' : "去登陆"}
            onPress={isLoggedIn ? logout : loginScreen}
        />
    </View>
);

HomePage.navigationOptions = {
    title: '主页',
};

HomePage.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    loginScreen: PropTypes.func.isRequired,
    openProfile: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    isLoggedIn: state.login.isLoggedIn,
    user: state.login.user,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch({type: type.LOGOUT}),
    loginScreen: () =>
        dispatch(NavigationActions.navigate({routeName: 'Login'})),
    openProfile: () =>
        dispatch(NavigationActions.navigate({routeName: 'Profile'})),
});


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
