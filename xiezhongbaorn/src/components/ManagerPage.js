import React from 'react';
import {Text, View,} from 'react-native';

const ManagerPage = () => (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>管理页面</Text>
    </View>
);

ManagerPage.navigationOptions = {
    title: '管理',
};
export default ManagerPage;