import React from 'react';
import {Text, View,} from 'react-native';

const MessagePage = () => (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>消息页面</Text>
    </View>
);

MessagePage.navigationOptions = {
    title: '消息',
};
export default MessagePage;