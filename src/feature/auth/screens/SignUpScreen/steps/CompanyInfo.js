import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Input from '../../../../../shared/form/Input';
import BigButton from '../../../../../shared/buttons/BigButton';
import DropDown from '../../../../../shared/drop-down/DropDown';
import ErrorMessage from '../../../../../shared/form/ErrorMessage';
import { colors, spacing, typography } from '../../../../../theme';

import cityIcon from '@assets/images/city.png';
import stateIcon from '@assets/images/state.png';
import phoneIcon from '@assets/images/phone.png';
import errorIcon from '@assets/images/error.png';
import addressIcon from '@assets/images/address.png';
import websiteIcon from '@assets/images/website.png';
import industryIcon from '@assets/images/industry.png';
import companyNameIcon from '@assets/images/company-name.png';

const data = ['1-5', '5-10', '10-20', '20-30', 'More than 30'];
const industryData = [
  'Window Cleaning',
  'General Cleaning',
  'Landscaping',
  'Painting',
  'Plumbing',
  'Electrical',
  'Roofing',
  'Other',
];
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
  address: {
    flexGrow: 1,
    width: '100%',
  },
  leftIcon: {
    width: spacing.SCALE_20,
    height: spacing.SCALE_20,
    marginLeft: spacing.SCALE_16,
    marginTop: spacing.SCALE_10,
  },
  addressContainer: {
    alignItems: 'center',
    backgroundColor: colors.shadow,
    borderWidth: 0.5,
    borderColor: colors.primary,
    height: spacing.SCALE_56,
    marginTop: spacing.SCALE_16,
    justifyContent: 'center',
    borderRadius: spacing.SCALE_6,
  },
  listView: {
    position: 'absolute',
    zIndex: 99999,
    top: '100%',
    right: 0,
  },
});

const CompanyInfoScreen = ({ onStepNumber, companyDetails }) => {
  const [location, setLocation] = useState(null);
  const [postalCode, setPostalCode] = useState([]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      companyName: '',
      address: location,
      companyPhone: '',
      city: '',
      state: '',
      postalCode: '',
      industry: '',
      companySize: '',
      website: '',
    },
  });
  useEffect(() => {
    let cityName = location?.split(',')[0];
    let stateName = location?.split(',')[1];
    setValue('city', cityName);
    setValue('state', stateName);
    setValue('postalCode', postalCode);
  }, [location]);

  const onSubmit = data => {
    companyDetails(data);
    onStepNumber(3);
  };

  return (
    <View>
      <Text style={styles.title}>Add Your Company Info</Text>
      <Text style={styles.details}>
        Lorem ipsum dolor sit amet consectetur. Pellentesque commodo sit ultricies risus convallis. Quisque urna enim
        viverra commodo
      </Text>
      <Controller
        name="companyName"
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
            error={errors.companyName}
            leftImage={companyNameIcon}
            placeholder={'Company Name'}
            rightImage={errors.companyName ? errorIcon : null}
            rightIconStyle={styles.rightIconStyle}
          />
        )}
      />
      {errors.companyName && <ErrorMessage errors={errors} name="companyName" alignment="center" />}

      <View style={styles.address}>
        <GooglePlacesAutocomplete
          placeholder="Search"
          fetchDetails={true}
          onPress={(data, details = null) => {
            const addressComponents = details.address_components;
            const postalCodeObj = addressComponents.find(component => component.types.includes('postal_code'));
            const postalCode = postalCodeObj?.long_name ?? '';
            setPostalCode(postalCode);
            setLocation(details.formatted_address);
          }}
          query={{
            key: 'AIzaSyBqJDkyWdb21uklLpw3riZEk0DnsQ8JVRk',
            language: 'en',
          }}
          renderLeftButton={() => {
            return <Image style={styles.leftIcon} source={addressIcon} />;
          }}
          styles={{
            container: styles.addressContainer,
            textInput: {
              backgroundColor: colors.shadow,
            },
            listView: styles.listView,
          }}
        />
      </View>

      {errors.address && <ErrorMessage errors={errors} name="address" alignment="center" />}
      <View style={{ zIndex: -9999 }}>
        <Controller
          name="companyPhone"
          control={control}
          rules={{
            required: '*Phone is required',
            minLength: {
              value: 3,
              message: '*Please enter valid phone number',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              onChangeText={onChange}
              error={errors.companyPhone}
              keyboardType="numeric"
              leftImage={phoneIcon}
              placeholder={'Company Phone'}
              rightImage={errors.companyPhone ? errorIcon : null}
              rightIconStyle={styles.rightIconStyle}
            />
          )}
        />
        {errors.companyPhone && <ErrorMessage errors={errors} name="companyPhone" alignment="center" />}

        <Controller
          name="city"
          control={control}
          rules={{
            required: '*City is required',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              onChangeText={onChange}
              error={errors.state}
              leftImage={cityIcon}
              placeholder={'City'}
              rightImage={errors.city ? errorIcon : null}
              rightIconStyle={styles.rightIconStyle}
            />
          )}
        />
        {errors.city && <ErrorMessage errors={errors} name="city" alignment="center" />}

        <Controller
          name="state"
          control={control}
          rules={{
            required: '*State is required',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              width={'100%'}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              onChangeText={onChange}
              error={errors.state}
              leftImage={stateIcon}
              placeholder={'State'}
              rightImage={errors.state ? errorIcon : null}
              rightIconStyle={styles.rightIconStyle}
            />
          )}
        />
        {errors.state && <ErrorMessage errors={errors} name="state" alignment="center" />}

        <Controller
          name="postalCode"
          control={control}
          rules={{
            required: '*Postal code is required',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              width={'100%'}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              onChangeText={onChange}
              error={errors.postalCode}
              leftImage={cityIcon}
              placeholder={'Postal Code'}
              rightImage={errors.postalCode ? errorIcon : null}
              rightIconStyle={styles.rightIconStyle}
              keyboardType="numeric"
            />
          )}
        />
        {errors.postalCode && <ErrorMessage errors={errors} name="postalCode" alignment="center" />}

        <Controller
          name="industry"
          control={control}
          rules={{
            required: '*Industry is required',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <DropDown
              top="50%"
              left={15}
              marginRight={spacing.SCALE_0}
              marginTop={spacing.SCALE_10}
              height={spacing.SCALE_60}
              borderRadius={spacing.SCALE_10}
              buttonTextStyle={{ fontSize: typography.FONT_SIZE_14 }}
              leftIcon={industryIcon}
              borderWidth={0.3}
              borderColor={colors.primary}
              onSelect={val => {
                onChange(val);
              }}
              data={industryData}
              defaultButtonText="Industry"
            />
          )}
        />
        {errors.industry && <ErrorMessage errors={errors} name="industry" alignment="center" />}

        <Controller
          name="companySize"
          control={control}
          rules={{
            required: '*Company size is required',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <DropDown
              top="50%"
              left={15}
              marginRight={spacing.SCALE_0}
              marginTop={spacing.SCALE_10}
              height={spacing.SCALE_60}
              borderRadius={spacing.SCALE_10}
              buttonTextStyle={{ fontSize: typography.FONT_SIZE_14 }}
              leftIcon={companyNameIcon}
              onSelect={val => {
                onChange(val);
              }}
              borderWidth={0.3}
              borderColor={colors.primary}
              data={data}
              defaultButtonText="Company Size"
            />
          )}
        />
        {errors.companySize && <ErrorMessage errors={errors} name="companySize" alignment="center" />}

        <Controller
          name="website"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              onChangeText={onChange}
              error={errors.website}
              leftImage={websiteIcon}
              placeholder={'Website (Optional)'}
              rightImage={errors.website ? errorIcon : null}
              rightIconStyle={styles.rightIconStyle}
            />
          )}
        />
        {errors.website && <ErrorMessage errors={errors} name="website" alignment="center" />}

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
    </View>
  );
};

export default CompanyInfoScreen;
