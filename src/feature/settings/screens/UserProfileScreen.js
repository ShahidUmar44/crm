import { StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import { colors, typography, spacing } from '../../../theme';
import GoBackButton from '../../../shared/buttons/GoBackButton';
import { auth } from '../../../utils/Firebase';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import Input from '../../../shared/form/Input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/core';

const UserProfileScreen = () => {
  const { user, userData } = useContext(UserContext);
  const navigation = useNavigation();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleChangePassword(e) {
    console.log('change password');
    e.preventDefault();
    setMessage('');
    setLoading(true);

    console.log(currentPassword, newPassword, confirmNewPassword, user.email);

    if (newPassword !== confirmNewPassword) {
      alert('New passwords do not match.');

      return;
    }
    try {
      // Re-authenticate the user
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      console.log('credential', credential);

      await reauthenticateWithCredential(user, credential);

      // Update the user's password
      await updatePassword(user, newPassword);
      alert('Password updated successfully');
      navigation.goBack();
    } catch (error) {
      console.log('error', error);
      alert(error.message);
    }
    setLoading(false);
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <GoBackButton />
          <Text
            style={{
              fontSize: typography.FONT_SIZE_20,
              fontFamily: typography.secondary,
              color: colors.primaryDarker,
            }}>
            Account
          </Text>
        </View>
        <View style={{ ...styles.itemContainer, marginTop: 10 }}>
          <Text
            style={{
              fontSize: typography.FONT_SIZE_18,
              fontFamily: typography.secondary,
              color: colors.primaryDarker,
            }}>
            Name
          </Text>
          <Text style={{ fontSize: typography.FONT_SIZE_16, color: colors.gray700, paddingTop: spacing.SCALE_8 }}>
            {userData?.userData.firstName} {userData?.userData.lastName}
          </Text>
        </View>
        <View style={styles.itemContainer}>
          <Text
            style={{
              fontSize: typography.FONT_SIZE_18,
              fontFamily: typography.secondary,
              color: colors.primaryDarker,
            }}>
            Email
          </Text>
          <Text style={{ fontSize: typography.FONT_SIZE_16, color: colors.gray700, paddingTop: spacing.SCALE_8 }}>
            {userData?.userData.email}
          </Text>
        </View>
        <View style={styles.itemContainer}>
          <Text
            style={{
              fontSize: typography.FONT_SIZE_18,
              fontFamily: typography.secondary,
              color: colors.primaryDarker,
            }}>
            Role
          </Text>
          <Text style={{ fontSize: typography.FONT_SIZE_16, color: colors.gray700, paddingTop: spacing.SCALE_8 }}>
            {userData?.userData.userType}
          </Text>
        </View>
        <View style={styles.itemContainer}>
          <Text
            style={{
              fontSize: typography.FONT_SIZE_18,
              fontFamily: typography.secondary,
              color: colors.primaryDarker,
            }}>
            Change Password
          </Text>
          <Text
            style={{
              fontSize: typography.FONT_SIZE_16,
              color: colors.primaryDarker,
              marginTop: 16,
            }}>
            Current Password
          </Text>

          <Input value={currentPassword} onChangeText={setCurrentPassword} secureTextEntry={true} />
          <Text
            style={{
              fontSize: typography.FONT_SIZE_16,
              color: colors.primaryDarker,
              marginTop: 16,
            }}>
            New Password
          </Text>

          <Input value={newPassword} onChangeText={setNewPassword} secureTextEntry={true} />
          <Text
            style={{
              fontSize: typography.FONT_SIZE_16,
              color: colors.primaryDarker,
              marginTop: 16,
            }}>
            Confirm New Password
          </Text>

          <Input value={confirmNewPassword} onChangeText={setConfirmNewPassword} secureTextEntry={true} />
        </View>
        <Pressable onPress={handleChangePassword} style={styles.button}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text
              style={{
                fontSize: typography.FONT_SIZE_16,
                color: colors.gray100,

                textAlign: 'center',
              }}>
              Change Password
            </Text>
          )}
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    flexDirection: 'column',
    justifyContent: 'start',
  },
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 10,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: colors.gray700,
    paddingHorizontal: 20,

    alignSelf: 'center',
    justifyContent: 'center',
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
    marginBottom: 30,
  },
});
