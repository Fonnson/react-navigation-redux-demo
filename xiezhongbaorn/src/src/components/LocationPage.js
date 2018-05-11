import React from 'react';
import {Text, View,} from 'react-native';

const LocationPage = () => (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>定位页面</Text>
    </View>
);

LocationPage.navigationOptions = {
    title: '定位',
};
export default LocationPage;