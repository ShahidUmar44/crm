import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import Input from '@shared/form/Input';
import AppLogo from '../../../../shared/common/AppLogo';
import { SCREENS } from '../../../../constants';
import BigButton from '@shared/buttons/BigButton';
import ErrorMessage from '@shared/form/ErrorMessage';
import { colors, spacing, typography } from '@theme';

import eye from '@assets/images/eye.png';
import eyeOff from '@assets/images/eye-off.png';
import errorIcon from '@assets/images/error.png';
import emailIcon from '@assets/images/email-icon.png';
import passwordIcon from '@assets/images/password-icon.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.SCALE_10,
    justifyContent: 'space-between',
    backgroundColor: colors.whiteBackground,
  },
  checkbox: {
    margin: 8,
  },
  emailIcon: {
    width: spacing.SCALE_44,
    height: spacing.SCALE_44,
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
  dontHaveAcntText: {
    marginTop: 12,
    textAlign: 'center',
    color: colors.primary,
  },
  signupText: { textAlign: 'center', color: colors.primaryDarker },
  formContainer: {
    width: '100%',
    paddingHorizontal: spacing.SCALE_20,
  },
  rememberMeWrapper: {
    marginTop: spacing.SCALE_12,
    marginLeft: spacing.SCALE_20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMe: {
    color: colors.primary,
    fontSize: typography.FONT_SIZE_14,
    marginLeft: 6,
  },
  bottomText: {
    marginTop: spacing.SCALE_24,
    paddingBottom: spacing.SCALE_12,
    flexDirection: 'row',
    justifyContent: 'center',
    itemsCenter: 'center',
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
  forgetPassText: {
    color: colors.primaryDarker,
    fontSize: typography.FONT_SIZE_14,
    marginTop: spacing.SCALE_26,
    alignSelf: 'center',
  },
});

const regex = {
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
};

const SignInScreenPresenter = ({ isLoading, onSignIn }) => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isValid, errors, isSubmitted },
    setError,
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = data => {
    onSignIn(data, setError);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={115}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <AppLogo />
            <Text style={styles.title}>Sign In</Text>
            <Text style={styles.details}>Please Enter Email Address to Login</Text>
          </View>
          <View style={styles.formContainer}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: '*Email is required',
                pattern: {
                  value: regex.email,
                  message: '*Please enter valid email address',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  onChangeText={onChange}
                  error={errors.email}
                  leftImage={emailIcon}
                  placeholder={'Enter your email'}
                  rightImage={errors.email ? errorIcon : null}
                  rightIconStyle={styles.rightIconStyle}
                />
              )}
            />
            {errors.email && <ErrorMessage errors={errors} name="email" alignment="center" />}

            <Controller
              name="password"
              control={control}
              rules={{
                required: '*Password is required',
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
                  error={errors.password}
                  leftImage={passwordIcon}
                  placeholder={'Enter your passsword'}
                  secureTextEntry={showPassword}
                  rightIconStyle={styles.rightIconStyle}
                  rightImage={errors.password ? errorIcon : showPassword ? eyeOff : eye}
                  onPressRightIcon={() => setShowPassword(!showPassword)}
                />
              )}
            />
            {errors.password && <ErrorMessage errors={errors} name="password" alignment="center" />}

            <View style={styles.rememberMeWrapper}>
              <Checkbox
                style={styles.checkbox}
                value={toggleCheckBox}
                onValueChange={setToggleCheckBox}
                color={toggleCheckBox ? colors.primary : undefined}
              />
              <Text style={styles.rememberMe}>Remember me</Text>
            </View>

            <View style={{ marginTop: spacing.SCALE_12 }}>
              <BigButton
                onPress={handleSubmit(onSubmit)}
                color={colors.primaryDarker}
                borderWidth={1}
                disabled={!isValid}
                isLoading={false}
                loadingColor="white"
                borderColor={'transparent'}>
                <Text style={styles.btnText}>Sign In</Text>
              </BigButton>
            </View>
            <Pressable
              onPress={() => {
                navigation.navigate(SCREENS.FORGET_PASSWORD);
              }}>
              <Text style={styles.forgetPassText}>Forget password?</Text>
            </Pressable>
          </View>
          <View style={styles.bottomText}>
            <Text style={styles.dontHaveAcntText}>
              Don't have an account?{' '}
              <Pressable
                onPress={() => {
                  navigation.navigate(SCREENS.SIGN_UP);
                }}>
                <Text style={styles.signupText}>Sign-up</Text>
              </Pressable>
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

export default SignInScreenPresenter;
