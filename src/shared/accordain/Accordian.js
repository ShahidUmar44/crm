import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { colors, spacing, typography } from '../../theme';

import plusIcon from '../../../assets/images/plusIcon.png';
import servicesIcon from '../../../assets/images/servicesIcon.png';
import editIcon from '../../../assets/images/editIcon.png';
import deleteIcon from '../../../assets/images/deleteIcon.png';

const Accordian = ({ onPress, data, header, onPressDelete, index, onPressShowAccordian, showAccordian }) => {
  return (
    <View>
      <View style={styles.innerListItemView}>
        <View style={styles.serviceRow}>
          <Pressable onPress={onPressShowAccordian} style={{ flexDirection: 'row', width: '80%' }}>
            <Image style={styles.servicesIcon} source={servicesIcon} />
            <Text style={styles.serviceText}>{header}</Text>
          </Pressable>
          <Pressable onPress={onPress}>
            <Image style={styles.servicesIcon} source={plusIcon} />
          </Pressable>
        </View>
        {showAccordian && (
          <>
            {data.map(item => {
              return (
                <View style={styles.listItemCardView}>
                  <View>
                    <Text style={{ color: colors.primary }}>{item.name}</Text>
                    <Text>${parseFloat(item.unitPrice).toFixed(2)}</Text>
                    <Text>Qty {item.quantity}</Text>
                  </View>
                  <View>
                    <View style={styles.iconsView}>
                      <Image style={{ ...styles.servicesIcon, marginRight: spacing.SCALE_10 }} source={editIcon} />
                      <Pressable onPress={() => onPressDelete(index)}>
                        <Image style={styles.servicesIcon} source={deleteIcon} />
                      </Pressable>
                    </View>
                    <Text> ${(item.unitPrice * item.quantity).toFixed(2)}</Text>
                  </View>
                </View>
              );
            })}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: colors.whiteBackground,
    marginHorizontal: spacing.SCALE_10,
    paddingHorizontal: spacing.SCALE_10,
    marginTop: spacing.SCALE_20,
    marginBottom: spacing.SCALE_10,
    borderRadius: spacing.SCALE_6,
  },
  ListItemView: {
    marginTop: spacing.SCALE_10,
    borderRadius: spacing.SCALE_4,
    backgroundColor: colors.shadow,
    paddingBottom: spacing.SCALE_10,
  },
  servicesIcon: {
    height: spacing.SCALE_20,
    width: spacing.SCALE_20,
  },
  serviceText: {
    marginLeft: spacing.SCALE_10,
    fontSize: typography.FONT_SIZE_16,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.SCALE_10,
  },
  listItemCardView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.SCALE_10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: colors.primary,
  },
  iconsView: { flexDirection: 'row', marginBottom: spacing.SCALE_10, alignItems: 'center' },
  scheduleView: {
    marginTop: spacing.SCALE_10,
    borderRadius: spacing.SCALE_4,
    backgroundColor: colors.shadow,
    paddingBottom: spacing.SCALE_10,
  },
});

export default Accordian;
