import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';

import Input from '../../../../shared/form/Input';
import BigButton from '../../../../shared/buttons/BigButton';
import IconButton from '../../../../shared/buttons/IconButton';
import { colors, spacing, typography } from '../../../../theme';
import ErrorMessage from '../../../../shared/form/ErrorMessage';
import GoBackButton from '../../../../shared/buttons/GoBackButton';
import { RadioButton } from 'react-native-paper';
import ColorDropdown from '../../components/ColorDropdown';

import { FontAwesome } from '@expo/vector-icons';
import eye from '@assets/images/eye.png';
import eyeOff from '@assets/images/eye-off.png';
import userIcon from '@assets/images/person.png';
import phoneIcon from '@assets/images/phone.png';
import errorIcon from '@assets/images/error.png';
import emailIcon from '@assets/images/email-icon.png';
import passwordIcon from '@assets/images/password-icon.png';

const plans = [
  {
    id: '1',
    name: 'Admin',
    description: 'Can manage all areas.',
  },
  {
    id: '2',
    name: 'Manager',
    description: 'Can edit job, team, and customer info. Recommended for team leads or office staff.',
  },
  {
    id: '3',
    name: 'Salesperson',
    description: 'Can edit job and customer info. Recommended for salespeople.',
  },
  {
    id: '4',
    name: 'Field Tech',
    description: 'Can view their own jobs, schedule, mark work complete, and add notes. Recommended for field techs.',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 10,
    alignSelf: 'center',
    paddingHorizontal: '5%',
  },
  title: {
    marginRight: '30%',
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
  radioButton: {
    marginBottom: 10,
  },
  radioButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelContainer: {
    width: '80%',
  },
  planName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  planDescription: {
    fontSize: 12,
  },
  radioContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});

// const regex = {
//   email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
//   password: /(?=.*[A-Z])(?=.*[\W_])(?=.*[a-z]).{8,}/,
// };

const regex = {
  email:
    /^[a-zA-Z0-9.!#$%&'*+\-/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  password: /(?=.*[A-Z])(?=.*[\W_])(?=.*[a-z]).{8,}/,
};

const AddEditEmployeeScreenPresenter = ({ handleBackPress, formHeader, handleAddEmployee, employee, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(employee ? employee.userType : 'Admin');
  const [phoneNumber, setPhoneNumber] = useState(employee ? employee.phone : '');
  const [selectedColor, setSelectedColor] = useState(employee ? employee.color : { label: 'Blue', value: '#3b82f6' });

  const formatPhoneNumber = inputValue => {
    const cleanValue = inputValue.replace(/\D+/g, '');
    const limitedValue = cleanValue.slice(0, 10);
    const match = limitedValue.match(/^(\d{1,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      const formattedNumber = `${match[1] ? '(' + match[1] : ''}${match[2] ? ') ' + match[2] : ''}${
        match[3] ? '-' + match[3] : ''
      }`;
      return formattedNumber.trim();
    }
    return inputValue;
  };
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState(
    phoneNumber ? formatPhoneNumber(phoneNumber.slice(2, 12)) : '',
  );
  const unformatPhoneNumber = formattedValue => {
    const unformattedValue = formattedValue.replace(/\D+/g, '');
    return `+1${unformattedValue}`; // Assuming US phone numbers
  };

  const handlePlanChange = value => {
    setSelectedPlan(value);
  };

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
      password: '',
    },
  });
  const onSubmit = data => {
    const { firstName, lastName, email, password } = data;

    if (!selectedPlan) {
      return;
    }
    handleAddEmployee({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      employeeType: selectedPlan,
      color: selectedColor,
    });
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

        {/* <Controller
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
        /> */}
        <Input
          leftImage={phoneIcon}
          value={formattedPhoneNumber}
          keyboardType="numeric"
          onChangeText={text => {
            setFormattedPhoneNumber(formatPhoneNumber(text));
            setPhoneNumber(unformatPhoneNumber(text));
          }}
          placeholder="Mobile Number"
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
                message: '*Password needs to have at least 1 uppercase, 1 lowercase, 1 number and 1 special character',
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

        <ColorDropdown selectedColor={selectedColor} setSelectedColor={setSelectedColor} />

        <View style={styles.radioContainer}>
          <RadioButton.Group onValueChange={value => handlePlanChange(value)} value={selectedPlan}>
            {plans.map(plan => (
              <Pressable key={plan.id} onPress={() => handlePlanChange(plan.name)} style={styles.radioButton}>
                <View style={styles.radioButtonRow}>
                  <View style={styles.labelContainer}>
                    <Text style={styles.planName}>{plan.name}</Text>
                    <Text style={styles.planDescription}>{plan.description}</Text>
                  </View>
                  <RadioButton value={plan.name} />
                </View>
              </Pressable>
            ))}
          </RadioButton.Group>
        </View>

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
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.btnText}>{formHeader === 'Employee details' ? 'Back' : 'Save'}</Text>
            )}
          </BigButton>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddEditEmployeeScreenPresenter;
