import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const ColorDropdown = ({ selectedColor, setSelectedColor }) => {
  const colorOptions = [
    { label: 'Blue', value: '#3b82f6' },
    { label: 'Orange', value: '#f97316' },
    { label: 'Purple', value: '#d946ef' },
    { label: 'Yellow', value: '#facc15' },
    { label: 'Teal', value: '#14b8a6' },
    { label: 'Violet', value: '#8b5cf6' },
    { label: 'Pink', value: '#ec4899' },
    { label: 'Cyan', value: '#06b6d4' },
  ];

  return (
    <View style={styles.container}>
      <SelectDropdown
        data={colorOptions}
        defaultButtonText={'Select Color'}
        dropdownStyle={{ borderRadius: 8, paddingVertical: 10 }}
        buttonStyle={styles.button}
        renderCustomizedButtonChild={selectedItem => {
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
                paddingRight: 5,
              }}>
              <View style={styles.row}>
                <FontAwesome name="square" size={20} color={selectedItem ? selectedItem.value : selectedColor.value} />
                <Text style={styles.rowText}>{selectedItem ? selectedItem.label : selectedColor.label}</Text>
              </View>
              <AntDesign name="down" size={20} color="black" />
            </View>
          );
        }}
        onSelect={selectedItem => {
          setSelectedColor(selectedItem);
        }}
        // defaultValueByIndex={0}
        buttonTextAfterSelection={selectedItem => selectedItem.label}
        rowTextForSelection={item => (
          <View style={styles.row}>
            <FontAwesome name="square" size={20} color={item.value} />
            <Text style={styles.rowText}>{item.label}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 18,
  },
  button: {
    width: '100%',
    height: 60,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#9ca3af',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  rowText: {
    marginLeft: 12,
    fontSize: 16,
  },
});

export default ColorDropdown;
