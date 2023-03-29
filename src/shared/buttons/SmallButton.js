import React from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity, View, Text } from 'react-native';

import { colors, spacing, typography } from '../../theme';

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontFamily: typography.primary,
    fontSize: typography.FONT_SIZE_16,
  },
});

const SmallButton = ({
  text,
  onPress,
  size = 100,
  disabled = false,
  isLoading = false,
  color = colors.primaryDarker,
  textColor = colors.lightColor,
  loadingColor = colors.darkGrey,
  width = spacing.SCALE_180,
  height = spacing.SCALE_50,
  borderColor = colors.primaryDarker,
  border,
}) => {
  const textContent =
    typeof text === 'string' ? <Text style={{ ...styles.text, color: textColor }}>{text}</Text> : <View>{text}</View>;

  return (
    <TouchableOpacity
      onPress={() => {
        if (!disabled) onPress();
      }}
      disabled={disabled}>
      <View
        style={{
          ...styles.container,
          borderWidth: 1,
          borderColor,
          backgroundColor: disabled ? colors.dim : color,
          width,
          height,
        }}
        size={size}>
        {isLoading ? <ActivityIndicator color={loadingColor} /> : <View>{textContent}</View>}
      </View>
    </TouchableOpacity>
  );
};

export default SmallButton;
