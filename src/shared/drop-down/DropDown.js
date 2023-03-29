import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';
import { colors, spacing, typography } from '../../theme';

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
  },
  leftIcon: {
    height: spacing.SCALE_20,
    width: spacing.SCALE_20,
  },
});

const DropDown = React.forwardRef(
  (
    {
      disabled,
      width,
      data,
      height,
      onSelect,
      maxWidth,
      buttonTextStyle,
      defaultButtonText = '',
      paddingVertical,
      leftIcon,
      top = '50%',
      left = spacing.SCALE_8,
      borderRadius,
      marginTop,
      paddingRight,
      borderWidth,
      borderColor,
    },
    ref,
  ) => {
    return (
      <View style={{ width }}>
        <SelectDropdown
          ref={ref}
          disabled={disabled}
          maxWidth={maxWidth}
          data={data}
          buttonStyle={{
            ...styles.inputContainer,
            height,
            paddingVertical,
            backgroundColor: disabled ? colors.disable : colors.shadow,
            borderRadius,
            marginTop,
            borderWidth,
            borderColor,
          }}
          onSelect={onSelect}
          buttonTextStyle={{
            ...buttonTextStyle,
            marginRight: 0,
            paddingVertical: spacing.SCALE_6,
            paddingRight,
            textAlign: 'left',
            marginLeft: 25,
            fontSize: typography.FONT_SIZE_16,
          }}
          defaultButtonText={defaultButtonText}
          buttonTextAfterSelection={selectedItem => selectedItem}
          rowTextForSelection={item => item}
          dropdownIconPosition="right"
          renderDropdownIcon={isOpened => (
            <AntDesign name={isOpened ? 'up' : 'down'} color={colors.primary} size={12} />
          )}
          dropdownStyle={{
            borderBottomLeftRadius: spacing.SCALE_10,
            borderBottomRightRadius: spacing.SCALE_10,
          }}
          rowTextStyle={{
            textAlign: 'left',
            color: colors.darkGrey,
          }}
          selectedRowTextStyle={{
            color: colors.darkText,
          }}
        />
        {leftIcon && (
          <View
            style={{
              position: 'absolute',
              left,
              top,
              transform: [{ translateY: -11 }],
            }}>
            <Image resizeMode="contain" source={leftIcon} style={styles.leftIcon} />
          </View>
        )}
      </View>
    );
  },
);

export default DropDown;
