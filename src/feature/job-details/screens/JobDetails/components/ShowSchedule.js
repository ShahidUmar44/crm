import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import { colors, spacing, typography } from '../../../../../theme';
import editIcon from '../../../../../../assets/images/edit-light.png';
import moment from 'moment';

export default function ShowSchedule({ setShowSchedule, start, end }) {
  // format the start date using moment so it looks like Wednesday 3/29/2023, 12:00 PM
  const formattedStartDate = moment(start).format('dddd, MMMM Do YYYY, h:mm A');
  const formattedEndDate = moment(end).format('dddd, MMMM Do YYYY, h:mm A');

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Scheduled</Text>
        <Pressable onPress={() => setShowSchedule(true)}>
          <Image style={{ ...styles.icon }} source={editIcon} />
        </Pressable>
      </View>
      <View style={styles.infoBox}>
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ fontSize: typography.FONT_SIZE_16, fontWeight: 'bold' }}>Start</Text>
          <Text style={{ ...styles.infoText, paddingTop: 5 }}>{formattedStartDate}</Text>
        </View>
        <View style={{ flexDirection: 'column', paddingTop: spacing.SCALE_10 }}>
          <Text style={{ fontSize: typography.FONT_SIZE_16, fontWeight: 'bold' }}>End</Text>
          <Text style={{ ...styles.infoText, paddingTop: 5 }}>{formattedEndDate}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: spacing.SCALE_4,
    marginTop: spacing.SCALE_20,
    backgroundColor: colors.shadow,
    width: '100%',
    paddingBottom: spacing.SCALE_10,
  },
  headerView: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: spacing.SCALE_4,
    borderTopRightRadius: spacing.SCALE_4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: spacing.SCALE_10,
  },
  headerText: {
    fontSize: typography.FONT_SIZE_16,
    color: colors.whiteBackground,
    paddingLeft: spacing.SCALE_10,
    paddingVertical: spacing.SCALE_10,
  },
  icon: {
    height: spacing.SCALE_20,
    width: spacing.SCALE_20,
  },
  infoBox: {
    backgroundColor: colors.whiteBackground,

    flexDirection: 'column',
    marginHorizontal: spacing.SCALE_10,
    marginTop: spacing.SCALE_10,
    padding: spacing.SCALE_10,
    borderRadius: spacing.SCALE_6,
  },
  infoText: {
    fontSize: typography.FONT_SIZE_16,
    color: '#111827',
    fontFamily: typography.primary,
  },
});
