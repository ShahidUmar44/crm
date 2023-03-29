import React from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';

import { colors, spacing, typography } from '../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  inputContainer: {
    width: SCREEN_WIDTH - 60,
    borderWidth: 0.5,
    marginTop: spacing.SCALE_16,
    borderRadius: spacing.SCALE_6,
    backgroundColor: colors.lightColor,
    shadowColor: colors.shadow,
    shadowOpacity: 0.2,
    shadowRadius: 18,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  input: {
    width: '100%',
    color: colors.darkText,
    fontSize: typography.FONT_SIZE_16,
    borderTopEndRadius: spacing.SCALE_30,
    borderBottomEndRadius: spacing.SCALE_30,
  },
});

const InputSecondary = ({
  value,
  placeholder = '',
  height = spacing.SCALE_56,
  width = '100%',
  keyboardType = 'default',
  borderWidth = 0.3,
  borderRadius = spacing.SCALE_6,
  backgroundColor = colors.shadow,
  onChange = () => {},
  onChangeText = null,
  multiline = false,
  onBlur = () => {},
  onPressRightIcon = () => {},
  disabled = false,
}) => {
  return (
    <View
      style={{
        ...styles.inputContainer,
        width,
        height,
        borderRadius,
        backgroundColor: disabled ? colors.mediumGrey : colors.lightColor,
        borderWidth,
        borderColor: colors.primary,
        paddingVertical: multiline ? spacing.SCALE_20 : 0,
      }}>
      <TextInput
        style={{
          ...styles.input,
          borderRadius,
          paddingHorizontal: spacing.SCALE_20,
          height: multiline ? '100%' : spacing.SCALE_58,
          textAlignVertical: multiline ? 'top' : 'center',
        }}
        editable={!disabled}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        onChangeText={onChangeText ? onChangeText : onChange}
        onChange={onChange}
        onBlur={onBlur}
        blurOnSubmit={false}
        value={value}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={keyboardType}
        returnKeyType="next"
        multiline={multiline}
      />
    </View>
  );
};

export default InputSecondary;
