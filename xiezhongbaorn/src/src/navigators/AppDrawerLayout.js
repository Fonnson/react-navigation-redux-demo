import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {DrawerLayoutAndroid, Text, TouchableOpacity, View,StyleSheet,Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TabBarBottom, TabNavigator,} from 'react-navigation';
import HomePage from '../components/HomePage';
import LocationPage from '../components/LocationPage';
import ManagerPage from '../components/ManagerPage';
import MessagePage from '../components/MessagePage';


/**
 * 底部导航栏
 */
const AppTabNav = TabNavigator(
    {
        Homo: {screen: HomePage},
        Location: {screen: LocationPage},
        Manager: {screen: ManagerPage},
        Message: {screen: MessagePage},
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if (routeName === 'Homo') {
                    iconName = `ios-home${focused ? '' : '-outline'}`;
                } else if (routeName === 'Location') {
                    iconName = `ios-locate${focused ? '' : '-outline'}`;
                } else if (routeName === 'Manager') {
                    iconName = `ios-construct${focused ? '' : '-outline'}`;
                } else if (routeName === 'Message') {
                    iconName = `ios-mail${focused ? '-open' : ''}`;
                }
                return <Ionicons name={iconName} size={25} color={tintColor}/>;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
        backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    }
);

/**
 * DrawerLayoutAndroid侧边栏
 */
export default class AppDrawerLayout extends Component {
    render() {
        var navigationView = (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <View style={styles.drawerHeaderContainer}>
                    <Text style={styles.drawerHeaderText1}>偕众保</Text>
                    <Text style={styles.drawerHeaderText2}></Text>
                    <Text style={styles.drawerHeaderText3}></Text>
                </View>

                <TouchableOpacity
                    accessibilityTraits="button"
                    underlayColor='rgba(255, 80, 0, 0.1)'
                    style={{flexDirection: 'row', height: 50, alignItems: 'center',}}
                    onPress={() => {
                        this.props.navigation.navigate('Profile')
                    }}
                >
                    <Ionicons style={{marginLeft: 20}} name={'ios-brush'} size={25} color={'blue'}/>
                    <Text style={{marginLeft: 10, fontSize: 16,}}>修改密码</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    accessibilityTraits="button"
                    underlayColor='rgba(255, 80, 0, 0.1)'
                    style={{flexDirection: 'row', height: 50, alignItems: 'center'}}
                    onPress={() => {
                        this.props.navigation.navigate('Profile')
                    }}
                >
                    <Ionicons style={{marginLeft: 20}} name={'ios-settings'} size={25} color={'blue'}/>
                    <Text style={{marginLeft: 10, fontSize: 16,}}>设置</Text>
                </TouchableOpacity>
            </View>
        );
        return (
            <DrawerLayoutAndroid
                drawerWidth={150}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}>
                <AppTabNav/>
            </DrawerLayoutAndroid>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 200,
        width: '100%'
    },
    welcome: {
        fontSize: 20,
        height: 80,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    drawerHeaderContainer: {
        height: 150,
        backgroundColor: '#8C978B',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        paddingTop: (Platform.OS === 'android' && Platform.Version < 19) ? 0 : (Platform.OS === 'android' ? 24 : 20),
    },
    drawerHeaderText1: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    drawerHeaderText2: {
        color: '#CCCCCC',
        fontSize: 13,
        alignSelf: 'center',
    },
    drawerHeaderText3: {
        color: '#FFFFFF',
        fontSize: 15,
        marginTop: 10,
    },
});