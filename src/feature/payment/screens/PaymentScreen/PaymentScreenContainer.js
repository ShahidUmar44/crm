import React, { useState, useContext } from 'react';
import { View } from 'react-native';
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

const PaymentScreenContainer = ({ route }) => {
  const { userData } = useContext(UserContext);
  const totalAmount = route?.params?.totalAmount;
  const jobId = route?.params?.jobId;
  const navigation = useNavigation();
  const paymentAlert = useAlertControl();
  const [amount, setAmount] = useState(totalAmount ? `${totalAmount}` : 499);
  const [tip, setTip] = useState(0);
  const { confirmPayment, loading } = useConfirmPayment();

  console.log('amount', amount);

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
    } else if (paymentIntent) {
      console.log('Success from promise', JSON.stringify(paymentIntent, null, 2));
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

  return (
    <>
      <PaymentScreenPresenter
        onPayPress={handlePayNowPress}
        onPayViaCash={handlePayViaCash}
        onPayViaCheck={handlePayViaCheck}
      />
      <HomebaseAlert key="info" control={paymentAlert} renderButtonRow={renderActionButtons}>
        <View style={{ flex: 1, paddingHorizontal: 12, backgroundCOlor: 'red', justifyContent: 'center' }}>
          <Input
            value={amount}
            editable={false}
            onChangeText={setAmount}
            placeholder={'Amount'}
            keyboardType="numeric"
          />
          <Input value={tip} onChangeText={setTip} placeholder={'Tip (optional)'} keyboardType="numeric" />
          <Input
            value={!tip ? totalAmount?.toString() : (parseInt(tip) + totalAmount).toString()}
            editable={false}
            placeholder={'totalAmount'}
            keyboardType="numeric"
          />
        </View>
      </HomebaseAlert>
    </>
  );
};

export default PaymentScreenContainer;
