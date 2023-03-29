import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';

import Input from '../../../../shared/form/Input';
import BigButton from '../../../../shared/buttons/BigButton';
import IconButton from '../../../../shared/buttons/IconButton';
import { colors, spacing, typography } from '../../../../theme';
import ErrorMessage from '../../../../shared/form/ErrorMessage';
import GoBackButton from '../../../../shared/buttons/GoBackButton';

import eye from '@assets/images/eye.png';
import eyeOff from '@assets/images/eye-off.png';
import userIcon from '@assets/images/person.png';
import phoneIcon from '@assets/images/phone.png';
import errorIcon from '@assets/images/error.png';
import emailIcon from '@assets/images/email-icon.png';
import passwordIcon from '@assets/images/password-icon.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 10,
    alignSelf: 'center',
    paddingHorizontal: '5%',
  },
  title: {
    textAlign: 'center',
    color: colors.primaryDarker,
    fontSize: typography.FONT_SIZE_20,
    fontWeight: typography.FONT_WEIGHT_SEMI_BOLD,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.SCALE_10,
  },
  header: { fontSize: typography.FONT_SIZE_20, fontFamily: typography.secondary, color: colors.primaryDarker },
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
  tagView: {
    marginRight: 6,
    borderRadius: 60,
    flexDirection: 'row',
    alignItems: 'center',
    height: spacing.SCALE_36,
    minWidth: spacing.SCALE_106,
    justifyContent: 'space-around',
    backgroundColor: colors.shadow,
  },
});

const regex = {
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  password: /(?=.*[A-Z])(?=.*[\W_])(?=.*[a-z]).{8,}/,
};

const AddEditEmployeeScreenPresenter = ({ handleBackPress, formHeader, handleAddEmployee, employee }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [tags, setTags] = useState([]);
  const [singleTag, setSingleTag] = useState('');

  useEffect(() => {
    setValue('userTags', tags);
  }, [tags]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      firstName: employee ? employee.firstName : '',
      lastName: employee ? employee.lastName : '',
      email: employee ? employee.email : '',
      phoneNumber: employee ? employee.phone : '',
      password: '',
      employeeType: employee ? employee.userType : '',
      userTags: employee?.userTags ? employee?.userTags : tags,
    },
  });
  const onSubmit = data => {
    const { firstName, lastName, email, phoneNumber, password, employeeType, userTags } = data;
    handleAddEmployee({ firstName, lastName, email, phoneNumber, password, employeeType, userTags });
  };

  const addTags = () => {
    let arr = [singleTag, ...tags];
    setTags(arr);
    setSingleTag('');
  };
  const onRemove = index => {
    let arr = [...tags];
    arr.splice(index, 1);
    setTags(arr);
  };

  return (
    <ScrollView style={{ backgroundColor: colors.whiteBackground }}>
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <GoBackButton onPress={handleBackPress} />
          <Text style={styles.title}>{!formHeader ? 'Add Employee' : formHeader}</Text>
          {/* <IconButton onPress={() => {}}>
            <AntDesign name="edit" size={20} color={colors.primaryDarker} />
          </IconButton> */}
          {/* <View /> */}
        </View>
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
              editable={formHeader === 'Employee details' ? false : true}
              error={errors.firstName}
              leftImage={userIcon}
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
            required: '*LastName is required',
            minLength: {
              value: 3,
              message: '*Please enter valid lastName',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              onChangeText={onChange}
              error={errors.lastName}
              editable={formHeader === 'Employee details' ? false : true}
              leftImage={userIcon}
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
              editable={formHeader === 'Employee details' ? false : true}
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
              editable={formHeader === 'Employee details' ? false : true}
              onChangeText={onChange}
              keyboardType="numeric"
              error={errors.phoneNumber}
              leftImage={phoneIcon}
              placeholder={'Phone Number'}
              rightImage={errors.phoneNumber ? errorIcon : null}
              rightIconStyle={styles.rightIconStyle}
            />
          )}
        />
        {errors.phoneNumber && <ErrorMessage errors={errors} name="phoneNumber" alignment="center" />}
        {!formHeader && (
          <Controller
            name="password"
            control={control}
            rules={{
              required: '*Password is required',
              minLength: {
                value: 8,
                message: '*Please enter valid password',
              },
              pattern: {
                value: regex.password,
                message: '*Please enter valid password',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                onChangeText={onChange}
                editable={formHeader === 'Employee details' ? false : true}
                error={errors.password}
                leftImage={passwordIcon}
                placeholder={'Password'}
                secureTextEntry={showPassword}
                rightIconStyle={styles.rightIconStyle}
                rightImage={errors.password ? errorIcon : showPassword ? eyeOff : eye}
                onPressRightIcon={() => setShowPassword(!showPassword)}
              />
            )}
          />
        )}
        {errors.password && <ErrorMessage errors={errors} name="password" alignment="center" />}

        <Controller
          name="employeeType"
          control={control}
          rules={{
            required: '*Company size is required',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              onChangeText={onChange}
              editable={formHeader === 'Employee details' ? false : true}
              error={errors.employeeType}
              leftImage={userIcon}
              placeholder={'Admin/Employee'}
              rightImage={errors.employeeType ? errorIcon : null}
              rightIconStyle={styles.rightIconStyle}
            />
          )}
        />
        {errors.employeeType && <ErrorMessage errors={errors} name="employeeType" alignment="center" />}

        {/* <Controller
          name="userTags"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={singleTag}
              onBlur={onBlur}
              onChange={onChange}
              onChangeText={tag => setSingleTag(tag)}
              error={errors.userTags}
              editable={formHeader === 'Employee details' ? false : true}
              onPressRightIcon={addTags}
              leftImage={userIcon}
              placeholder={'User Tags'}
              rightImage={errors.userTags ? errorIcon : addIcon}
              rightIconStyle={styles.rightIconStyle}
            />
          )}
        />
        {errors.userTags && <ErrorMessage errors={errors} name="userTags" alignment="center" />} */}

        {/* <View style={{ marginTop: 12 }}>
          <FlatList
            horizontal
            data={tags}
            style={{ width: '100%' }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View style={styles.tagView}>
                <Text style={{ paddingLeft: 6, color: colors.primaryDarker }}>{item}</Text>
                <IconButton height={18} width={18} onPress={() => onRemove(index)}>
                  <AntDesign name="closecircle" size={16} color={colors.primaryDarker} />
                </IconButton>
              </View>
            )}
            contentContainerStyle={{ paddingTop: spacing.SCALE_10 }}
          />
        </View> */}

        <View style={{ marginTop: spacing.SCALE_18 }}>
          <BigButton
            onPress={handleSubmit(onSubmit)}
            color={colors.primaryDarker}
            borderWidth={1}
            disabled={!isValid}
            isLoading={false}
            loadingColor="white"
            borderColor={'transparent'}>
            <Text style={styles.btnText}>{formHeader === 'Employee details' ? 'Back' : 'Save'}</Text>
          </BigButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddEditEmployeeScreenPresenter;
