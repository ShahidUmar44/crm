import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const WelcomeScreenPresenter = () => {
  return (
    <View style={styles.container}>
      <Text> WELCOME</Text>
    </View>
  );
};

export default WelcomeScreenPresenter;
