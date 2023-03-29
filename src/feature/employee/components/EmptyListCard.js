import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const EmptyListCard = () => {
  return (
    <View style={styles.emptyCardContainer}>
      <Text style={styles.heading}>No items to display</Text>
      <Text style={styles.message}>Please add items to the list</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyCardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    fontSize: 18,
    color: '#777',
  },
});

export default EmptyListCard;
