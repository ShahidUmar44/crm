import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import CustomerIcon from '../../../../assets/images/customer-icon.svg';
import { colors, typography, spacing } from '../../../theme';
import { signOut } from '@firebase/auth';
import { auth } from '../.././../utils/Firebase';
import { useNavigation } from '@react-navigation/core';
import { SCREENS } from '../../../constants';

const SettingsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <Pressable style={styles.itemContainer} onPress={() => navigation.navigate(SCREENS.USERPROFILESCREEN)}>
          <CustomerIcon opacity={0.4} width={35} height={35} />
          <Text style={{ fontSize: 20, marginLeft: 10, color: colors.gray700 }}>User profile settings</Text>
        </Pressable>
        <Pressable
          style={{ ...styles.itemContainer, marginTop: 40 }}
          onPress={() => navigation.navigate(SCREENS.EMPLOYEES_LIST)}>
          <CustomerIcon opacity={0.4} width={35} height={35} />
          <Text style={{ fontSize: 20, marginLeft: 10, color: colors.gray700 }}>Manage team members</Text>
        </Pressable>
      </View>
      <View
        style={{
          ...styles.itemContainer,
          marginBottom: 40,

          alignSelf: 'center',
          justifyContent: 'center',
          paddingRight: 20,
        }}>
        <Pressable
          onPress={() => signOut(auth)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AntDesign name="logout" size={24} color="rgba(0, 0, 0, 0.4)" />
          <Text style={{ fontSize: 20, marginLeft: 10, color: colors.gray700 }}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: '40%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingVertical: 10,
    backgroundColor: colors.gray200,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: colors.gray700,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
