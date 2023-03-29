import React from 'react';
import { View, Text, StyleSheet, Modal, Image, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';

import Input from '../form/Input';
import BigButton from '../buttons/BigButton';
import { colors, spacing, typography } from '../../theme';

import person from '../../../assets/images/person.png';
import cutIcon from '../../../assets/images/cutIcon.png';
import decrementIcon from '../../../assets/images/decrementIcon.png';
import incrementIcon from '../../../assets/images/incrementIcon.png';
import blueDollarIcon from '../../../assets/images/blueDollarIcon.png';
import rejectIcon from '../../../assets/images/reject.png';

const ServicesModal = ({
  visible,
  onPressCancel,
  modalHeader,
  onChangeItemName,
  onChangeItemPrice,
  onChangeTotalUnits,
  onChangeDescription,
  onPressPlus,
  onSave,
  onPressMinus,
  totalUnitsValue,
  modalTotalPrice,
}) => {
  return (
    <View style={styles.container}>
      <Modal transparent={true} visible={visible} style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={onPressCancel}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.innerView}>
                <View style={styles.headerView}>
                  <Text style={{ fontSize: typography.FONT_SIZE_18, color: colors.text }}>{modalHeader}</Text>
                  <Pressable style={styles.exitIconContainer} onPress={onPressCancel}>
                    <Image style={styles.exitIcon} source={rejectIcon} />
                  </Pressable>
                </View>
                <Input
                  placeholder="Item name"
                  height={spacing.SCALE_40}
                  onChangeText={onChangeItemName}
                  width={'92%'}
                />
                <Input
                  textAlignVertical={'top'}
                  alignItems={'flex-start'}
                  placeholder="Description (optional)"
                  height={spacing.SCALE_88}
                  onChangeText={onChangeDescription}
                  width={'92%'}
                  paddingTop={spacing.SCALE_4}
                />
                <Input
                  leftImage={blueDollarIcon}
                  placeholder="Unit Price"
                  height={spacing.SCALE_40}
                  onChangeText={onChangeItemPrice}
                  keyboardType="numeric"
                  width={'92%'}
                />
                <View style={styles.buttonView}>
                  <View style={{ width: '20%' }}>
                    <BigButton width={spacing.SCALE_52} height={spacing.SCALE_40} onPress={onPressMinus}>
                      <Image style={styles.icon} source={decrementIcon} />
                    </BigButton>
                  </View>
                  <Text
                    style={{
                      fontSize: typography.FONT_SIZE_16,

                      width: '19%',
                      textAlign: 'right',
                      marginRight: 4,
                    }}>
                    Qty
                  </Text>

                  <Input
                    marginTop={0}
                    placeholder="1"
                    height={spacing.SCALE_40}
                    onChangeText={onChangeTotalUnits}
                    keyboardType="numeric"
                    width={'20%'}
                    value={totalUnitsValue}
                  />
                  <Text style={{ width: '20%' }}></Text>
                  <BigButton width={spacing.SCALE_52} height={spacing.SCALE_40} onPress={onPressPlus}>
                    <Image style={styles.icon} source={incrementIcon} />
                  </BigButton>
                </View>
                <View style={styles.totalPriceView}>
                  <Text style={{ fontSize: typography.FONT_SIZE_16 }}>Amount</Text>
                  <Text style={{ fontSize: typography.FONT_SIZE_16 }}>${modalTotalPrice.toFixed(2)}</Text>
                </View>
                <View style={{ marginTop: spacing.SCALE_10 }}>
                  <BigButton width={spacing.SCALE_244} height={spacing.SCALE_50} onPress={onSave}>
                    <Text style={{ color: colors.yellow400, fontWeight: 'bold', fontSize: typography.FONT_SIZE_18 }}>
                      Add
                    </Text>
                  </BigButton>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // optional, if you want a semi-transparent background
  },

  innerView: {
    width: '80%',
    backgroundColor: colors.whiteBackground,
    height: 440,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: colors.primary,
    borderRadius: spacing.SCALE_10,
    marginTop: '30%',
    marginLeft: '10%',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    width: spacing.SCALE_116,
    height: spacing.SCALE_40,
    borderRadius: spacing.SCALE_6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  text: {
    fontSize: typography.FONT_SIZE_18,
    textAlign: 'center',
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: spacing.SCALE_16,
    justifyContent: 'flex-start',
    width: '92%',
  },
  headerView: {
    backgroundColor: colors.primary,
    width: '100%',
    borderTopRightRadius: spacing.SCALE_6,
    borderTopLeftRadius: spacing.SCALE_6,
    paddingVertical: spacing.SCALE_4,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: '30%',
  },
  icon: {
    height: spacing.SCALE_20,
    width: spacing.SCALE_20,
  },
  crossIcon: {
    alignItems: 'flex-end',
    paddingLeft: spacing.SCALE_64,
    marginTop: -3,
  },
  exitIcon: {
    height: spacing.SCALE_40,
    width: spacing.SCALE_40,
  },
  exitIconContainer: {
    marginLeft: spacing.SCALE_64,
    marginTop: -3,
  },
  totalPriceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '92%',
    marginTop: spacing.SCALE_10,
  },
});
export default ServicesModal;
