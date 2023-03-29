import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { SCREENS } from '../../../../constants';
import Input from '../../../../shared/form/Input';
import BigButton from '../../../../shared/buttons/BigButton';
import { colors, spacing, typography } from '../../../../theme';
import GoBackButton from '../../../../shared/buttons/GoBackButton';

import logo from '../../../../../assets/images/logo.png';
import icon from '../../../../../assets/images/Icon.png';
import phone from '../../../../../assets/images/phone.png';
import emailIcon from '../../../../../assets/images/email.png';
import plusIcon from '../../../../../assets/images/plusIcon.png';
import crossIcon from '../../../../../assets/images/crossIcon.png';
import editPencil from '../../../../../assets/images/editPencil.png';

const AddEditCustomerPersonalInfoPresenter = ({ handlePressGoBack, customerData }) => {
  const navigation = useNavigation();
  //### states
  const [email, setEmail] = useState(customerData ? customerData.email[0] : '');
  const [lastName, setLastName] = useState(customerData ? customerData.lastName : '');
  const [firstName, setFirstName] = useState(customerData ? customerData.firstName : '');
  const [phoneNumber, setPhoneNumber] = useState(customerData ? customerData.phone.home : '');
  const [mobileNumber, setmobileNumber] = useState(customerData ? customerData.phone.mobile : '');
  const [cutomerPersonalInfo, setCutomerPersonalInfo] = useState({});
  const [emailField, setEmailField] = useState(customerData ? customerData?.email?.map(item => item) : []);
  const [workNumber, setWorkNumber] = useState(customerData ? customerData.phone.work : '');
  const [numberFields, setNumberFields] = useState(customerData ? customerData.phone.additional.map(item => item) : []);

  const addEmailField = () => {
    const newEmailFields = [...emailField, { email: '' }];
    setEmailField(newEmailFields);
  };

  const removeEmailField = index => {
    emailField.splice(index, 1);
    setEmailField([...emailField]);
  };

  const addNumberField = () => {
    const newNumberField = [...numberFields, { additionalNumber: '' }];
    setNumberFields(newNumberField);
  };
  const removeNumberField = index => {
    numberFields.splice(index, 1);
    setNumberFields([...numberFields]);
  };

  const onPressNext = () => {
    if (customerData) {
      navigation.navigate(SCREENS.ADD_EDIT_CUSTOMER_PERSONAL_ADDRESS, { cutomerPersonalInfo, customerData });
    } else {
      navigation.navigate(SCREENS.ADD_EDIT_CUSTOMER_PERSONAL_ADDRESS, { cutomerPersonalInfo });
    }
  };
  useEffect(() => {
    setCutomerPersonalInfo({
      firstName,
      lastName,
      email: [email, ...emailField],
      phone: {
        home: phoneNumber,
        mobile: mobileNumber,
        work: workNumber,
        additional: numberFields,
      },
    });
  }, [firstName, lastName, email, emailField, phoneNumber, mobileNumber, workNumber, numberFields]);

  const renderEmailFields = () => {
    return emailField?.map((field, index) => {
      return (
        <View key={index}>
          <Input
            leftImage={emailIcon}
            value={field.value}
            rightIconStyle={{ height: spacing.SCALE_20 }}
            onChangeText={text => {
              const newEmailFields = [...emailField];
              newEmailFields[index] = text;
              setEmailField(newEmailFields);
            }}
            placeholder="Email"
            rightImage={crossIcon}
            onPressRightIcon={() => removeEmailField(index)}
          />
        </View>
      );
    });
  };

  const renderNumberFields = () => {
    return numberFields?.map((field, index) => {
      return (
        <View key={index}>
          <Input
            leftImage={emailIcon}
            value={field.value}
            keyboardType="numeric"
            rightIconStyle={{ height: spacing.SCALE_20 }}
            onChangeText={text => {
              const newNumberField = [...numberFields];
              newNumberField[index] = text;
              setNumberFields(newNumberField);
            }}
            placeholder="Additional Number"
            rightImage={crossIcon}
            onPressRightIcon={() => removeNumberField(index)}
          />
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerView}>
          <GoBackButton onPress={handlePressGoBack} />
          <Image style={styles.editIcon} resizeMode="contain" source={editPencil} />
        </View>
        <View style={styles.logoView}>
          <Image style={styles.logo} resizeMode="cover" source={logo} />
          <Text style={styles.headerText}>Add customer personal Info</Text>
        </View>
        <Input leftImage={icon} value={firstName} onChangeText={setFirstName} placeholder="First Name" />
        <Input leftImage={icon} value={lastName} onChangeText={setLastName} placeholder="Last Name" />
        <Input leftImage={emailIcon} value={email} onChangeText={setEmail} placeholder="Email" />
        <Pressable
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.SCALE_6 }}
          onPress={addEmailField}>
          <Image style={styles.plusIcon} source={plusIcon} />
          <Text style={styles.addEmail}>Add email</Text>
        </Pressable>
        {renderEmailFields()}
        <Input
          leftImage={phone}
          value={phoneNumber}
          keyboardType="numeric"
          onChangeText={setPhoneNumber}
          placeholder="Phone Number"
        />
        <Input
          leftImage={phone}
          value={mobileNumber}
          keyboardType="numeric"
          onChangeText={setmobileNumber}
          placeholder="Mobile Number"
        />
        <Input
          leftImage={phone}
          value={workNumber}
          keyboardType="numeric"
          onChangeText={setWorkNumber}
          placeholder="Work Number"
        />
        <Pressable
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.SCALE_6 }}
          onPress={addNumberField}>
          <Image style={styles.plusIcon} source={plusIcon} />
          <Text style={styles.addEmail}>Add Number</Text>
        </Pressable>
        {renderNumberFields()}
        <View style={{ marginTop: spacing.SCALE_20 }}>
          <BigButton onPress={onPressNext}>
            <Text style={{ color: colors.text }}>Next</Text>
          </BigButton>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.SCALE_10,
    paddingTop: spacing.SCALE_10,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editIcon: {
    height: spacing.SCALE_20,
    width: spacing.SCALE_20,
  },
  logoView: {
    alignItems: 'center',
  },
  logo: {
    height: spacing.SCALE_200,
    width: spacing.SCALE_200,
  },
  headerText: {
    fontSize: typography.FONT_SIZE_20,
    color: colors.primary,
  },
  plusIcon: {
    height: spacing.SCALE_16,
    width: spacing.SCALE_16,
    marginRight: spacing.SCALE_6,
    marginLeft: spacing.SCALE_10,
  },
  addEmail: {
    color: colors.primary,
    fontSize: typography.FONT_SIZE_14,
  },
});
export default AddEditCustomerPersonalInfoPresenter;
