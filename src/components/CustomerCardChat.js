import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';

import IconButton from '../shared/buttons/IconButton';
import { colors, spacing, typography } from '../theme';

const CustomerCardChat = ({ item, onPressCard }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPressCard} style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>
          {item?.displayName ? item.displayName : `${item.firstName} ${item.lastName}`}
        </Text>
        <Text style={styles.cardSubtitle}>
          {'(' +
            item?.phone.mobile.substring(2, 5) +
            ') ' +
            item?.phone.mobile.substring(5, 8) +
            '-' +
            item?.phone.mobile.substring(8, 12)}
        </Text>
        <Text style={styles.cardSubtitle}>{item?.email}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.whiteBackground,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: colors.primaryDarker,
    height: spacing.SCALE_88,
    marginVertical: 8,
    marginHorizontal: '5%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: colors.primary,
  },
  cardSubtitle: {
    fontSize: 16,
  },
});

export default CustomerCardChat;
