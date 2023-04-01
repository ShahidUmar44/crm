import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Modal, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStripe, useConfirmPayment, createPaymentMethod } from '@stripe/stripe-react-native';

import { db } from '../../../../utils/Firebase';
import Input from '../../../../shared/form/Input';
import { colors, spacing } from '../../../../theme';
import PaymentScreenPresenter from './PaymentScreenPresenter';
import { UserContext } from '../../../../context/UserContext';
import SmallButton from '../../../../shared/buttons/SmallButton';
import HomebaseAlert, { useAlertControl } from '../../../../shared/common/HomebaseAlert';
export const node = 'https://us-central1-homebase-90.cloudfunctions.net';
import { SCREENS } from '../../../../constants';

const PaymentScreenContainer = ({ route }) => {
  const { userData } = useContext(UserContext);
  const jobDetails = route?.params?.jobDetails;
  const navigation = useNavigation();
  const paymentAlert = useAlertControl();
  const [amount, setAmount] = useState(jobDetails?.jobTotal);
  const [tip, setTip] = useState(0);
  const [customTip, setCustomTip] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedTip, setSelectedTip] = useState('notip');

  const { confirmPayment, loading } = useConfirmPayment();

  useEffect(() => {
    if (!customTip) {
      setTip(0);
      setSelectedTip('notip');
      return;
    }
    setTip(customTip);
  }, [customTip]);

  const renderActionButtons = ({ close }) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <SmallButton
          text="Cancel"
          onPress={() => {
            close();
          }}
          color={colors.whiteBackground}
          textColor={colors.primaryDarker}
          width={spacing.SCALE_154}
        />
        <SmallButton
          text="Confirm"
          onPress={() => {
            handlePay();
          }}
          textColor={colors.text}
          width={spacing.SCALE_154}
          color={colors.primaryDarker}
          isLoading={isLoading}
        />
      </View>
    );
  };
  const fetchPaymentIntentClientSecret = async (amount, tip, email, description, invoiceId, jobId) => {
    console.log('stripeAccountId', userData.bizData.stripeAccountId);
    console.log('businessId', userData.bizData.id);

    const paymentIntentResponse = await fetch(`${node}/intents/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount * 100,
        stripeAccountId: userData.bizData.stripeAccountId,
        tip: tip,
        email: email,
        description: description,
        invoiceId: invoiceId || null,
        jobId: jobId,
        businessId: userData.bizData.id,
      }),
    });
    const { paymentIntent } = await paymentIntentResponse.json();
    console.log('paymentIntent', JSON.stringify(paymentIntent, null, 2));

    return paymentIntent.client_secret;
  };

  const handlePay = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const email = 'deerriicckk@gmail.com';
    const description = 'Window Cleaning'; //jobDetails?.lineItems[0].name
    const invoiceId = '234234'; // jobDetails.invoiceId
    const jobId = '234234'; // jobDetails.id

    const billingDetails = {
      email: 'deerriicckk@gmail.com',
      phone: '+48888000888',
      address: {
        city: 'Houston',
        country: 'US',
        line1: '1459  Circle Drive',
        line2: 'Texas',
        postalCode: '77063',
      },
    };

    // Fetch the intent client secret from the backend.
    const clientSecret = await fetchPaymentIntentClientSecret(amount, tip, email, description, invoiceId, jobId);

    const stripeAccountId = userData.bizData.stripeAccountId;
    console.log('stripeAccountId', stripeAccountId);
    console.log('clientSecret', clientSecret);

    // Confirm the payment with the created Payment Method ID
    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
      paymentMethodData: {
        billingDetails,
      },
    });

    if (error) {
      console.log('Payment confirmation error', error);
      alert(`Error code: ${error.code}`, error.message);
    } else if (paymentIntent) {
      console.log('Success from promise', JSON.stringify(paymentIntent, null, 2));
      navigation.navigate(SCREENS.SUCCESSPAYMENT, { jobDetails });
      setTimeout(() => {
        paymentAlert.close();
      }, 500);
    }

    // const jobRef = doc(db, 'businesses', businessId, 'jobs', jobId);
    // if (!tip) {
    //   await updateDoc(jobRef, {
    //     datePaid: serverTimestamp(),
    //   });
    //   console.log('DatePaid added to firestore');
    // } else {
    //   await updateDoc(jobRef, {
    //     datePaid: serverTimestamp(),
    //     tip: tip,
    //   });
    //   console.log('DatePaid and tip added to firestore');
    // }
    setIsLoading(false);
  };

  const handlePayNowPress = () => {
    paymentAlert.alert('Please confirm the amount');
  };
  const handlePayViaCash = () => {
    paymentAlert.alert('Pay via cash');
  };
  const handlePayViaCheck = () => {
    paymentAlert.alert('Pay via check');
  };

  console.log('amount from payment screen container', amount);

  return (
    <>
      <PaymentScreenPresenter
        onPayPress={handlePayNowPress}
        onPayViaCash={handlePayViaCash}
        onPayViaCheck={handlePayViaCheck}
      />
      <HomebaseAlert key="info" control={paymentAlert} renderButtonRow={renderActionButtons} isLoading={isLoading}>
        <View style={{ flex: 1, paddingHorizontal: 12, justifyContent: 'flex-start' }}>
          <View style={{ marginTop: 20, marginBottom: 10 }}>
            <Text style={{ textAlign: 'start', fontSize: 20, fontWeight: 'bold', marginLeft: 5 }}>Job Amount </Text>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 10,
              }}>
              <Text style={{ fontSize: 20, marginLeft: 5 }}>${amount.toFixed(2)}</Text>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ textAlign: 'start', fontSize: 20, fontWeight: 'bold', marginLeft: 5 }}>Add Tip </Text>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <Pressable
                onPress={() => {
                  setTip(0);
                  setSelectedTip('notip');
                }}
                style={[
                  {
                    backgroundColor: colors.gray200,
                    borderRadius: 10,
                    paddingVertical: 20,
                    paddingHorizontal: 10,
                    width: 82,
                  },
                  selectedTip === 'notip' ? { borderWidth: 2, borderColor: colors.gray900 } : {},
                ]}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                  }}>
                  No Tip
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setTip(amount * 0.1), setSelectedTip('ten');
                }}
                style={[
                  {
                    backgroundColor: colors.gray200,
                    borderRadius: 10,
                    paddingVertical: 20,
                    paddingHorizontal: 10,
                    width: 82,
                  },
                  selectedTip === 'ten' ? { borderWidth: 2, borderColor: colors.gray900 } : {},
                ]}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                  }}>
                  10%
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setTip(amount * 0.15);
                  setSelectedTip('fifteen');
                }}
                style={[
                  {
                    backgroundColor: colors.gray200,
                    borderRadius: 10,
                    paddingVertical: 20,
                    paddingHorizontal: 10,
                    width: 82,
                  },
                  selectedTip === 'fifteen' ? { borderWidth: 2, borderColor: colors.gray900 } : {},
                ]}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                  }}>
                  15%
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setTip(amount * 0.2);
                  setSelectedTip('twenty');
                }}
                style={[
                  {
                    backgroundColor: colors.gray200,
                    borderRadius: 10,
                    paddingVertical: 20,
                    paddingHorizontal: 10,
                    width: 82,
                  },
                  selectedTip === 'twenty' ? { borderWidth: 2, borderColor: colors.gray900 } : {},
                ]}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                  }}>
                  20%
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 20,
                paddingHorizontal: 10,
                backgroundColor: colors.gray200,
                borderRadius: 10,
              }}>
              <Pressable>
                <TextInput
                  style={{ textAlign: 'center', fontSize: 20 }}
                  onChangeText={text => {
                    setCustomTip(text);
                    setSelectedTip('custom');
                  }}
                  value={customTip}
                  keyboardType="numeric"
                  placeholder="Custom Tip"></TextInput>
              </Pressable>
            </View>
          </View>
          <View style={{ marginTop: 30 }}>
            <Text style={{ textAlign: 'start', fontSize: 20, fontWeight: 'bold', marginLeft: 5 }}>Total </Text>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 10,
              }}>
              <Pressable>
                <Text style={{ fontSize: 20, marginLeft: 5 }}>
                  ${!tip ? amount.toFixed(2) : (parseFloat(tip) + parseFloat(amount)).toFixed(2)}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </HomebaseAlert>
    </>
  );
};

export default PaymentScreenContainer;
