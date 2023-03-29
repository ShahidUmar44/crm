import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Input from '../../../../shared/form/Input';
import GoBackButton from '../../../../shared/buttons/GoBackButton';
import BigButton from '../../../../shared/buttons/BigButton';
import logo from '../../../../../assets/images/logo.png';
import cityIcon from '../../../../../assets/images/city.png';
import stateIcon from '../../../../../assets/images/state.png';
import crossIcon from '../../../../../assets/images/crossIcon.png';
import addressIcon from '../../../../../assets/images/address.png';
import locationIcon from '../../../../../assets/images/address.png';
import editPencil from '../../../../../assets/images/editPencil.png';
import hash from '../../../../../assets/images/hash.png';
import { colors, spacing, typography } from '../../../../theme';

export default function AutocompleteModal({ setShowAutocomplete, setFormattedAddress, handleSaveCustomer }) {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');

  const [postalCode, setPostalCode] = useState('');
  const [unit, setUnit] = useState('');
  const [googleAddress, setGoogleAddress] = useState('');

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

  // useEffect(() => {
  //   console.log('address', address);
  //   console.log('city', city);
  //   console.log('state', state);
  //   console.log('postalCode', postalCode);
  //   console.log('googleAddress', googleAddress);
  // }, [address, city, state, postalCode, googleAddress]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.headerView}>
            <View style={{ width: '30%' }}>
              <GoBackButton onPress={() => setShowAutocomplete(false)} />
            </View>

            <View style={{ width: '40%' }}>
              <Text style={styles.headerText}>Add Address</Text>
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
                  backgroundColor: colors.shadow,
                  height: 50,
                  fontSize: 16,
                  marginRight: 5,
                },
                listView: {
                  ...styles.listView,
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
                  width: '50%',
                }}
                onPress={handleSaveCustomer}>
                <Text
                  style={{
                    color: '#fbbf24',
                    fontSize: typography.FONT_SIZE_18,
                    fontWeight: 'bold',
                  }}>
                  Save
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

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
