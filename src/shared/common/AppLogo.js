import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

import { spacing } from '@theme';
import logo from '@assets/images/logo.png';

const styles = StyleSheet.create({
  logoContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    width: spacing.SCALE_214,
    height: spacing.SCALE_214,
  },
});

const AppLogo = () => {
  return (
    <View style={styles.logoContainer}>
      <Image source={logo} resizeMethod="resize" resizeMode="contain" style={styles.logo} />
    </View>
  );
};

export default AppLogo;
