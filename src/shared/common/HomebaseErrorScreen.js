import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';

import { SCREENS } from '../../constants';
import BigButton from '../buttons/BigButton';
import { colors, spacing, typography } from '../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: spacing.SCALE_10,
    paddingHorizontal: spacing.SCALE_20,
  },
  message: {
    fontWeight: '500',
    textAlign: 'center',
    color: colors.darkText,
    marginTop: spacing.SCALE_12,
    fontFamily: typography.primary,
    fontSize: typography.FONT_SIZE_18,
    paddingHorizontal: spacing.SCALE_10,
  },
  button: {
    color: '#fff',
    fontSize: typography.FONT_SIZE_16,
    fontFamily: typography.secondary,
  },
});

const defaultButtonRow = navigation => (
  <View
    style={{
      marginBottom: spacing.SCALE_20,
      paddingVertical: spacing.SCALE_12,
    }}>
    <BigButton color={colors.primaryDarker} onPress={() => navigation.navigate(SCREENS.SIGN_IN)}>
      <Text style={styles.button}>Sign In</Text>
    </BigButton>
  </View>
);

const HomebaseErrorScreen = ({ title = 'Ups!', message, renderButtonRow = defaultButtonRow }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AntDesign name="frown" size={typography.FONT_SIZE_40} color={colors.error} />
        <Text
          style={{
            fontSize: 16,
            fontFamily: typography.secondary,
            marginTop: spacing.SCALE_10,
          }}>
          {title}
        </Text>
        <Text style={styles.message}>{message ?? 'Unexpected Error'}</Text>
      </View>
      {renderButtonRow(navigation)}
    </View>
  );
};

export default HomebaseErrorScreen;
