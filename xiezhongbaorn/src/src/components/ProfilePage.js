import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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

const ProfilePage = () => (
  <View style={styles.container}>
    <Text style={styles.welcome}>
      简介页面
    </Text>
  </View>
);

ProfilePage.navigationOptions = {
  title: '简介',
};

export default ProfilePage;
