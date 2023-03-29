import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  StyleSheet,
  SafeAreaView,
  Modal,
} from 'react-native';
import { setDoc, doc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../../utils/Firebase';

import { UserContext } from '../../../../context/UserContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colors, spacing, typography } from '../../../../theme';
import Input from '../../../../shared/form/Input';
import BigButton from '../../../../shared/buttons/BigButton';
import GoBackButton from '../../../../shared/buttons/GoBackButton';
import editPencil from '../../../../../assets/images/editPencil.png';
import writing from '../../../../../assets/images/writing.png';
import switchOn from '../../../../../assets/images/switch.png';
import switchOff from '../../../../../assets/images/switchOff.png';
import icon from '../../../../../assets/images/Icon.png';
import phone from '../../../../../assets/images/phone.png';
import emailIcon from '../../../../../assets/images/email.png';
import plusIcon from '../../../../../assets/images/plusIcon.png';
import AutocompleteModal from './AutocompleteModal';

const AddCustomerModal = ({ setCustomerModal, setSelectedCustomer }) => {
  const { userData } = useContext(UserContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [additionalEmail, setAdditionalEmail] = useState('');
  const [showAdditionalEmail, setShowAdditionalEmail] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [formattedMobileNumber, setFormattedMobileNumber] = useState('');
  const [homePhoneNumber, setHomePhoneNumber] = useState('');
  const [formattedHomeNumber, setFormattedHomeNumber] = useState('');
  const [workPhoneNumber, setWorkPhoneNumber] = useState('');
  const [formattedWorkNumber, setFormattedWorkNumber] = useState('');
  const [additionalPhoneNumber, setAdditionalPhoneNumber] = useState('');
  const [formattedAdditionalNumber, setFormattedAdditionalNumber] = useState('');
  const [showHomeNumber, setShowHomeNumber] = useState(false);
  const [showWorkNumber, setShowWorkNumber] = useState(false);
  const [showAdditionalNumber, setShowAdditionalNumber] = useState(false);
  const [notes, setNotes] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [formattedAddress, setFormattedAddress] = useState('');

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

  const showNextNumberField = () => {
    if (!showHomeNumber) {
      setShowHomeNumber(true);
    } else if (!showWorkNumber) {
      setShowWorkNumber(true);
    } else if (!showAdditionalNumber) {
      setShowAdditionalNumber(true);
    }
  };

  const handleSaveCustomer = async () => {
    console.log('update db with customer, and setSelectedCustomer');
    console.log('formattedAddress', formattedAddress);
    const businessId = userData.userData.businessId;
    const newCustomerRef = doc(collection(db, 'businesses', businessId, 'customers'));
    const newCustomer = {
      customerId: newCustomerRef.id,
      businessId,
      firstName,
      lastName,
      displayName: `${firstName} ${lastName}`,
      email: [email, additionalEmail],
      phone: {
        mobile: mobileNumber,
        home: homePhoneNumber,
        work: workPhoneNumber,
        additional: additionalPhoneNumber,
      },
      notes,
      notifications,
      address: [formattedAddress],
      dateAdded: serverTimestamp(),
      lastUpdated: serverTimestamp(),
    };
    setSelectedCustomer(newCustomer);
    try {
      await setDoc(newCustomerRef, newCustomer);
      setSelectedCustomer(newCustomer);
      setCustomerModal(false);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    setShowAutocomplete(false);
    setCustomerModal(false);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.headerView}>
              <View style={{ width: '30%' }}>
                <GoBackButton onPress={() => setCustomerModal(false)} />
              </View>

              <View style={{ width: '40%' }}>
                <Text style={styles.headerText}>Add Customer</Text>
              </View>
              <View
                style={{
                  width: '30%',
                  alignItems: 'flex-end',
                }}>
                <View
                  style={{
                    width: '70%',
                    alignItems: 'center',

                    borderRadius: 10,
                    padding: 10,
                  }}></View>
              </View>
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
                marginTop: spacing.SCALE_40,
                marginBottom: spacing.SCALE_20,
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

            {/* <Pressable
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 10,
                marginLeft: 10,
                marginRight: 10,
                marginTop: 30,
                marginBottom: 10,
              }}
              onPress={() => setShowAutocomplete(true)}>
              <Image style={{ height: 20, width: 20 }} source={plusIcon} />
              <Text style={{ fontSize: 18 }}>Add Address</Text>
            </Pressable> */}
            <View
              style={{
                marginTop: spacing.SCALE_20,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Pressable
                style={{
                  backgroundColor: colors.primary,
                  height: spacing.SCALE_60,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: spacing.SCALE_10,
                  width: '100%',
                }}
                onPress={() => setShowAutocomplete(true)}>
                <Text
                  style={{
                    color: '#fbbf24',
                    fontSize: typography.FONT_SIZE_18,
                    fontWeight: 'bold',
                  }}>
                  Next
                </Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      <Modal visible={showAutocomplete} animationType="slide">
        <AutocompleteModal
          setShowAutocomplete={setShowAutocomplete}
          setFormattedAddress={setFormattedAddress}
          handleSaveCustomer={handleSaveCustomer}
        />
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.SCALE_10,
    paddingTop: spacing.SCALE_20,
  },
  headerView: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.SCALE_10,
    paddingHorizontal: spacing.SCALE_10,
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
  dropdown: {
    width: '45%',
    borderWidth: 0.5,
    borderColor: colors.primary,
    borderRadius: spacing.SCALE_10,
    padding: spacing.SCALE_10,
    marginTop: spacing.SCALE_14,
  },
  leftIcon: {
    width: 17,
    height: 20,
    marginLeft: spacing.SCALE_16,
    marginTop: 15,
  },
  searchBoxWrapper: {
    height: 60,
    marginTop: spacing.SCALE_20,
    zIndex: 1000,
  },
  addressContainer: {
    alignItems: 'center',
    backgroundColor: colors.shadow,
    borderWidth: 0.5,
    borderColor: '#9ca3af',
    justifyContent: 'center',
    borderRadius: spacing.SCALE_6,
  },
  inputWrapper: {
    flex: 1, // Add this
    zIndex: 0,
  },
  listView: {
    position: 'absolute',
    zIndex: 99999,
    top: '100%',
    right: 0,
  },
  crossIcon: {
    height: spacing.SCALE_20,
    width: spacing.SCALE_20,
    marginRight: spacing.SCALE_6,
  },
});

export default AddCustomerModal;
