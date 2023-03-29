import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Pressable } from 'react-native';

import Input from '../form/Input';
import { colors, spacing, typography } from '../../theme';

import tagIcon from '../../../assets/images/tagIcon.png';
import plusIcon from '../../../assets/images/plusIcon.png';
import crossIcon from '../../../assets/images/crossIcon.png';

const JobTags = ({ onChangeText, onRemove, data, onPress, value }) => {
  return (
    <View style={{ ...styles.ListItemView, marginBottom: spacing.SCALE_10 }}>
      <View style={styles.contactInfoHeaderView}>
        <Text style={styles.contactInfoHeader}>Job tags</Text>
      </View>
      <View style={styles.innerListItemView}>
        <Input
          rightImage={plusIcon}
          leftImage={tagIcon}
          onChangeText={onChangeText}
          placeholder="User Tags"
          onPressRightIcon={onPress}
          value={value}
          disabled={!value ? true : false}
        />
        <ScrollView
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginVertical: spacing.SCALE_10 }}>
          {data.map(item => {
            return (
              <View style={styles.keywordsView}>
                <Text>{item.keywordText}</Text>
                <Pressable onPress={onRemove}>
                  <Image style={styles.crossIcon} source={crossIcon} />
                </Pressable>
              </View>
            );
          })}
        </ScrollView>
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
  keywordsView: {
    flexDirection: 'row',
    backgroundColor: colors.lightColor,
    borderRadius: spacing.SCALE_20,
    paddingHorizontal: spacing.SCALE_10,
    borderWidth: 0.5,
    borderColor: colors.primary,
    marginRight: spacing.SCALE_10,
    alignItems: 'center',
    paddingVertical: spacing.SCALE_4,
  },
  innerListItemView: {
    backgroundColor: colors.whiteBackground,
    marginHorizontal: spacing.SCALE_10,
    paddingHorizontal: spacing.SCALE_10,
    marginVertical: spacing.SCALE_10,
    borderRadius: spacing.SCALE_6,
  },
  crossIcon: {
    height: spacing.SCALE_16,
    width: spacing.SCALE_16,
    marginLeft: spacing.SCALE_10,
  },
});
export default JobTags;
