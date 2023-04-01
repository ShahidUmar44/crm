import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

import Input from '../../../../../shared/form/Input';
import { colors, spacing, typography } from '../../../../../theme';

import editIcon from '../../../../../../assets/images/edit-light.png';

const Notes = ({ notes, setModal }) => {
  return (
    <View style={styles.container}>
      <View style={styles.jobSourceView}>
        <View style={styles.headerView}>
          <Text style={styles.header}>Private Notes</Text>
          <Pressable onPress={() => setModal(true)}>
            <Image style={styles.editIcon} source={editIcon} />
          </Pressable>
        </View>
        <View style={styles.dispatchCard}>
          <View>
            <Text style={[{ fontSize: typography.FONT_SIZE_16 }, !notes && { color: '#9ca3af' }]}>
              {notes ? notes : 'Notes...'}
            </Text>
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
  },
  jobSourceView: {
    borderRadius: spacing.SCALE_4,
    marginTop: spacing.SCALE_20,
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
    alignItems: 'center',
    paddingRight: spacing.SCALE_10,
  },
  header: {
    fontSize: typography.FONT_SIZE_16,
    color: colors.whiteBackground,
    paddingLeft: spacing.SCALE_10,
    paddingVertical: spacing.SCALE_10,
  },
  noteBox: {
    backgroundColor: colors.whiteBackground,
    marginHorizontal: '5%',
    borderRadius: 5,
    alignItems: 'center',
    padding: spacing.SCALE_10,
    marginTop: spacing.SCALE_10,
  },
  icon: {
    height: spacing.SCALE_20,
    width: spacing.SCALE_20,
    marginRight: spacing.SCALE_10,
  },
  noteHeading: {
    fontSize: typography.FONT_SIZE_16,
  },
  noteHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.SCALE_10,
  },
  dispatchCard: {
    backgroundColor: colors.whiteBackground,
    marginHorizontal: spacing.SCALE_20,
    padding: spacing.SCALE_10,
    paddingVertical: spacing.SCALE_20,
    marginTop: spacing.SCALE_20,
    borderRadius: spacing.SCALE_6,
    marginBottom: spacing.SCALE_20,
  },
  editIcon: {
    height: spacing.SCALE_20,
    width: spacing.SCALE_20,
    marginRight: 0,
  },
});
export default Notes;
