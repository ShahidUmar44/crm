import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import Input from '../../../../../shared/form/Input';
import BigButton from '../../../../../shared/buttons/BigButton';
import { colors, spacing, typography } from '../../../../../theme';
import ErrorMessage from '../../../../../shared/form/ErrorMessage';

import eye from '@assets/images/eye.png';
import eyeOff from '@assets/images/eye-off.png';
import errorIcon from '@assets/images/error.png';
import passwordIcon from '@assets/images/password-icon.png';
import { SCREENS } from '../../../../../constants';
import { useNavigation } from '@react-navigation/core';

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: colors.primaryDarker,
    fontSize: typography.FONT_SIZE_20,
    fontWeight: typography.FONT_WEIGHT_SEMI_BOLD,
  },
  details: {
    marginTop: 12,
    textAlign: 'center',
    color: colors.darkText,
    paddingHorizontal: spacing.SCALE_20,
  },
  btnText: {
    color: colors.text,
    fontSize: typography.FONT_SIZE_16,
    fontWeight: typography.FONT_WEIGHT_BOLD,
  },
});

const PasswordScreen = ({ passwordDetails, onSubmit }) => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <View>
      <Text style={styles.title}>Enter your password</Text>
      <Text style={styles.details}>
        Lorem ipsum dolor sit amet consectetur. Pellentesque commodo sit ultricies risus convallis. Quisque urna enim
        viverra commodo
      </Text>
      <Controller
        name="password"
        control={control}
        rules={{
          required: '*Password is required',
          minLength: {
            value: 6,
            message: '*Password should be atleat 6 characters long',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            onChangeText={onChange}
            error={errors.password}
            leftImage={passwordIcon}
            placeholder={'Passsword'}
            secureTextEntry={showPassword}
            rightIconStyle={styles.rightIconStyle}
            rightImage={errors.password ? errorIcon : showPassword ? eyeOff : eye}
            onPressRightIcon={() => setShowPassword(!showPassword)}
          />
        )}
      />
      {errors.password && <ErrorMessage errors={errors} name="password" alignment="center" />}

      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: '*Confirm password is required',
          minLength: {
            value: 6,
            message: '*Password should be atleat 6 characters long',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            onChangeText={onChange}
            error={errors.password}
            leftImage={passwordIcon}
            placeholder={'Confirm passsword'}
            secureTextEntry={showConfirmPassword}
            rightIconStyle={styles.rightIconStyle}
            rightImage={errors.password ? errorIcon : showConfirmPassword ? eyeOff : eye}
            onPressRightIcon={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        )}
      />
      {errors.password && <ErrorMessage errors={errors} name="password" alignment="center" />}

      <View style={{ marginTop: spacing.SCALE_18 }}>
        <BigButton
          onPress={handleSubmit(onSubmit)}
          color={colors.primaryDarker}
          borderWidth={1}
          disabled={!isValid}
          isLoading={false}
          loadingColor="white"
          borderColor={'transparent'}>
          <Text style={styles.btnText}>Sign Up</Text>
        </BigButton>
      </View>
    </View>
  );
};

export default PasswordScreen;
