import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

import Input from '../../../../shared/form/Input';
import BigButton from '../../../../shared/buttons/BigButton';
import { colors, spacing, typography } from '../../../../theme';
import GoBackButton from '../../../../shared/buttons/GoBackButton';

import logo from '../../../../../assets/images/logo.png';

const CustomerNotePresenter = ({ handleBackPress, companyDetails, saveCustomer, customerData }) => {
  const [commentAboutUser, setcommentAboutUser] = useState(customerData ? customerData.notes : '');
  const [cutomernDetailsInformation, setCutomernDetailsInformation] = useState({});

  const onPressSave = () => {
    saveCustomer(cutomernDetailsInformation);
  };
  useEffect(() => {
    // if (customerData) {
    //   setCutomernDetailsInformation({ ...customerData, notes: commentAboutUser });
    // } else {
    // }
    setCutomernDetailsInformation({ ...companyDetails, notes: commentAboutUser });
  }, [commentAboutUser]);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerView}>
          <GoBackButton onPress={handleBackPress} />
        </View>
        <View style={styles.logoView}>
          <Image style={styles.logo} resizeMode="cover" source={logo} />
          <Text style={styles.headerText}> Have something else</Text>
        </View>
        <Input
          textAlignVertical="top"
          value={commentAboutUser}
          onChangeText={setcommentAboutUser}
          paddingTop={spacing.SCALE_10}
          height={spacing.SCALE_180}
          placeholder="Write comment..."
        />
        <View style={{ marginTop: spacing.SCALE_20 }}>
          <BigButton onPress={onPressSave}>
            <Text style={{ color: colors.text }}>Save</Text>
          </BigButton>
        </View>
      </ScrollView>
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
});
export default CustomerNotePresenter;
