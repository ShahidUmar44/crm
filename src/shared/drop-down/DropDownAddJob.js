import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';
import { colors, spacing, typography } from '../../theme';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    zIndex: 1000,
    paddingTop: spacing.SCALE_10,
  },
  inputContainer: {
    width: '100%',
  },
  listContainer: {
    Maxheight: 250, // adjust this value to limit the height of the list
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: spacing.SCALE_10,
    borderBottomRightRadius: spacing.SCALE_10,
    paddingLeft: spacing.SCALE_16,
    paddingTop: 10,

    overflow: 'visible',
    position: 'absolute',
    top: 50,
    zIndex: 1100,
    right: spacing.SCALE_10,
    left: spacing.SCALE_10,
  },

  leftIcon: {
    height: spacing.SCALE_20,
    width: spacing.SCALE_20,
  },
});

const DropDownAddJob = React.forwardRef(
  (
    {
      disabled,
      width,
      data,
      height,
      onSelect,
      maxWidth,
      buttonTextStyle,
      defaultButtonText = '',
      paddingVertical,
      leftIcon,
      top = '50%',
      left = spacing.SCALE_8,
      borderRadius,
      marginTop,
      paddingRight,
      borderWidth,
      borderColor,
      setSelectedCustomer,
      setSearchText,
      searchText,
    },
    ref,
  ) => {
    const [filteredData, setFilteredData] = useState(data);

    useEffect(() => {
      if (!searchText) {
        setFilteredData(data);
        return;
      } else {
        const filtered =
          data?.length > 0 &&
          data.filter(item => {
            return item?.displayName
              .toLowerCase()
              .includes(searchText?.toLowerCase() || item?.phone.mobile.includes(searchText));
          });

        setFilteredData(filtered);
      }
    }, [searchText]);
    // console.log('data', data);
    // console.log('filteredData', filteredData);
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            ...styles.inputContainer,
          }}>
          <TextInput
            editable={!disabled}
            value={searchText}
            onChangeText={setSearchText}
            placeholder={defaultButtonText}
            style={{
              paddingRight,
              textAlign: 'left',
              paddingLeft: spacing.SCALE_40,
              fontSize: typography.FONT_SIZE_16,
              marginTop: spacing.SCALE_10,
              backgroundColor: '#ffffff',
              borderRadius: spacing.SCALE_10,
              marginHorizontal: spacing.SCALE_10,
              paddingVertical: spacing.SCALE_10,
            }}
          />
        </TouchableOpacity>

        {searchText && (
          // <View
          //   style={{
          //     ...styles.listContainer,
          //   }}>
          //   <FlatList
          //     data={filteredData}
          //     keyExtractor={(item, index) => index.toString()}
          //     renderItem={({ item }) => (
          //       <TouchableOpacity
          //         style={{
          //           padding: spacing.SCALE_10,
          //         }}
          //         onPress={() => {
          //           setSelectedCustomer(item);
          //           setSearchText('');
          //         }}>
          //         <Text style={{ color: colors.darkText, fontSize: typography.FONT_SIZE_16 }}>{item.displayName}</Text>
          //       </TouchableOpacity>
          //     )}
          //   />
          // </View>
          <View style={{ ...styles.listContainer, maxHeight: 10 * 30 }}>
            {filteredData.slice(0, 10).map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{ padding: spacing.SCALE_10 }}
                onPress={() => {
                  setSelectedCustomer(item);
                  setSearchText('');
                }}>
                <Text style={{ color: colors.darkText, fontSize: typography.FONT_SIZE_16 }}>{item.displayName}</Text>
                <Text style={{ color: colors.darkText, fontSize: typography.FONT_SIZE_16, paddingTop: 3 }}>
                  {item.address?.[0]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {leftIcon && (
          <View
            style={{
              position: 'absolute',
              left: spacing.SCALE_16,
              top: 29,
            }}>
            <Image resizeMode="contain" source={leftIcon} style={styles.leftIcon} />
          </View>
        )}
      </View>
    );
  },
);

export default DropDownAddJob;
