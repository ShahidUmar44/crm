import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import Input from '@shared/form/Input';
import AppLogo from '../../../../shared/common/AppLogo';
import BigButton from '@shared/buttons/BigButton';
import { colors, spacing, typography } from '@theme';
import ErrorMessage from '@shared/form/ErrorMessage';
import GoBackButton from '@shared/buttons/GoBackButton';

import errorIcon from '@assets/images/error.png';
import emailIcon from '@assets/images/email-icon.png';
import { SCREENS } from '../../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.SCALE_10,
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
  signupText: { textAlign: 'center', color: colors.primary },
  formContainer: {
    width: '100%',
    paddingHorizontal: spacing.SCALE_20,
    marginTop: spacing.SCALE_50,
  },
  rememberMeWrapper: {
    marginTop: spacing.SCALE_16,
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
  },
  error: {
    width: '100%',
    color: colors.error,
    fontSize: typography.FONT_SIZE_12,
    textAlign: 'center',
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

const regex = {
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
};

const ForgetPasswordScreenPresenter = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = data => {};

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
        <Text style={styles.title}>Forget Password</Text>
        <Text style={styles.details}>Please Enter Email Address to Reset your Password</Text>
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

        <View style={{ marginTop: spacing.SCALE_20 }}>
          <BigButton
            onPress={() => navigation.navigate(SCREENS.SET_NEW_PASSWORD)}
            color={colors.primaryDarker}
            borderWidth={1}
            disabled={!isValid}
            isLoading={false}
            loadingColor="white"
            borderColor={'transparent'}>
            <Text style={styles.btnText}>Submit</Text>
          </BigButton>
        </View>
      </View>
      <View style={styles.bottomText}>
        <Text style={styles.details}>
          Don't have an account?{' '}
          <Text
            onPress={() => {
              navigation.navigate('SignUp');
            }}
            style={styles.signupText}>
            Sign-up
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default ForgetPasswordScreenPresenter;
