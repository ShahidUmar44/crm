import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Keyboard, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AppLogo from '../../../../shared/common/AppLogo';
import { colors, spacing } from '../../../../theme';

import PersonalInfoScreen from './steps/PersonalInfo';
import CompanyInfoScreen from './steps/CompanyInfo';
import PasswordScreen from './steps/Password';

import { SCREENS } from '../../../../constants';
import GoBackButton from '../../../../shared/buttons/GoBackButton';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const styles = StyleSheet.create({
  innerContainer: {
    paddingBottom: 20,
    alignItems: 'center',
    paddingTop: spacing.SCALE_10,
    flex: 1,
  },
  emailIcon: {
    width: spacing.SCALE_44,
    height: spacing.SCALE_44,
  },
  logoContainer: {
    marginTop: spacing.SCALE_10,
  },
  signupText: { textAlign: 'center', color: colors.primary },
  formContainer: {
    width: '100%',
    paddingHorizontal: spacing.SCALE_20,
    flex: 1,
  },
  backIcon: {
    position: 'absolute',
    top: spacing.SCALE_10,
    left: spacing.SCALE_10,
  },
});

const SignUpScreenPresenter = ({ signUp }) => {
  const navigation = useNavigation();
  const [stepNumber, setStepNumber] = useState(1);
  const [personalData, setPersonalData] = useState({});

  const handleBackPress = () => {
    navigation.goBack();
  };

  let personalDetails = data => {
    setPersonalData(data);
  };
  let companyDetails = data => {
    setPersonalData({ ...personalData, ...data });
  };
  let passwordDetails = data => {
    setPersonalData({ ...personalData, ...data });
  };
  const onSubmit = data => {
    signUp({ ...personalData, ...data });
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={115}>
        <ScrollView style={{ backgroundColor: colors.whiteBackground, flex: 1 }} keyboardShouldPersistTaps="always">
          <View style={styles.innerContainer}>
            <View style={styles.backIcon}>
              <GoBackButton onPress={handleBackPress} />
            </View>
            <View style={styles.logoContainer}>
              <AppLogo />
            </View>
            <View style={styles.formContainer}>
              {stepNumber === 1 && (
                <PersonalInfoScreen onStepNumber={setStepNumber} personalDetails={personalDetails} />
              )}
              {stepNumber === 2 && <CompanyInfoScreen onStepNumber={setStepNumber} companyDetails={companyDetails} />}
              {stepNumber === 3 && <PasswordScreen passwordDetails={passwordDetails} onSubmit={onSubmit} />}
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Pressable>
  );
};

export default SignUpScreenPresenter;
