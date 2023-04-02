import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

import { colors, spacing, typography } from '../../../theme';

const LeaveScreenModal = ({ visible, onPressCancel, onPressConfirm }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Modal transparent={true} visible={visible} style={styles.modalContainer}>
        <View style={styles.innerView}>
          <Text style={styles.text}>Your changes will be discarded?</Text>
          <View style={styles.buttonView}>
            <TouchableOpacity style={styles.cancelButton} onPress={onPressCancel}>
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.cancelButton, backgroundColor: colors.primary, marginLeft: spacing.SCALE_10 }}
              onPress={onPressConfirm}>
              <Text style={{ ...styles.text, color: colors.text }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerView: {
    width: '70%',
    backgroundColor: colors.whiteBackground,
    height: spacing.SCALE_200,
    alignItems: 'center',
    padding: spacing.SCALE_10,
    borderWidth: 0.5,
    borderColor: colors.primary,
    borderRadius: spacing.SCALE_10,
    marginTop: '60%',
    marginLeft: '15%',
    paddingTop: '10%',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    width: spacing.SCALE_106,
    height: spacing.SCALE_40,
    borderRadius: spacing.SCALE_6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: typography.FONT_SIZE_18,
    textAlign: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: '15%',
  },
});
export default LeaveScreenModal;
