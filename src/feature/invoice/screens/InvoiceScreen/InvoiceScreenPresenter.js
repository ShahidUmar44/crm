import React, { useContext, useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, doc, setDoc, updateDoc, serverTimestamp, increment } from 'firebase/firestore';
import { db } from '../../../../utils/Firebase';
import { node } from '../../../../constants/index';
import moment from 'moment';

import { SCREENS } from '../../../../constants';
import BigButton from '../../../../shared/buttons/BigButton';
import { colors, spacing, typography } from '../../../../theme';
import { UserContext } from '../../../../context/UserContext';
import GoBackButton from '../../../../shared/buttons/GoBackButton';

import loadingIcon from '../../../../../assets/images/loading.png';
import checkedGreen from '../../../../../assets/images/checkedGreen.png';

const InvoiceScreenPresenter = ({ jobDetails }) => {
  const { userData } = useContext(UserContext);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const spinValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      spinValue.setValue(0);
    }
  }, [loading, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // const jobDetails = {
  //   businessId: 'xsUrbqrcTQSyFjJOtpEZyC0BUUK2',
  //   customer: {
  //     address: ['4625 35th Street, San Diego, CA 92116'],
  //     businessId: 'xsUrbqrcTQSyFjJOtpEZyC0BUUK2',
  //     customerId: '71Nwq7pLEYHJuLyeKO5G',
  //     dateAdded: '2023-03-11T16:31:20-08:00',
  //     displayName: 'Derick DeCesare',
  //     email: ['deerriicckk@gmail.com'],
  //     firstName: 'Derick',
  //     lastJob: '2023-03-22T12:02:23-07:00',
  //     lastName: 'DeCesare',
  //     lastUpdated: '2023-03-11T16:31:20-08:00',
  //     notes: 'This is the reincarnated derick',
  //     notifications: true,
  //     phone: {
  //       additional: '',
  //       home: '',
  //       mobile: '+13038286690',
  //       work: '',
  //     },
  //   },
  //   dateAdded: '2023-03-22T12:06:56-07:00',
  //   dispatchedTo: [
  //     {
  //       businessId: 'xsUrbqrcTQSyFjJOtpEZyC0BUUK2',
  //       createdAt: '2023-03-10T08:49:04-08:00',
  //       email: 'derick.decesare@gmail.com',
  //       firstName: 'Derick',
  //       id: 'xsUrbqrcTQSyFjJOtpEZyC0BUUK2',
  //       isAdmin: true,
  //       lastName: 'DeCesare',
  //       phone: '+13038286690',
  //       stripeAccountId: 'acct_1MkddhBSAB04s2b4',
  //       userType: 'Admin',
  //     },
  //   ],
  //   end: '2023-03-23T21:00:00-07:00',
  //   jobId: 'YkhJMQ1Ixo84soVrbleQ',
  //   jobTotal: 199,
  //   lastUpdated: '2023-03-22T12:06:56-07:00',
  //   leadSource: {
  //     online: true,
  //   },
  //   lineItems: [
  //     {
  //       description: '',
  //       name: 'Window CLeaning',
  //       quantity: 1,
  //       unitPrice: '199',
  //     },
  //   ],
  //   note: 'Notes!',
  //   start: '2023-03-23T19:00:00-07:00',
  //   timezone: 'America/Los_Angeles',
  // };

  async function handleSendInvoice() {
    //update firestore document with invoiceSentTime
    console.log('handleSendInvoice');
    console.log('userData', userData);
    setLoading(true);
    try {
      //create invoice in firestore - this is the situation where the invoice is created for the first time
      if (!jobDetails || !userData || !userData.bizData) return;
      let trueInvoiceId = '';
      // check if an invoice exists connected to the job (the invoiceId is in the job doc)
      if (jobDetails?.invoiceId) {
        trueInvoiceId = jobDetails.invoiceId;
        //if it does, update the invoice with the new status
        console.log('invoice exists, updating it now', trueInvoiceId);
        const previousInvoiceRef = doc(
          db,
          'businesses',
          userData.userData?.businessId,
          'invoices',
          jobDetails.invoiceId,
        );

        await updateDoc(previousInvoiceRef, {
          numberOfTimesSent: increment(1),
          invoiceSentTime: serverTimestamp(),
          amount: jobDetails?.jobTotal,
          lineItems: jobDetails?.lineItems,
        });
      } else {
        console.log('no invoice exists, creating one now');
        const invoiceRef = doc(collection(db, 'businesses', userData.userData?.businessId, 'invoices'));
        trueInvoiceId = invoiceRef.id;
        console.log('invoiceRef.id', invoiceRef.id);
        const invoiceData = {
          invoiceId: invoiceRef.id,
          jobId: jobDetails?.jobId,
          businessId: userData.userData.businessId,
          businessName: userData.bizData.companyName,
          businessAddress: userData.bizData.address,
          businessPhone: userData.bizData.companyPhone,
          businessEmail: userData.bizData.email,
          stripeAccountId: userData.bizData.stripeAccountId,
          dueDate: serverTimestamp(),
          customerId: jobDetails?.customer?.customerId,
          customerName: jobDetails?.customer?.displayName,
          customerEmail: jobDetails?.customer?.email,
          customerPhone: jobDetails?.customer?.phone?.mobile,
          amount: jobDetails?.jobTotal,
          status: 'sent',
          billingType: 'digital invoice',
          lineItems: jobDetails?.lineItems,
          serviceDate: jobDetails?.start,
          invoiceSentTime: serverTimestamp(),
          numberOfTimesSent: 1,
          invoicePaid: false,
        };
        await setDoc(invoiceRef, invoiceData);
        //update job document with invoiceSentTime
        const jobRef = doc(db, 'businesses', userData.userData?.businessId, 'jobs', jobDetails?.jobId);
        await updateDoc(jobRef, {
          invoiceId: invoiceRef.id,
          invoiceSentTime: serverTimestamp(),
          numberOfTimesSent: 1,
        });
      }

      //send invoice to customer via text
      const message = `Here is our invoice. We appreciate your business. \n\n- ${userData.bizData?.companyName} \n\nhttps://app.homebase360.io/invoice?uid=${userData?.userData?.businessId}&invoiceId=${trueInvoiceId}`;
      const to = jobDetails?.customer?.phone?.mobile;
      const from = userData.bizData?.twilioNumber;
      const businessId = userData.bizData?.id;
      const companyName = userData.bizData?.companyName;
      const customerName = jobDetails?.customer?.displayName;
      if (!from) {
        alert(
          'Your business phone number has not been set up to send messages, yet please allow 24 hours for this to be set up. You invoice will be sent via email.',
        );
      }
      if (to && from && businessId && companyName) {
        try {
          const response = await fetch(`${node}/messages/twilioSend`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: to,
              from: from,
              message: message,
              bizName: companyName,
              bizId: businessId,
              customerName: customerName,
            }),
          });
          const responseData = await response.json();
          console.log(responseData);
          setSuccess(true);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log('missing data');
      }

      // send invoice to customer via email
      const customerEmail = jobDetails?.customer?.email[0];

      const emailResponse = await fetch(`${node}/invoice/send-invoice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invoiceId: trueInvoiceId,
          businessId: userData?.userData?.businessId,
          customerEmail: customerEmail,
          businessEmail: userData?.bizData?.email,
          businessName: userData?.bizData?.companyName,
          customerName: jobDetails?.customer?.displayName,
          amount: jobDetails?.jobTotal,
        }),
      });

      const emailResponseData = await emailResponse.json();
      console.log(emailResponseData);
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);

    //navigate back
    navigation.goBack();
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  }

  // const invoiceObject = lineItem
  //   ? {
  //       lineItems: [...lineItem?.seriveces, ...lineItem?.materials],
  //       totalAmount: lineItem?.totalAmount,
  //       discount: lineItem?.discount?.discount,
  //     }
  //   : {
  //       lineItems: [
  //         { totalUnits: 1, piecePrice: 199 },
  //         { totalUnits: 1, piecePrice: 100 },
  //       ],
  //       totalAmount: 299,
  //       discount: 0,
  //     };

  // console.log('🚀 ~ file: InvoiceScreenPresenter.js:14 ~ InvoiceScreenPresenter ~ invoiceObject:', invoiceObject);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerWrapper}>
          <GoBackButton />
          <View />
          <View />
        </View>
        <View style={styles.header}>
          <Text style={styles.title}>Invoice</Text>
        </View>
        <View style={styles.details}>
          <View style={styles.detail}>
            <Text style={styles.detailTitle}>Invoice Date:</Text>
            <Text style={styles.detailValue}>{moment(new Date()).format('MMMM DD, YYYY')}</Text>
          </View>
          {/* <View style={styles.detail}>
            <Text style={styles.detailTitle}>Due Date:</Text>
            <Text style={styles.detailValue}>March 31, 2023</Text>
          </View> */}
          <View style={styles.detail}>
            <Text style={styles.detailTitle}>Customer:</Text>
            <Text style={styles.detailValue}>{jobDetails?.customer?.displayName}</Text>
          </View>
          {/* <View style={styles.detail}>
            <Text style={styles.detailTitle}>Amount Due:</Text>
            <Text style={styles.detailValue}>$1,234.56</Text>
          </View> */}
        </View>
        <View style={styles.line} />
        <View style={styles.items}>
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>Quantity</Text>
            <Text style={styles.itemTitle}>Unit price</Text>
            <Text style={styles.itemTitle}>Total</Text>
          </View>
          {jobDetails?.lineItems &&
            jobDetails.lineItems.length > 0 &&
            jobDetails.lineItems.map((item, key) => {
              return (
                <View style={styles.item} key={key}>
                  <Text style={styles.itemQuantity}>{item.quantity}</Text>
                  <Text style={styles.itemPrice}>$ {item.unitPrice}</Text>
                  <Text style={styles.itemTotal}>${(item.quantity * item.unitPrice).toFixed(2)}</Text>
                </View>
              );
            })}
        </View>
        <View style={styles.line} />

        <View style={styles.total}>
          <Text style={styles.totalTitle}>Total:</Text>
          <Text style={styles.totalValue}>${jobDetails?.jobTotal ? jobDetails.jobTotal.toFixed(2) : ''}</Text>
        </View>
        {/* <BigButton
          onPress={() =>
            navigation.navigate(SCREENS.ADD_INVOICE, {
              totalAmount: invoiceObject?.totalAmount - invoiceObject?.discount,
            })
          }>
          <Text style={styles.buttonText}>Next</Text>
        </BigButton> */}
        <BigButton onPress={() => handleSendInvoice()}>
          {success ? (
            <>
              <Image source={checkedGreen} style={{ width: 30, height: 30 }} />
            </>
          ) : (
            <>
              {loading ? (
                <Animated.Image
                  source={loadingIcon}
                  style={{
                    width: 30,
                    height: 30,
                    transform: [{ rotate: spin }],
                  }}
                />
              ) : (
                <Text style={styles.buttonText}>Send</Text>
              )}
            </>
          )}
        </BigButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
  },
  details: {
    marginBottom: 20,
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 16,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  items: {
    marginBottom: 20,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '33%',
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemDescription: {
    fontSize: 16,
    width: '50%',
  },
  itemQuantity: {
    fontSize: 16,
    width: '33%',
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 16,
    width: '33%',
    textAlign: 'center',
  },
  itemTotal: {
    fontSize: 16,
    width: '33%',
    textAlign: 'center',
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: spacing.SCALE_10,
    marginBottom: spacing.SCALE_30,
  },
  totalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  headerWrapper: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonText: {
    color: colors.text,
    fontSize: typography.FONT_SIZE_18,
    fontWeight: typography.FONT_WEIGHT_BOLD,
  },
});

export default InvoiceScreenPresenter;
