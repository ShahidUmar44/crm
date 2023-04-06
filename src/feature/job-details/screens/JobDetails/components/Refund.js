import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState, useContext } from 'react';
import { UserContext } from '../../../../../context/UserContext';
import Input from '../../../../../shared/form/Input';
import { node } from '../../../../../constants';
import { updateDoc, serverTimestamp, arrayUnion, doc } from 'firebase/firestore';
import { db } from '../../../../../utils/Firebase';
import moment from 'moment';
import { colors, spacing, typography } from '../../../../../theme';

const Refund = ({ payment, setPaymentHistory, calendarData, setModal }) => {
  const { userData } = useContext(UserContext);
  const [refundAmount, setRefundAmount] = useState((payment.totalAmountFromStripe / 100).toFixed(2));
  console.log('refundAmount', refundAmount);
  const [refundLoading, setRefundLoading] = useState(false);
  const [refundError, setRefundError] = useState(null);

  const jobRef = doc(db, 'businesses', userData.userData.businessId, 'jobs', calendarData.jobId);

  const handleRefundPayment = async () => {
    console.log('paymentIntentId', payment.paymentIntentId);
    console.log('paymentAmount', refundAmount * 100);
    console.log('stripeAccountId', userData.bizData.stripeAccountId);
    setRefundLoading(true);
    // console.log("emailForReceipt", emailForReceipt)
    try {
      const res = await fetch(`${node}/intents/refund`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentIntentId: payment.paymentIntentId,
          amount: refundAmount * 100,
          stripeAccountId: userData.bizData.stripeAccountId,
        }),
      });
      const { refund } = await res.json();
      console.log('data', refund);
      if (refund.status === 'succeeded') {
        // update the job details in the database
        console.log('refund succeeded');
        await updateDoc(jobRef, {
          paymentHistory: arrayUnion({
            amount: refundAmount,
            date: new Date(),
            refundId: refund.id,
            totalAmountFromStripe: refund.amount,
            status: refund.status,
            paymentIntentId: refund.payment_intent,
            billingType: 'Refund',
          }),
        });
        // update the job details in the state
        setPaymentHistory(prev => [
          ...(prev || []),
          {
            amount: refundAmount,
            date: new Date(),
            refundId: refund.id,
            totalAmountFromStripe: refund.amount,
            status: refund.status,
            paymentIntentId: refund.payment_intent,
            billingType: 'Refund',
          },
        ]);
        // close the modal

        setModal(false);
      } else {
        console.log('refund failed');
        setRefundError('Refund failed');
      }
    } catch (error) {
      console.log('error is here', error);
      setRefundError('Refund failed');
    }
    setRefundLoading(false);
  };

  return (
    <View style={{ ...styles.ListItemView, marginBottom: spacing.SCALE_10 }}>
      <View style={styles.contactInfoHeaderView}>
        <Text style={styles.contactInfoHeader}>Refund</Text>
      </View>
      <View style={styles.innerListItemView}>
        <Text>This payment will be refunded to the customer's card. This may take 3-5 business days.</Text>

        <Input
          placeholder="Enter refund amount"
          keyboardType="numeric"
          value={refundAmount}
          onChangeText={text => setRefundAmount(text)}
        />
        <View
          style={{
            backgroundColor: colors.gray200,
            borderRadius: spacing.SCALE_4,
            borderColor: colors.red400,
            borderWidth: 1,
            padding: spacing.SCALE_10,
            marginTop: spacing.SCALE_20,
            width: 100,
            flexDirections: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Pressable onPress={handleRefundPayment}>
            {refundLoading ? <ActivityIndicator size="small" /> : <Text>Refund</Text>}
          </Pressable>

          {refundError && <Text style={{ color: colors.red400 }}>{refundError}</Text>}
        </View>
      </View>
    </View>
  );
};

export default Refund;

const styles = StyleSheet.create({
  ListItemView: {
    marginTop: spacing.SCALE_10,
    borderRadius: spacing.SCALE_4,
    backgroundColor: colors.shadow,
    paddingBottom: spacing.SCALE_10,
  },
  contactInfoHeaderView: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: spacing.SCALE_4,
    borderTopRightRadius: spacing.SCALE_4,
  },
  contactInfoHeader: {
    fontSize: typography.FONT_SIZE_16,
    color: colors.whiteBackground,
    paddingLeft: spacing.SCALE_10,
    paddingVertical: spacing.SCALE_10,
  },
  innerListItemView: {
    marginHorizontal: spacing.SCALE_10,
    paddingHorizontal: spacing.SCALE_10,
    marginTop: spacing.SCALE_10,
    marginBottom: spacing.SCALE_10,
    borderRadius: spacing.SCALE_6,
  },
  crossIcon: {
    height: spacing.SCALE_16,
    width: spacing.SCALE_16,
    marginLeft: spacing.SCALE_10,
  },
});
