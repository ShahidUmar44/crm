import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import IconButton from '../../../../shared/buttons/IconButton';
import { colors, spacing, typography } from '../../../../theme';
import SmallButton from '../../../../shared/buttons/SmallButton';
import GoBackButton from '../../../../shared/buttons/GoBackButton';
import InputSecondary from '../../../../shared/form/InputSecondary';

const CheckoutScreenPresenter = ({ onNext, totalAmount }) => {
  const [notes, setNotes] = useState('');
  const [saveNotes, setSaveNotes] = useState(false);

  console.log('totalAmount', totalAmount);

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.buttonWrapper}>
          <GoBackButton />
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Checkout</Text>
        </View>
        <View style={{ backgroundColor: colors.error }} />
      </View>
      <View
        style={{
          marginTop: spacing.SCALE_30,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{ fontSize: typography.FONT_SIZE_16, fontWeight: '500' }}>Job Total</Text>
        <View style={{ backgroundColor: colors.primaryDarker, borderRadius: 4 }}>
          <Text
            style={{
              color: colors.text,
              padding: 4,

              fontSize: typography.FONT_SIZE_16,
              fontWeight: '500',
            }}>
            ${totalAmount ? totalAmount?.toFixed(2) : ''}
          </Text>
        </View>
      </View>
      <View style={{ height: 1, backgroundColor: colors.dim, marginVertical: 20 }} />
      {/* We are only adding a note on cash check e-transfer or other payments  */}
      {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: colors.primaryDarker, fontSize: typography.FONT_SIZE_16, fontWeight: '600' }}>Note</Text>
        <View style={{ flexDirection: 'row' }}>
          <IconButton onPress={() => setSaveNotes(false)}>
            <AntDesign name="edit" size={20} color={colors.primaryDarker} />
          </IconButton>
          <IconButton
            onPress={() => {
              setSaveNotes(false);
              setNotes('');
            }}>
            <AntDesign name="delete" size={20} color={colors.primaryDarker} />
          </IconButton>
        </View>
      </View>
      <InputSecondary
        value={notes}
        placeholder="Write a note"
        onChangeText={setNotes}
        multiline={true}
        height={spacing.SCALE_154}
        disabled={saveNotes}
      /> */}
      <View style={styles.spacing}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          {/* <SmallButton
            text="Save"
            onPress={() => setSaveNotes(true)}
            textColor={colors.text}
            color={colors.primaryDarker}
            width={spacing.SCALE_154}
          /> */}
          <SmallButton
            text="Next"
            onPress={onNext}
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

export default CheckoutScreenPresenter;
