import React from 'react';
import { View, Image, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import { colors, spacing, typography } from '../../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  inputContainer: {
    width: SCREEN_WIDTH - 60,
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
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
    width: '84%',
    color: colors.darkText,
    fontSize: typography.FONT_SIZE_16,
  },
  leftIcon: {
    width: spacing.SCALE_20,
    height: spacing.SCALE_20,
    marginLeft: spacing.SCALE_16,
  },
  rightIconContainer: {
    position: 'absolute',
    right: spacing.SCALE_6,
    justifyContent: 'center',
    width: spacing.SCALE_30,
    height: spacing.SCALE_30,
  },
  rightIcon: {
    width: spacing.SCALE_24,
    height: spacing.SCALE_24,
  },
});

const Input = ({
  value,
  secureTextEntry = false,
  error = false,
  placeholder = '',
  leftImage = null,
  rightImage = null,
  rightIconStyle = {},
  height = spacing.SCALE_56,
  width = '100%',
  keyboardType = 'default',
  borderWidth = 0.3,
  borderRadius = spacing.SCALE_6,
  backgroundColor = colors.shadow,
  onChange = () => {},
  onChangeText = null,
  onBlur = () => {},
  onPressRightIcon = () => {},
  alignItems = 'center',
  marginTop = spacing.SCALE_16,
  textAlignVertical,
  paddingTop,
  disabled,
  editable,
}) => {
  return (
    <View
      style={{
        ...styles.inputContainer,
        width,
        height,
        borderRadius,
        backgroundColor,
        borderWidth,
        borderColor: error ? colors.error : colors.primary,
        alignItems,
        marginTop,
      }}>
      {leftImage && <Image source={leftImage} resizeMode="contain" resizeMethod="resize" style={styles.leftIcon} />}
      <TextInput
        style={{
          ...styles.input,

          height: height - 4,
          borderRadius,
          paddingLeft: leftImage ? spacing.SCALE_10 : spacing.SCALE_22,
          paddingRight: rightImage ? spacing.SCALE_24 : spacing.SCALE_0,
          textAlignVertical,
          paddingTop,
        }}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        onChangeText={onChangeText ? onChangeText : onChange}
        onChange={onChange}
        onBlur={onBlur}
        blurOnSubmit={false}
        secureTextEntry={secureTextEntry}
        value={value}
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={keyboardType}
        returnKeyType="next"
        editable={editable}
      />
      {rightImage && (
        <TouchableOpacity disabled={disabled} style={styles.rightIconContainer} onPress={() => onPressRightIcon()}>
          <Image
            onPress={onPressRightIcon}
            source={rightImage}
            resizeMode="contain"
            resizeMethod="resize"
            style={{ ...styles.rightIcon, ...rightIconStyle }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;
