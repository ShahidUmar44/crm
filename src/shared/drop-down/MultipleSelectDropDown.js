import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { StatusBar, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';

import { colors, spacing, typography } from '../../theme';

import friendsIcon from '../../../assets/images/friendsIcon.png';
import deleteIcon from '../../../assets/images/deleteIcon.png';
import { useFocusEffect } from '@react-navigation/native';

const MultipleSelectDropDown = ({ data, setSelectUser, selectUser }) => {
  const [selected, setSelected] = React.useState(selectUser ? selectUser.map(user => user.id) : []);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     setSelected([]);
  //   }, []),
  // );

  useEffect(() => {
    if (selected.length === 0 && selectUser && selectUser.length > 0) {
      setSelected(selectUser.map(user => user.id));
    }
  }, []);

  useEffect(() => {
    if (data?.length === 0) return;
    const filteredData = data?.filter(item => selected.includes(item.id));
    setSelectUser(filteredData);
  }, [selected]);

  const renderDataItem = (item, selected) => {
    return (
      <View style={styles.item}>
        <View
          style={{ ...styles.checkbox, backgroundColor: selected ? colors.primary : colors.whiteBackground }}></View>
        <Text style={styles.selectedTextStyle}>{item.firstName + ' ' + item.lastName}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField="firstName"
        valueField="id"
        placeholder="Dispatch to"
        value={selected}
        activeColor={colors.whiteBackground}
        // search
        // searchPlaceholder="Search..."
        onChange={id => {
          setSelected(id);
        }}
        renderLeftIcon={() => <Image style={styles.icon} resizeMode="contain" source={friendsIcon} />}
        renderItem={renderDataItem}
        renderSelectedItem={(item, unSelect) => (
          <View style={styles.selectedStyle}>
            <View>
              <Text style={{ marginBottom: spacing.SCALE_6 }}>{item.firstName + ' ' + item.lastName}</Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Pressable onPress={() => unSelect && unSelect(item)}>
                <Image source={deleteIcon} resizeMode="cover" style={styles.deleteIcon} />
              </Pressable>
            </View>
          </View>
        )}
      />
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.SCALE_10,
  },
  dropdown: {
    height: spacing.SCALE_50,
    padding: spacing.SCALE_10,
    borderBottomLeftRadius: spacing.SCALE_10,
    borderBottomRightRadius: spacing.SCALE_10,
  },
  placeholderStyle: {
    fontSize: typography.FONT_SIZE_16,
  },
  selectedTextStyle: {
    fontSize: typography.FONT_SIZE_16,
  },
  iconStyle: {
    width: spacing.SCALE_20,
    height: spacing.SCALE_20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
    height: spacing.SCALE_20,
    width: spacing.SCALE_20,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    height: spacing.SCALE_20,
    width: spacing.SCALE_20,
    borderRadius: spacing.SCALE_50,
    marginRight: spacing.SCALE_10,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.SCALE_6,
    paddingVertical: spacing.SCALE_6,
    width: '95%',
    borderTopWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: spacing.SCALE_10,
    marginLeft: spacing.SCALE_10,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: spacing.SCALE_16,
  },
  deleteIcon: {
    height: spacing.SCALE_24,
    width: spacing.SCALE_24,
    marginBottom: spacing.SCALE_6,
  },
});

export default MultipleSelectDropDown;
