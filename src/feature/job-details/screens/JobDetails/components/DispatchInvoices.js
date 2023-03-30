import React from 'react';
import { View, StyleSheet, Text, Image, Pressable } from 'react-native';

import { colors, spacing, typography } from '../../../../../theme';
import * as Clipboard from 'expo-clipboard';

import friendsIcon from '../../../../../../assets/images/friendsIcon.png';
import personIcon from '../../../../../../assets/images/personIcon.png';
import userIcon from '../../../../../../assets/images/user.png';
import editIcon from '../../../../../../assets/images/edit-light.png';

const DispatchInvoices = ({ data, setModal }) => {
  const handleCopyPhone = async phone => {
    await Clipboard.setStringAsync(phone);
    alert('Phone number copied to clipboard');
  };

  return (
    <View style={styles.container}>
      <View style={styles.dipatchView}>
        <View style={styles.dispatchHeaderView}>
          <Text style={styles.header}>Dispatched to</Text>
          <Pressable onPress={() => setModal(true)}>
            <Image style={styles.editIcon} source={editIcon} />
          </Pressable>
        </View>
        <View style={styles.dispatchCard}>
          {data?.length > 0 &&
            data.map((item, key) => {
              return (
                <View style={styles.employeeCard} key={key}>
                  <Image style={styles.icon} source={userIcon} />
                  <View>
                    <Text
                      style={{
                        ...styles.text,
                        marginRight: spacing.SCALE_10,
                      }}>{`${item.firstName} ${item.lastName}`}</Text>
                  </View>
                  <Text style={styles.text} onLongPress={() => handleCopyPhone(item.phone)}>
                    {'(' +
                      item?.phone.substring(2, 5) +
                      ') ' +
                      item?.phone.substring(5, 8) +
                      '-' +
                      item?.phone.substring(8, 12)}
                  </Text>
                </View>
              );
            })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.shadow,
    marginTop: spacing.SCALE_10,
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
    marginHorizontal: spacing.SCALE_10,
    padding: spacing.SCALE_10,
    marginTop: spacing.SCALE_10,
    borderRadius: spacing.SCALE_6,
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
export default DispatchInvoices;
