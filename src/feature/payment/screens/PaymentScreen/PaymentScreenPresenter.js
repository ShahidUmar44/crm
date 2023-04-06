import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CreditCard from 'react-native-credit-card';
import { CardField } from '@stripe/stripe-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import BigButton from '../../../../shared/buttons/BigButton';
import { colors, spacing, typography } from '../../../../theme';
import GoBackButton from '../../../../shared/buttons/GoBackButton';
import SmallButton from '../../../../shared/buttons/SmallButton';

import cardFront from '../../../../../assets/images/card/card-front.png';
import cardBack from '../../../../../assets/images/card/card-back.png';

const CardScreenPresenter = ({ onPayPress, processingPayment, onPayViaCash, onPayViaCheck }) => {
  const [cardDetails, setCardDetails] = useState();

  const [number, setNumber] = useState('XXXXXXXXXXXX');
  const [expiry, setExpiry] = useState('07/24');
  const [focused, setFocused] = useState('number');

  // console.log('cardDetails', cardDetails);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={styles.headerWrapper}>
        <View style={styles.buttonWrapper}>
          <GoBackButton />
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Payment</Text>
        </View>
        <View style={{ flex: 0.3, backgroundColor: colors.error }} />
      </View>
      <View style={{ marginVertical: 20 }} />

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: 16,
            minHeight: 180,
          }}>
          <CreditCard
            style={{
              marginBottom: 0,
              elevation: 3,
              alignSelf: 'center',
            }}
            imageFront={cardFront}
            imageBack={cardBack}
            shiny={false}
            bar={false}
            number={number}
            name={'Your Name'}
            expiry={expiry}
            cvc="CVC"
            focused={focused}
          />
        </View>

        <CardField
          postalCodeEnabled
          placeholder={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={details => {
            setCardDetails(details);
            setNumber(`XXXXXXXXXXXX${details.last4 || ''}`);
            const month = `00${details.expiryMonth || 1}`;
            const year = `00${details.expiryYear || 21}`;
            setExpiry(`${month.substr(month.length - 2)}/${year.substr(year.length - 2)}`);
          }}
          onFocus={focusedField => {
            if (focusedField === 'Cvc') {
              setFocused('cvc');
            } else {
              setFocused('number');
            }
          }}
        />

        <View style={{ marginTop: 0 }}>
          <BigButton
            isLoading={processingPayment}
            disabled={!cardDetails?.complete || processingPayment}
            color={colors.primaryDarker}
            onPress={() => cardDetails?.complete && onPayPress()}>
            <Text
              style={{
                color: colors.lightColor,
                fontSize: typography.FONT_SIZE_18,
                fontWeight: 'bold',
              }}>
              Pay With Card
            </Text>
          </BigButton>

          {/* <View
            style={{
              flex: 1,
              marginTop: 30,
            }}>
            <Text
              style={{
                color: colors.primaryDarker,
                textTransform: 'uppercase',
              }}>
              Pay Via?
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <SmallButton
                text="CASH"
                onPress={() => onPayViaCash()}
                textColor={colors.text}
                color={colors.primaryDarker}
                width={spacing.SCALE_162}
              />
              <SmallButton
                text="CHECK"
                onPress={() => onPayViaCheck()}
                textColor={colors.text}
                width={spacing.SCALE_162}
                color={colors.primaryDarker}
              />
            </View> */}
          {/* </View> */}
        </View>
      </KeyboardAwareScrollView>
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
  },
  titleWrapper: {
    // flexGrow: 1,
  },
  title: {
    fontSize: typography.FONT_SIZE_20,
    fontFamily: typography.secondary,
    color: colors.primaryDarker,
  },
  buttonWrapper: {
    // left: 0,
    // position: 'absolute',
    flex: 0.3,
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

export default CardScreenPresenter;
