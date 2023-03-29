import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { colors, spacing } from '../../theme';

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shadow,
    marginHorizontal: 3,
  },
});

const IconButton = ({
  children,
  borderWidth = 1,
  height = spacing.SCALE_30,
  width = spacing.SCALE_30,
  borderColor = colors.transparent,
  borderRadius = spacing.SCALE_6,
  onPress = () => {},
}) => (
  <TouchableOpacity
    activeOpacity={0.7}
    style={{
      ...styles.button,
      width,
      height,
      borderColor,
      borderWidth,
      borderRadius,
    }}
    onPress={() => {
      onPress();
    }}>
    {children}
  </TouchableOpacity>
);

export default IconButton;
