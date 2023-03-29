import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, Pressable } from 'react-native';

import { colors, spacing, typography } from '../../../theme';
import Input from '../../../shared/form/Input';
import BigButton from '../../../shared/buttons/BigButton';

import dollarIcon from '../../../../assets/images/dollarIcon.png';
import percentageIcon from '../../../../assets/images/percentageIcon.png';
import blueDollarIcon from '../../../../assets/images/blueDollarIcon.png';
import cutIcon from '../../../../assets/images/cutIcon.png';
import DiscountModalDesription from './DiscountModalDesription';

const AddDiscountModal = ({
  visible,
  onPressCancel,
  onChangeDesription,
  onChangePrice,
  onPress,
  onChangePercentagePrice,
}) => {
  const [showPercentage, setShowPercentage] = useState(false);
  return (
    <View style={styles.container}>
      <Modal transparent={true} visible={visible} style={styles.modalContainer}>
        <View style={styles.innerView}>
          <View style={styles.headerView}>
            <Text style={{ fontSize: typography.FONT_SIZE_18, color: colors.text }}>Add Discount</Text>
            <Pressable style={styles.crossIcon} onPress={onPressCancel}>
              <Image style={styles.icon} source={cutIcon} />
            </Pressable>
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={{
                ...styles.cancelButton,
                backgroundColor: showPercentage ? colors.whiteBackground : colors.primary,
              }}
              onPress={() => setShowPercentage(false)}>
              <Image style={styles.icon} source={showPercentage ? blueDollarIcon : dollarIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.cancelButton,
                backgroundColor: !showPercentage ? colors.whiteBackground : colors.primary,
                marginLeft: spacing.SCALE_10,
              }}
              onPress={() => setShowPercentage(true)}>
              <Image style={styles.icon} source={percentageIcon} />
            </TouchableOpacity>
          </View>
          {showPercentage ? (
            <DiscountModalDesription
              leftImage={percentageIcon}
              onChangePrice={onChangePercentagePrice}
              onPress={onPress}
              onChangeDesription={onChangeDesription}
            />
          ) : (
            <DiscountModalDesription
              leftImage={blueDollarIcon}
              onChangePrice={onChangePrice}
              onChangeDesription={onChangeDesription}
              onPress={onPress}
            />
          )}
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
    height: spacing.SCALE_300,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: colors.primary,
    borderRadius: spacing.SCALE_10,
    marginTop: '50%',
    marginLeft: '15%',
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
    justifyContent: 'space-evenly',
    marginTop: '5%',
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
    marginTop: -28,
  },
});
export default AddDiscountModal;
