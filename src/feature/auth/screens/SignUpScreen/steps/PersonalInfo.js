import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import Input from '../../../../../shared/form/Input';
import BigButton from '../../../../../shared/buttons/BigButton';
import { colors, spacing, typography } from '../../../../../theme';
import ErrorMessage from '../../../../../shared/form/ErrorMessage';

import personIcon from '@assets/images/person.png';
import emailIcon from '@assets/images/email-icon.png';
import phoneIcon from '@assets/images/phone.png';
import errorIcon from '@assets/images/error.png';

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

const regex = {
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
};

const PersonalInfoScreen = ({ onStepNumber, personalDetails }) => {
  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
    },
  });
  const onSubmit = data => {
    personalDetails(data);
    onStepNumber(2);
  };
  return (
    <View>
      <Text style={styles.title}>Add Your Personal Info</Text>
      <Text style={styles.details}>
        Lorem ipsum dolor sit amet consectetur. Pellentesque commodo sit ultricies risus convallis. Quisque urna enim
        viverra commodo
      </Text>
      <Controller
        name="firstName"
        control={control}
        rules={{
          required: '*First name is required',
          minLength: {
            value: 3,
            message: '*Please enter valid name',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            onChangeText={onChange}
            error={errors.firstName}
            leftImage={personIcon}
            placeholder={'First Name'}
            rightImage={errors.firstName ? errorIcon : null}
            rightIconStyle={styles.rightIconStyle}
          />
        )}
      />
      {errors.firstName && <ErrorMessage errors={errors} name="firstName" alignment="center" />}

      <Controller
        name="lastName"
        control={control}
        rules={{
          required: '*Last name is required',
          minLength: {
            value: 3,
            message: '*Please enter valid name',
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            onChangeText={onChange}
            error={errors.lastName}
            leftImage={personIcon}
            placeholder={'Last Name'}
            rightImage={errors.lastName ? errorIcon : null}
            rightIconStyle={styles.rightIconStyle}
          />
        )}
      />
      {errors.lastName && <ErrorMessage errors={errors} name="lastName" alignment="center" />}

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
            placeholder={'Email'}
            rightImage={errors.email ? errorIcon : null}
            rightIconStyle={styles.rightIconStyle}
          />
        )}
      />
      {errors.email && <ErrorMessage errors={errors} name="email" alignment="center" />}

      <Controller
        name="phoneNumber"
        control={control}
        rules={{
          required: '*Phone number is required',
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            value={value}
            onBlur={onBlur}
            onChange={onChange}
            onChangeText={onChange}
            error={errors.phoneNumber}
            leftImage={phoneIcon}
            keyboardType="numeric"
            placeholder={'Phone Number'}
            rightImage={errors.phoneNumber ? errorIcon : null}
            rightIconStyle={styles.rightIconStyle}
          />
        )}
      />
      {errors.phoneNumber && <ErrorMessage errors={errors} name="phoneNumber" alignment="center" />}

      <View style={{ marginTop: spacing.SCALE_18 }}>
        <BigButton
          onPress={handleSubmit(onSubmit)}
          color={colors.primaryDarker}
          borderWidth={1}
          disabled={!isValid}
          isLoading={false}
          loadingColor="white"
          borderColor={'transparent'}>
          <Text style={styles.btnText}>Next</Text>
        </BigButton>
      </View>
    </View>
  );
};

export default PersonalInfoScreen;
