import React from 'react';
import PropTypes from 'prop-types';
import {Button, StyleSheet, Text, View} from 'react-native';
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
});

const MainScreen = ({logout, loginScreen, isLoggedIn, openProfile, user}) => {
    if (!isLoggedIn) {
        return (
            <View style={styles.container}>
                <Text>请登录</Text>
                <Button
                    title={'去登陆'}
                    onPress={loginScreen}
                />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>
                {'你好' + user.name + ",年龄：" + user.age}
            </Text>
            <Button
                onPress={openProfile}
                title="简介"
            />
            <Button
                title={'注销'}
                onPress={logout}
            />
        </View>
    );
};

MainScreen.navigationOptions = {
    title: 'Home Screen',
};


MainScreen.propTypes = {
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


export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
