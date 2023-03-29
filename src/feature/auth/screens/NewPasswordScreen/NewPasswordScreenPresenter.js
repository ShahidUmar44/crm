import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import Input from '@shared/form/Input';
import AppLogo from '../../../../shared/common/AppLogo';
import BigButton from '@shared/buttons/BigButton';
import { colors, spacing, typography } from '@theme';
import ErrorMessage from '@shared/form/ErrorMessage';
import GoBackButton from '@shared/buttons/GoBackButton';

import eye from '@assets/images/eye.png';
import eyeOff from '@assets/images/eye-off.png';
import errorIcon from '@assets/images/error.png';
import passwordIcon from '@assets/images/password-icon.png';
import { SCREENS } from '../../../../constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.SCALE_10,
    justifyContent: 'space-between',
    backgroundColor: colors.whiteBackground,
  },
  logoContainer: {
    marginTop: spacing.SCALE_10,
  },
  title: {
    textAlign: 'center',
    color: colors.primaryDarker,
    fontSize: typography.FONT_SIZE_26,
    fontWeight: typography.FONT_WEIGHT_SEMI_BOLD,
  },
  details: {
    marginTop: 12,
    textAlign: 'center',
    color: colors.darkText,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: spacing.SCALE_20,
    marginTop: spacing.SCALE_30,
  },
  error: {
    width: '100%',
    textAlign: 'center',
    color: colors.error,
    fontSize: typography.FONT_SIZE_12,
  },
  backIcon: {
    position: 'absolute',
    top: spacing.SCALE_10,
    left: spacing.SCALE_10,
  },
  btnText: {
    color: colors.text,
    fontSize: typography.FONT_SIZE_16,
    fontWeight: typography.FONT_WEIGHT_BOLD,
  },
});

const NewPasswordScreenPresenter = () => {
  const navigation = useNavigation();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: 'all',
  });

  const onSubmit = data => {
    navigation.navigate(SCREENS.SIGN_IN);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.backIcon}>
        <GoBackButton onPress={handleBackPress} />
      </View>
      <View style={styles.logoContainer}>
        <AppLogo />
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.details}>Please Enter Email Address to Login</Text>
      </View>
      <View style={styles.formContainer}>
        <Controller
          name="oldPassword"
          control={control}
          rules={{
            required: '*Old Password is required',
            minLength: {
              value: 4,
              message: '*Please enter valid password',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              onChangeText={onChange}
              error={errors.oldPassword}
              leftImage={passwordIcon}
              placeholder={'Old Password'}
              secureTextEntry={showOldPassword}
              rightIconStyle={styles.rightIconStyle}
              rightImage={errors.oldPassword ? errorIcon : showOldPassword ? eyeOff : eye}
              onPressRightIcon={() => setShowOldPassword(!showOldPassword)}
            />
          )}
        />
        {errors.oldPassword && <ErrorMessage errors={errors} name="oldPassword" alignment="center" />}

        <Controller
          name="newPassword"
          control={control}
          rules={{
            required: '*New Password is required',
            minLength: {
              value: 4,
              message: '*Please enter valid password',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              onChangeText={onChange}
              error={errors.newPassword}
              leftImage={passwordIcon}
              placeholder={'New Password'}
              secureTextEntry={showNewPassword}
              rightIconStyle={styles.rightIconStyle}
              rightImage={errors.newPassword ? errorIcon : showNewPassword ? eyeOff : eye}
              onPressRightIcon={() => setShowNewPassword(!showNewPassword)}
            />
          )}
        />
        {errors.newPassword && <ErrorMessage errors={errors} name="newPassword" alignment="center" />}

        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: '*Confirmation Password is required',
            minLength: {
              value: 4,
              message: '*Please enter valid password',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              onChangeText={onChange}
              error={errors.confirmPassword}
              leftImage={passwordIcon}
              placeholder={'Confirm Password'}
              secureTextEntry={showConfirmPassword}
              rightIconStyle={styles.rightIconStyle}
              rightImage={errors.confirmPassword ? errorIcon : showConfirmPassword ? eyeOff : eye}
              onPressRightIcon={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          )}
        />
        {errors.confirmPassword && <ErrorMessage errors={errors} name="confirmPassword" alignment="center" />}

        <View style={{ marginTop: spacing.SCALE_18 }}>
          <BigButton
            onPress={handleSubmit(onSubmit)}
            color={colors.primaryDarker}
            borderWidth={1}
            disabled={!isValid}
            isLoading={false}
            loadingColor="white"
            borderColor={'transparent'}>
            <Text style={styles.btnText}>Reset Password</Text>
          </BigButton>
        </View>
      </View>
    </View>
  );
};

export default NewPasswordScreenPresenter;
