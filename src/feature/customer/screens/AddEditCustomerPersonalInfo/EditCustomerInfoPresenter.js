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
import writing from '../../../../../assets/images/writing.png';
import switchOn from '../../../../../assets/images/switch.png';
import switchOff from '../../../../../assets/images/switchOff.png';

const EditCustomerInfoPresenter = ({ handlePressGoBack, customerData }) => {
  const navigation = useNavigation();
  //### states
  const [emails, setEmails] = useState(customerData?.email || []);
  const [email, setEmail] = useState(customerData?.email[0] || '');
  const [additionalEmail, setAdditionalEmail] = useState(customerData?.email[1] || '');
  const [lastName, setLastName] = useState(customerData?.lastName || '');
  const [firstName, setFirstName] = useState(customerData?.firstName || '');
  const [homePhoneNumber, setHomePhoneNumber] = useState(customerData?.phone?.home || '');
  const [mobileNumber, setMobileNumber] = useState(customerData?.phone?.mobile || '');
  const [workNumber, setWorkNumber] = useState(customerData?.phone?.work || '');
  const [additionalNumber, setAdditionalNumber] = useState(customerData?.phone?.additional || '');
  const [notes, setNotes] = useState(customerData?.notes || '');
  const [notifications, setNotifications] = useState(customerData?.notifications || true);

  const [showAdditionalEmail, setShowAdditionalEmail] = useState(!!additionalEmail);
  const [showHomeNumber, setShowHomeNumber] = useState(!!homePhoneNumber);
  const [showWorkNumber, setShowWorkNumber] = useState(!!workNumber);
  const [showAdditionalNumber, setShowAdditionalNumber] = useState(!!additionalNumber);

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

  const unformatPhoneNumber = formattedValue => {
    const unformattedValue = formattedValue.replace(/\D+/g, '');
    return `+1${unformattedValue}`; // Assuming US phone numbers
  };

  const [formattedMobileNumber, setFormattedMobileNumber] = useState(
    mobileNumber ? formatPhoneNumber(mobileNumber.slice(2, 12)) : '',
  );
  const [formattedHomeNumber, setFormattedHomeNumber] = useState(
    homePhoneNumber ? formatPhoneNumber(homePhoneNumber.slice(2, 12)) : '',
  );
  const [formattedWorkNumber, setFormattedWorkNumber] = useState(
    workNumber ? formatPhoneNumber(workNumber.slice(2, 12)) : '',
  );
  const [formattedAdditionalNumber, setFormattedAdditionalNumber] = useState(
    additionalNumber ? formatPhoneNumber(additionalNumber.slice(2, 12)) : '',
  );

  useEffect(() => {
    setEmails([email, additionalEmail]);
  }, [email, additionalEmail]);

  const showNextNumberField = () => {
    if (!showHomeNumber) {
      setShowHomeNumber(true);
    } else if (!showWorkNumber) {
      setShowWorkNumber(true);
    } else if (!showAdditionalNumber) {
      setShowAdditionalNumber(true);
    }
  };

  const onPressNext = () => {
    const customerPersonalInfo = {
      firstName,
      lastName,
      email: emails,
      notes,
      notifications,
      phone: {
        home: homePhoneNumber,
        mobile: mobileNumber,
        work: workNumber,
        additional: additionalNumber,
      },
    };

    if (customerData) {
      navigation.navigate(SCREENS.ADD_EDIT_CUSTOMER_PERSONAL_ADDRESS, { customerPersonalInfo, customerData });
    } else {
      navigation.navigate(SCREENS.ADD_EDIT_CUSTOMER_PERSONAL_ADDRESS, { customerPersonalInfo });
    }
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
          <Text style={styles.headerText}>Customer info</Text>
        </View>
        <Input leftImage={icon} value={firstName} onChangeText={setFirstName} placeholder="First Name" />
        <Input leftImage={icon} value={lastName} onChangeText={setLastName} placeholder="Last Name" />
        <Input leftImage={emailIcon} value={email} onChangeText={setEmail} placeholder="Email" />
        {showAdditionalEmail ? (
          <Input
            leftImage={emailIcon}
            value={additionalEmail}
            onChangeText={setAdditionalEmail}
            placeholder="Additional Email"
          />
        ) : (
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginTop: 10,
              marginRight: 10,
            }}
            onPress={() => setShowAdditionalEmail(true)}>
            <Image style={styles.plusIcon} source={plusIcon} />
          </Pressable>
        )}

        <Input
          leftImage={phone}
          value={formattedMobileNumber}
          keyboardType="numeric"
          onChangeText={text => {
            setFormattedMobileNumber(formatPhoneNumber(text));
            setMobileNumber(unformatPhoneNumber(text));
          }}
          placeholder="Mobile Number"
        />

        {showHomeNumber ? (
          <Input
            leftImage={phone}
            value={formattedHomeNumber}
            keyboardType="numeric"
            onChangeText={text => {
              setFormattedHomeNumber(formatPhoneNumber(text));
              setHomePhoneNumber(unformatPhoneNumber(text));
            }}
            placeholder="Home Number"
          />
        ) : null}

        {showWorkNumber ? (
          <Input
            leftImage={phone}
            value={formattedWorkNumber}
            keyboardType="numeric"
            onChangeText={text => {
              setFormattedWorkNumber(formatPhoneNumber(text));
              setWorkNumber(unformatPhoneNumber(text));
            }}
            placeholder="Work Number"
          />
        ) : null}

        {showAdditionalNumber ? (
          <Input
            leftImage={phone}
            value={formattedAdditionalNumber}
            keyboardType="numeric"
            onChangeText={text => {
              setFormattedAdditionalNumber(formatPhoneNumber(text));
              setAdditionalNumber(unformatPhoneNumber(text));
            }}
            placeholder="Additional Number"
          />
        ) : null}

        {!showAdditionalNumber && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 10,
              marginRight: 10,
            }}>
            <Pressable onPress={showNextNumberField}>
              <Image style={styles.plusIcon} source={plusIcon} />
            </Pressable>
          </View>
        )}

        <Input leftImage={writing} value={notes} keyboardType="text" onChangeText={setNotes} placeholder="Notes" />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 10,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 30,
            marginBottom: 10,
          }}>
          <Text style={{ marginRight: 10, fontSize: 18 }}>Notifications</Text>
          {notifications ? (
            <Pressable onPress={() => setNotifications(false)}>
              <Image style={styles.switchIcon} source={switchOn} />
            </Pressable>
          ) : (
            <Pressable onPress={() => setNotifications(true)}>
              <Image style={styles.switchIcon} source={switchOff} />
            </Pressable>
          )}
        </View>
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
  switchIcon: {
    height: spacing.SCALE_20,
    width: spacing.SCALE_40,
    marginRight: spacing.SCALE_10,
  },
  addEmail: {
    color: colors.primary,
    fontSize: typography.FONT_SIZE_14,
  },
});
export default EditCustomerInfoPresenter;
