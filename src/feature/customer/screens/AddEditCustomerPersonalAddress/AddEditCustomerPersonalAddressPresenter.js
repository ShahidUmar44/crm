import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { updateDoc, collection, doc, serverTimestamp, setDoc } from '@firebase/firestore';
import { db } from '../../../../utils/Firebase';
import { UserContext } from '../../../../context/UserContext';

import { SCREENS } from '../../../../constants';
import Input from '../../../../shared/form/Input';
import BigButton from '../../../../shared/buttons/BigButton';
import { colors, spacing, typography } from '../../../../theme';
import GoBackButton from '../../../../shared/buttons/GoBackButton';

import logo from '../../../../../assets/images/logo.png';
import cityIcon from '../../../../../assets/images/city.png';
import stateIcon from '../../../../../assets/images/state.png';
import crossIcon from '../../../../../assets/images/crossIcon.png';
import addressIcon from '../../../../../assets/images/address.png';
import locationIcon from '../../../../../assets/images/address.png';
import editPencil from '../../../../../assets/images/editPencil.png';
import hash from '../../../../../assets/images/hash.png';

const AddEditCustomerPersonalAddressPresenter = ({ handleBackPress, customerPersonalInfo, customerData }) => {
  const { userData } = useContext(UserContext);
  const navigation = useNavigation();
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState(customerData?.address?.[0] || '');
  const [formattedAddress, setFormattedAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [unit, setUnit] = useState('');
  const [customerAddress, setCustomerAddress] = useState({});

  const [indexToEdit, setIndexToEdit] = useState(null);
  const [googleAddress, setGoogleAddress] = useState('');
  const [nextButton, setNextButton] = useState(false);

  const onPressSave = async () => {
    if (customerData) {
      const updatedCustomerData = {
        ...customerData,
        ...customerPersonalInfo,
        address: [formattedAddress],
        lastUpdated: serverTimestamp(),
      };
      const customerRef = doc(db, 'businesses', userData.userData.businessId, 'customers', customerData.customerId);
      await updateDoc(customerRef, updatedCustomerData);
      navigation.navigate(SCREENS.CUSTOMERS_LIST);
    } else {
      console.log('no previous customer data');
      console.log('customerPersonalInfo', customerPersonalInfo);
      console.log('customerAddress', formattedAddress);
      const newCustomerRef = doc(collection(db, 'businesses', userData.userData.businessId, 'customers'));
      const newCustomerData = {
        ...customerPersonalInfo,
        address: [formattedAddress],
        customerId: newCustomerRef.id,
        businessId: userData.userData.businessId,
        lastUpdated: serverTimestamp(),
        dateAdded: serverTimestamp(),
        displayName: `${customerPersonalInfo.firstName} ${customerPersonalInfo.lastName}`,
      };
      await setDoc(newCustomerRef, newCustomerData);
      navigation.navigate(SCREENS.CUSTOMERS_LIST);
    }
  };

  useEffect(() => {
    if (address && !city && !state && !postalCode) {
      const updatedAddress = `${address}`;
      setFormattedAddress(updatedAddress);
      console.log('updatedAddress', updatedAddress);
    } else {
      const updatedAddress = `${address}, ${unit ? unit + ', ' : ''}${city ? city + ', ' : ''} ${
        state ? state + ', ' : ''
      } ${postalCode}`;
      setFormattedAddress(updatedAddress);
      console.log('updatedAddress', updatedAddress);
    }
  }, [address, unit, city, state, postalCode]);

  useEffect(() => {
    console.log('address', address);
    console.log('city', city);
    console.log('state', state);
    console.log('postalCode', postalCode);
    console.log('googleAddress', googleAddress);
  }, [address, city, state, postalCode, googleAddress]);
  /*
   ** Main Return
   */
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.headerView}>
          <GoBackButton onPress={handleBackPress} />
          <Image style={styles.editIcon} resizeMode="contain" source={editPencil} />
        </View>
        <View style={styles.logoView}>
          <Text style={styles.headerText}> Customer Address</Text>
        </View>
        <View style={styles.searchBoxWrapper}>
          <GooglePlacesAutocomplete
            placeholder="Google Search..."
            fetchDetails={true}
            textInputProps={{
              value: googleAddress,
              onChangeText: text => setGoogleAddress(text),
            }}
            onPress={(data, details) => {
              console.log('data', data);
              console.log('details', details);
              if (details) {
                const addressComponents = details.address_components;
                const formattedAddress = details.formatted_address;

                let streetAddress = '';
                let city = '';
                let state = '';
                let postalCode = '';
                let unit = '';

                for (const component of addressComponents) {
                  const componentType = component.types[0];

                  switch (componentType) {
                    case 'street_number':
                      streetAddress += component.long_name;
                      break;
                    case 'route':
                      streetAddress += ' ' + component.long_name;
                      break;
                    case 'locality':
                      city = component.long_name;
                      break;
                    case 'administrative_area_level_1':
                      state = component.short_name;
                      break;
                    case 'postal_code':
                      postalCode = component.long_name;
                      break;
                    case 'subpremise':
                      unit = component.long_name;
                      break;
                  }
                }

                setAddress(streetAddress.trim());
                setUnit(unit);
                setCity(city);
                setState(state);
                setPostalCode(postalCode);
                setGoogleAddress(formattedAddress);
              }
            }}
            query={{
              key: 'AIzaSyBqJDkyWdb21uklLpw3riZEk0DnsQ8JVRk',
              language: 'en',
            }}
            renderLeftButton={() => {
              return <Image style={styles.leftIcon} source={locationIcon} />;
            }}
            styles={{
              container: styles.addressContainer,

              textInput: {
                // Update this style
                backgroundColor: colors.shadow,
                height: 50,
                fontSize: 16,

                marginRight: 5,
              },
              listView: {
                ...styles.listView,
                zIndex: 1600,
              },
            }}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Input leftImage={locationIcon} value={address} onChangeText={setAddress} placeholder="Address" />
          <Input leftImage={hash} value={unit} onChangeText={setUnit} placeholder="Unit" />
          <Input leftImage={cityIcon} value={city} onChangeText={setCity} placeholder="City" />
          <Input leftImage={stateIcon} value={state} onChangeText={setState} placeholder="state" />
          <Input
            leftImage={cityIcon}
            value={postalCode}
            keyboardType={'numeric'}
            onChangeText={setPostalCode}
            placeholder="postal code"
          />
          {/* <View style={{ marginTop: spacing.SCALE_20, justifyContent: 'flex-end', flexDirection: 'row' }}>
            <BigButton onPress={()=>console.log("add")} width={spacing.SCALE_120} height={spacing.SCALE_40}>
              <Text style={{ color: colors.text }}>{indexToEdit !== null ? 'Save' : 'Add address'}</Text>
            </BigButton>
          </View> */}
          <View style={{ marginTop: spacing.SCALE_20 }}>
            <BigButton onPress={onPressSave}>
              <Text style={{ color: colors.text }}>Save</Text>
            </BigButton>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    zIndex: 1500,
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
  renderAddressContainer: {
    backgroundColor: colors.lightColor,
    borderRadius: spacing.SCALE_6,
    borderColor: '#4b5563',
    padding: spacing.SCALE_6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.SCALE_10,
    marginTop: spacing.SCALE_10,
    alignItems: 'center',
  },
  crossIcon: {
    height: spacing.SCALE_20,
    width: spacing.SCALE_20,
    marginRight: spacing.SCALE_6,
  },
});
export default AddEditCustomerPersonalAddressPresenter;
