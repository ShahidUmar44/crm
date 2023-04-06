import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

import moment from 'moment';
import Input from '../../../../../shared/form/Input';
import { colors, spacing, typography } from '../../../../../theme';

import editIcon from '../../../../../../assets/images/edit-light.png';

const PaymentHistory = ({ paymentHistory, handleRefundClick }) => {
  return (
    <View style={styles.container}>
      <View style={styles.jobSourceView}>
        <View style={styles.headerView}>
          <Text style={styles.header}>Payment History</Text>
          {/* <Pressable onPress={() => setModal(true)}>
            <Image style={styles.editIcon} source={editIcon} />
          </Pressable> */}
        </View>
        <View style={styles.dispatchCard}>
          {paymentHistory &&
            paymentHistory.length > 0 &&
            paymentHistory
              .slice()
              .sort((a, b) => {
                const aDate = a.date instanceof Date ? a.date.getTime() : (a.date?.seconds || 0) * 1000;
                const bDate = b.date instanceof Date ? b.date.getTime() : (b.date?.seconds || 0) * 1000;
                return aDate - bDate;
              })
              .map((payment, key) => (
                <View
                  style={{
                    flexDirection: 'column',
                    paddingBottom: spacing.SCALE_10,
                    borderBottomColor: colors.gray200,
                    borderBottomWidth: 1,
                  }}
                  key={key}>
                  <View style={styles.paymentItem}>
                    <Text style={{ fontSize: typography.FONT_SIZE_14, color: colors.primary }}>
                      {payment.date && payment.date.seconds
                        ? moment(new Date(payment.date.seconds * 1000)).format('MM/DD/YYYY, hh:mm A')
                        : payment.date instanceof Date && moment(payment.date).format('MM/DD/YYYY, hh:mm A')}
                    </Text>
                    {payment.captureMethod && payment.status === 'succeeded' && (
                      <View
                        style={{
                          borderColor: colors.gray200,
                          borderWidth: 1,
                          borderRadius: spacing.SCALE_4,
                          paddingHorizontal: spacing.SCALE_8,
                          paddingVertical: spacing.SCALE_4,
                          justifyContent: 'center',
                          shadowColor: colors.gray500,
                          shadowOffset: {
                            width: 1,
                            height: 2,
                          },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          elevation: 5,
                        }}>
                        <Pressable onPress={() => handleRefundClick(payment)}>
                          <Text style={{ fontSize: typography.FONT_SIZE_14, color: colors.gray700 }}>Refund</Text>
                        </Pressable>
                      </View>
                    )}
                  </View>
                  <View style={styles.paymentItem}>
                    <Text style={{ fontSize: typography.FONT_SIZE_14, color: colors.primary }}>Status</Text>
                    {payment.paymentMethod && payment.status === 'succeeded' ? (
                      <Text style={{ fontSize: typography.FONT_SIZE_14, color: colors.green500 }}>
                        {payment.status.slice(0, 1).toUpperCase() + payment.status.slice(1)}
                      </Text>
                    ) : (
                      <Text style={{ fontSize: typography.FONT_SIZE_14, color: colors.primary }}>
                        {payment.status.slice(0, 1).toUpperCase() + payment.status.slice(1)}
                      </Text>
                    )}
                  </View>
                  <View style={styles.paymentItem}>
                    <Text style={{ fontSize: typography.FONT_SIZE_14, color: colors.primary }}>Type</Text>
                    {payment.billingType === 'Refund' ? (
                      <Text style={{ fontSize: typography.FONT_SIZE_14, color: colors.red500 }}>Refund</Text>
                    ) : (
                      <Text style={{ fontSize: typography.FONT_SIZE_14, color: colors.primary }}>
                        {payment.billingType.slice(0, 1).toUpperCase() + payment.billingType.slice(1)}
                      </Text>
                    )}
                  </View>

                  {payment.paymentNote && (
                    <View style={styles.paymentItem}>
                      <Text style={{ fontSize: typography.FONT_SIZE_14, color: colors.primary }}>Note</Text>
                      <Text style={{ fontSize: typography.FONT_SIZE_14, color: colors.primary }}>
                        {payment.paymentNote}
                      </Text>
                    </View>
                  )}
                  <View style={styles.paymentItem}>
                    <Text style={{ fontSize: typography.FONT_SIZE_14, color: colors.primary }}>Amount</Text>
                    <Text style={{ fontSize: typography.FONT_SIZE_14, color: colors.primary }}>
                      ${(payment.totalAmountFromStripe / 100).toFixed(2)}
                    </Text>
                  </View>
                </View>
              ))}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: spacing.SCALE_10,
  },
  jobSourceView: {
    borderRadius: spacing.SCALE_4,
    marginTop: spacing.SCALE_20,
    backgroundColor: colors.shadow,
    width: '100%',
    paddingBottom: spacing.SCALE_4,
  },
  headerView: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: spacing.SCALE_4,
    borderTopRightRadius: spacing.SCALE_4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: spacing.SCALE_10,
  },
  header: {
    fontSize: typography.FONT_SIZE_16,
    color: colors.whiteBackground,
    paddingLeft: spacing.SCALE_10,
    paddingVertical: spacing.SCALE_10,
  },
  noteBox: {
    backgroundColor: colors.whiteBackground,
    marginHorizontal: '5%',
    borderRadius: 5,
    alignItems: 'center',
    padding: spacing.SCALE_10,
    marginTop: spacing.SCALE_10,
  },
  icon: {
    height: spacing.SCALE_20,
    width: spacing.SCALE_20,
    marginRight: spacing.SCALE_10,
  },
  noteHeading: {
    fontSize: typography.FONT_SIZE_16,
  },
  noteHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.SCALE_10,
  },
  dispatchCard: {
    backgroundColor: colors.whiteBackground,
    marginHorizontal: spacing.SCALE_20,
    padding: spacing.SCALE_10,
    paddingBottom: spacing.SCALE_20,
    marginTop: spacing.SCALE_20,
    borderRadius: spacing.SCALE_6,
    marginBottom: spacing.SCALE_20,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.SCALE_10,
  },
  editIcon: {
    height: spacing.SCALE_20,
    width: spacing.SCALE_20,
    marginRight: 0,
  },
});
export default PaymentHistory;
