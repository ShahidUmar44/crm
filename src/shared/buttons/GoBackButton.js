import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { spacing } from '../../theme';
import backArrow from '@assets/images/arrow-left.png';

const styles = StyleSheet.create({
  icon: {
    width: spacing.SCALE_24,
    height: spacing.SCALE_16,
  },
});

const GoBackButton = ({ onPress = null, customNavigate = null }) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    if (customNavigate) {
      customNavigate();
    } else {
      navigation.goBack();
    }
  };

  return (
    <TouchableOpacity onPress={onPress ? onPress : handleBackPress}>
      <Image source={backArrow} resizeMethod="resize" resizeMode="contain" style={styles.icon} />
    </TouchableOpacity>
  );
};

export default GoBackButton;
