import React from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';

import { colors, spacing, typography } from '../../../../../theme';
import * as Clipboard from 'expo-clipboard';

import friendsIcon from '../../../../../../assets/images/friendsIcon.png';
import personIcon from '../../../../../../assets/images/personIcon.png';
import userIcon from '../../../../../../assets/images/user.png';
import editIcon from '../../../../../../assets/images/edit-light.png';
import onlineIcon from '../../../../../../assets/images/globe-05.png';
import userProfileRight from '../../../../../../assets/images/user-profile-right.png';

const JobSourceDisplay = ({ data, setModal }) => {
  const handleCopyPhone = async phone => {
    await Clipboard.setStringAsync(phone);
    alert('Phone number copied to clipboard');
  };

  return (
    <View style={styles.container}>
      <View style={styles.dipatchView}>
        <View style={styles.dispatchHeaderView}>
          <Text style={styles.header}>Job Source</Text>
          <Pressable onPress={() => setModal(true)}>
            <Image style={styles.editIcon} source={editIcon} />
          </Pressable>
        </View>
        <View style={styles.dispatchCard}>
          {!data?.salesPerson && !data?.online && !data?.referral && (
            <>
              <View style={styles.employeeCard}>
                <Image style={styles.icon} source={userIcon} />
                <Text style={styles.text}>No Job Source</Text>
              </View>
            </>
          )}
          {data?.salesPerson && (
            <>
              <View style={styles.employeeCard}>
                <Image style={styles.icon} source={userIcon} />
                <View>
                  <Text
                    style={{
                      ...styles.text,
                      marginRight: spacing.SCALE_10,
                    }}>{`${data.salesPerson?.firstName} ${data.salesPerson?.lastName}`}</Text>
                </View>
                <Text style={styles.text} onLongPress={() => handleCopyPhone(data.salesPerson?.phone)}>
                  {'(' +
                    data.salesPerson?.phone.substring(2, 5) +
                    ') ' +
                    data.salesPerson?.phone.substring(5, 8) +
                    '-' +
                    data.salesPerson?.phone.substring(8, 12)}
                </Text>
              </View>
            </>
          )}

          <View>
            {data?.online && (
              <View style={styles.employeeCard}>
                <Image style={styles.icon} source={onlineIcon} />
                <Text style={styles.text}>{data.online ? 'Online' : ''}</Text>
              </View>
            )}
            {data?.referral && (
              <View style={styles.employeeCard}>
                <Image style={styles.icon} source={friendsIcon} />
                <Text style={styles.text}>{data.referral ? 'Referral' : ''}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.shadow,
    marginTop: spacing.SCALE_20,
    paddingBottom: spacing.SCALE_10,
  },
  dipatchView: {
    borderRadius: spacing.SCALE_4,
    backgroundColor: colors.shadow,
    width: '100%',
    paddingBottom: spacing.SCALE_4,
  },
  dispatchHeaderView: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: spacing.SCALE_4,
    borderTopRightRadius: spacing.SCALE_4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: spacing.SCALE_10,
  },
  header: {
    fontSize: typography.FONT_SIZE_16,
    color: colors.whiteBackground,
    paddingLeft: spacing.SCALE_10,
    paddingVertical: spacing.SCALE_10,
  },
  text: {
    fontSize: typography.FONT_SIZE_16,
  },
  dispatchCard: {
    backgroundColor: colors.whiteBackground,
    marginHorizontal: spacing.SCALE_20,
    padding: spacing.SCALE_10,
    marginTop: spacing.SCALE_20,
    borderRadius: spacing.SCALE_6,
    marginBottom: spacing.SCALE_10,
  },
  icon: {
    height: spacing.SCALE_20,
    width: spacing.SCALE_20,
    marginRight: spacing.SCALE_10,
  },
  editIcon: {
    height: spacing.SCALE_20,
    width: spacing.SCALE_20,
    marginRight: 0,
  },
  employeeCard: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-star',

    paddingVertical: spacing.SCALE_10,
  },
});
export default JobSourceDisplay;
