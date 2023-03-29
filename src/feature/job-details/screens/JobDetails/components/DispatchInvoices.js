import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import { colors, spacing, typography } from '../../../../../theme';

import friendsIcon from '../../../../../../assets/images/friendsIcon.png';

const DispatchInvoices = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dipatchView}>
        <View style={styles.dispatchHeaderView}>
          <Text style={styles.header}>Dispatch to</Text>
        </View>
        <View style={styles.dispatchCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={styles.icon} source={friendsIcon} />
            <Text>My Employee</Text>
          </View>
          {data?.length > 0 &&
            data.map(item => {
              return (
                <View style={styles.employeeCard}>
                  <View>
                    <Text>{`${item.firstName} ${item.lastName}`}</Text>
                    <Text>{item.email}</Text>
                  </View>
                  <Text>
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
    paddingRight: spacing.SCALE_10,
  },
  header: {
    fontSize: typography.FONT_SIZE_16,
    color: colors.whiteBackground,
    paddingLeft: spacing.SCALE_10,
    paddingVertical: spacing.SCALE_10,
  },
  dispatchCard: {
    backgroundColor: colors.whiteBackground,
    marginHorizontal: spacing.SCALE_10,
    padding: spacing.SCALE_10,
    marginTop: spacing.SCALE_10,
    borderRadius: spacing.SCALE_6,
  },
  icon: {
    height: spacing.SCALE_30,
    width: spacing.SCALE_30,
    marginRight: spacing.SCALE_10,
  },
  employeeCard: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: spacing.SCALE_10,
    borderTopWidth: 1,
    borderColor: colors.primary,
    paddingVertical: spacing.SCALE_6,
  },
});
export default DispatchInvoices;
