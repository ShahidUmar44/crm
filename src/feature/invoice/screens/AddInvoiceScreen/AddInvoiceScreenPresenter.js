import React, { useState } from 'react';
import { Text, View, StyleSheet, ToastAndroid } from 'react-native';
import GoBackButton from '../../../../shared/buttons/GoBackButton';
import { colors, spacing, typography } from '../../../../theme';
import BigButton from '../../../../shared/buttons/BigButton';
import InputSecondary from '../../../../shared/form/InputSecondary';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 10,
    alignSelf: 'center',
    paddingHorizontal: '5%',
    backgroundColor: colors.whiteBackground,
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.SCALE_20,
    marginBottom: spacing.SCALE_10,
  },
  titleWrapper: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: typography.FONT_SIZE_20,
    fontFamily: typography.secondary,
    color: colors.primaryDarker,
  },
  buttonWrapper: {
    // left: 0,
    // position: 'absolute',
  },
  ctaText: {
    color: colors.whiteBackground,
    fontSize: typography.FONT_SIZE_16,
    fontFamily: typography.secondary,
  },
  spacing: {
    marginTop: spacing.SCALE_20,
  },
});

const AddInvoiceScreenPresenter = ({ onBack, totalAmount }) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');

  const reset = () => {
    ToastAndroid.show('Invoice Sent', ToastAndroid.SHORT);
    setTo('');
    setSubject('');
    setDetails('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.buttonWrapper}>
          <GoBackButton />
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Compose</Text>
        </View>
      </View>
      <InputSecondary value={to} placeholder="To" onChangeText={setTo} />
      <InputSecondary value={subject} placeholder="Subject" onChangeText={setSubject} />
      <InputSecondary
        value={details}
        placeholder="Details"
        onChangeText={setDetails}
        multiline={true}
        height={spacing.SCALE_320}
      />
      <View style={styles.spacing}>
        <BigButton onPress={reset}>
          <Text style={styles.ctaText}>Send</Text>
        </BigButton>
      </View>
    </View>
  );
};

export default AddInvoiceScreenPresenter;
