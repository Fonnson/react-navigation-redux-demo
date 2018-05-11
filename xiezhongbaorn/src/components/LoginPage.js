import React from 'react';
import PropTypes from 'prop-types';
import {Button, StyleSheet, Text, View} from 'react-native';
import * as action from '../actions/loginAction';
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
const LoginPage = ({login, status}) => (
    <View style={styles.container}>
        <Text style={styles.welcome}>
            登陆页面
        </Text>
        <Text style={styles.instructions}>
            {status}
        </Text>
        <Button
            onPress={login}
            title="登陆"
        />
    </View>
);

LoginPage.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
};

LoginPage.navigationOptions = {
    title: 'Log In',
};

const mapStateToProps = state => ({
    isLoggedIn: state.login.isLoggedIn,
    status: state.login.status,
});

const mapDispatchToProps = dispatch => ({
    login: () => dispatch(action.login("张三", "123")),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

