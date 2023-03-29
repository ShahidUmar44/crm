import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { colors, spacing, typography } from '../../theme';

const styles = StyleSheet.create({
  errorContainer: {
    padding: spacing.SCALE_16,
  },
  errorText: {
    textAlign: 'center',
    width: '100%',
    color: colors.error,
    fontSize: typography.FONT_SIZE_12,
    paddingHorizontal: spacing.SCALE_4,
  },
});

const Error = ({ message, style }) => (
  <View style={{ ...styles.errorContainer, ...style }}>
    <Text style={styles.errorText}>{message}</Text>
  </View>
);

export default Error;
