import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Pressable } from 'react-native';

import Input from '../form/Input';
import { colors, spacing, typography } from '../../theme';

import tagIcon from '../../../assets/images/tagIcon.png';
import plusIcon from '../../../assets/images/plusIcon.png';
import crossIcon from '../../../assets/images/crossIcon.png';

const JobNotes = ({ onChangeText, value }) => {
  return (
    <View style={{ ...styles.ListItemView, marginBottom: spacing.SCALE_10 }}>
      <View style={styles.contactInfoHeaderView}>
        <Text style={styles.contactInfoHeader}>Notes</Text>
      </View>
      <View style={styles.innerListItemView}>
        <Input onChangeText={onChangeText} placeholder="Note..." value={value} disabled={!value ? true : false} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ListItemView: {
    marginTop: spacing.SCALE_10,
    borderRadius: spacing.SCALE_4,
    backgroundColor: colors.shadow,
    paddingBottom: spacing.SCALE_10,
  },
  contactInfoHeaderView: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: spacing.SCALE_4,
    borderTopRightRadius: spacing.SCALE_4,
  },
  contactInfoHeader: {
    fontSize: typography.FONT_SIZE_16,
    color: colors.whiteBackground,
    paddingLeft: spacing.SCALE_10,
    paddingVertical: spacing.SCALE_10,
  },
  innerListItemView: {
    marginHorizontal: spacing.SCALE_10,
    paddingHorizontal: spacing.SCALE_10,
    marginTop: spacing.SCALE_10,
    marginBottom: spacing.SCALE_20,
    borderRadius: spacing.SCALE_6,
  },
  crossIcon: {
    height: spacing.SCALE_16,
    width: spacing.SCALE_16,
    marginLeft: spacing.SCALE_10,
  },
});
export default JobNotes;
