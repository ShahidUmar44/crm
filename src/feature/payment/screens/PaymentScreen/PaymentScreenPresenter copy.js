import React, { useState } from 'react';
import { Text, View, StyleSheet, ToastAndroid } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import GoBackButton from '../../../../shared/buttons/GoBackButton';
import { colors, spacing, typography } from '../../../../theme';
import BigButton from '../../../../shared/buttons/BigButton';
import InputSecondary from '../../../../shared/form/InputSecondary';
import SmallButton from '../../../../shared/buttons/SmallButton';
import IconButton from '../../../../shared/buttons/IconButton';

const PaymentScreenPresenter = ({ onBack }) => {
  const [notes, setNotes] = useState('');
  const [saveNotes, setSaveNotes] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.buttonWrapper}>
          <GoBackButton />
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Payment</Text>
        </View>
        <View style={{ backgroundColor: colors.error }} />
      </View>
      <View style={{ height: 1, backgroundColor: colors.dim, marginVertical: 20 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: colors.primaryDarker, fontSize: typography.FONT_SIZE_16, fontWeight: '600' }}>
          Credit Card
        </Text>
      </View>
      <InputSecondary
        value={notes}
        placeholder="Write a note"
        onChangeText={setNotes}
        multiline={true}
        height={spacing.SCALE_154}
        disabled={saveNotes}
      />
      <View style={styles.spacing}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <SmallButton
            text="Save"
            onPress={() => setSaveNotes(true)}
            textColor={colors.text}
            color={colors.primaryDarker}
            width={spacing.SCALE_154}
          />
          <SmallButton
            text="Next"
            onPress={() => {}}
            textColor={colors.text}
            width={spacing.SCALE_154}
            color={colors.primaryDarker}
          />
        </View>
      </View>
    </View>
  );
};

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
    // marginTop: spacing.SCALE_20,
    marginBottom: spacing.SCALE_10,
    backgroundColor: colors.whiteBackground,
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
    marginTop: spacing.SCALE_30,
  },
});

export default PaymentScreenPresenter;
