import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { get, useFormContext } from 'react-hook-form';

import { colors, spacing, typography } from '../../theme';

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.SCALE_6,
    // marginBottom: spacing.SCALE_4,
    paddingHorizontal: spacing.SCALE_24,
  },
  errorText: {
    width: '100%',
    color: colors.error,
    fontSize: typography.FONT_SIZE_12,
    paddingHorizontal: spacing.SCALE_4,
  },
});

const ErrorMessage = ({ errors, name, message, alignment = 'left' }) => {
  const methods = useFormContext();
  const error = get(errors || methods.errors, name);

  if (!error) {
    return <Text />;
  }

  const { message: messageFromRegister } = error;

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.errorText, textAlign: alignment }}>{messageFromRegister || message}</Text>
    </View>
  );
};

export default ErrorMessage;
