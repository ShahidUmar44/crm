import React from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colors, spacing } from '../../theme';

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const BigButton = ({
  color,
  children,
  loadingColor,
  borderWidth = 1,
  disabled = false,
  isLoading = false,
  height = spacing.SCALE_56,
  width = '100%',
  borderColor = colors.transparent,
  borderRadius = spacing.SCALE_6,
  marginBottom,

  onPress = () => {},
}) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={() => {
      // if (!disabled) {
      onPress();
      // }
    }}
    disabled={disabled}
    style={{
      marginBottom: marginBottom,
      opacity: disabled ? 0.5 : 1,
    }}>
    <LinearGradient
      colors={[colors.primaryDarker, colors.primary]}
      style={{
        ...styles.button,
        width,
        height,
        borderColor,
        borderWidth,
        borderRadius,
      }}>
      {isLoading ? <ActivityIndicator color={loadingColor} /> : children}
    </LinearGradient>
  </TouchableOpacity>
);

export default BigButton;
