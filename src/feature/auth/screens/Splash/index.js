import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors } from '../../../../theme';
import { PrimaryImage } from '../../../../shared/images';
import { MainWrapper, Wrapper } from '../../../../shared/wrappers';

import splashLogo from '@assets/images/splash-logo.png';

const Splash = () => {
  return (
    <LinearGradient colors={[colors.primary, colors.primaryDarker]} style={styles.linearGradient}>
      <MainWrapper>
        <Wrapper animation={'fadeOutUpBig'}>
          <PrimaryImage styles={{ flex: 1 }} source={splashLogo} size={230} />
        </Wrapper>
      </MainWrapper>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Splash;
