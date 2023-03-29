import React from 'react';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ScreenWrapper } from 'react-native-screen-wrapper';

export const MainWrapper = props => {
  const { children, style, animation, statusBarColor, barStyle, scrollType } = props;
  return (
    <ScreenWrapper
      statusBarColor={statusBarColor ?? 'white'}
      barStyle={barStyle ?? 'dark-content'}
      scrollType={scrollType ?? 'none'}>
      <Animatable.View animation={animation} style={[styles.mainContainer, style]}>
        {children}
      </Animatable.View>
    </ScreenWrapper>
  );
};

export const Wrapper = ({
  children,
  style,
  animation,
  flex,
  duration,
  iterationCount,
  direction,
  delay,
  onAnimationEnd,
}) => {
  return (
    <Animatable.View
      iterationCount={iterationCount}
      onAnimationEnd={onAnimationEnd}
      direction={direction}
      animation={animation}
      delay={delay}
      useNativeDriver={true}
      duration={duration}
      style={[{ flex: flex }, style]}>
      {children}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: '#FFFFFF',
  },
});
