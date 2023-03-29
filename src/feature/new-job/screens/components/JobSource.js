import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { AppContext } from '../../../../context/AppContext';
import DropDown from '../../../../shared/drop-down/DropDown';
import { colors, spacing, typography } from '../../../../theme';

import onlineIcon from '../../../../../assets/images/globe-05.png';
import friendsIcon from '../../../../../assets/images/friendsIcon.png';
import userProfileRight from '../../../../../assets/images/user-profile-right.png';

const JobSource = ({ data, leadSource, onSelect, defaultButtonText }) => {
  const { online, setOnline, referral, setReferral } = useContext(AppContext);
  useFocusEffect(
    React.useCallback(() => {
      if (leadSource) {
        setOnline(leadSource?.online);
        setReferral(leadSource?.referral);
      }
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.jobSourceView}>
        <View style={styles.headerView}>
          <Text style={styles.header}>Job Source</Text>
        </View>
        <View style={{ paddingVertical: spacing.SCALE_20, paddingLeft: 7, paddingRight: 14 }}>
          <DropDown
            buttonTextStyle={{ fontSize: typography.FONT_SIZE_14 }}
            data={data}
            defaultButtonText={defaultButtonText}
            leftIcon={friendsIcon}
            onSelect={onSelect}
          />
          <View style={styles.radioButtonsView}>
            <Pressable onPress={() => setOnline(!online)} style={styles.oneRadioButtoView}>
              <View
                style={{
                  ...styles.radioButton,
                  backgroundColor: online ? colors.primary : colors.mediumGrey,
                }}></View>
              <Image style={styles.icon} resizeMode="contain" source={onlineIcon} />
              <Text>Online</Text>
            </Pressable>
            <Pressable onPress={() => setReferral(!referral)} style={styles.oneRadioButtoView}>
              <View
                style={{
                  ...styles.radioButton,
                  backgroundColor: referral ? colors.primary : colors.mediumGrey,
                }}></View>
              <Image style={styles.icon} resizeMode="contain" source={userProfileRight} />
              <Text>Referral</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: spacing.SCALE_10,
    backgroundColor: colors.shadow,
    paddingBottom: spacing,
  },
  jobSourceView: {
    borderRadius: spacing.SCALE_4,
    backgroundColor: colors.shadow,
    width: '100%',
    paddingBottom: spacing.SCALE_4,
  },
  headerView: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: spacing.SCALE_4,
    borderTopRightRadius: spacing.SCALE_4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: spacing.SCALE_10,
  },
  header: {
    fontSize: typography.FONT_SIZE_16,
    color: colors.whiteBackground,
    paddingLeft: spacing.SCALE_10,
    paddingVertical: spacing.SCALE_10,
  },
  radioButtonsView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.SCALE_16,
  },
  radioButton: {
    height: spacing.SCALE_20,
    width: spacing.SCALE_20,
    backgroundColor: 'red',
    borderRadius: spacing.SCALE_50,
  },
  oneRadioButtoView: {
    flexDirection: 'row',
  },
  icon: {
    height: spacing.SCALE_20,
    width: spacing.SCALE_20,
    marginHorizontal: spacing.SCALE_10,
  },
  inputView: {
    backgroundColor: colors.whiteBackground,
    height: spacing.SCALE_50,
    borderRadius: spacing.SCALE_6,
    width: '90%',
    marginHorizontal: '5%',
    marginTop: spacing.SCALE_10,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});

export default JobSource;
