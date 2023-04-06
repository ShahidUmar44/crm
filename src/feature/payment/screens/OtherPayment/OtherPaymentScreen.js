import React, { useState, useContext } from 'react';
import { UserContext } from '../../../../context/UserContext';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import { colors } from '../../../../theme';
import { getDoc, doc, updateDoc, serverTimestamp, arrayUnion } from 'firebase/firestore';
import { db } from '../../../../utils/Firebase';
import { node } from '../../../../constants';
import { SCREENS } from '../../../../constants';

const OtherPaymentScreen = ({ route }) => {
  const jobDetails = route?.params?.jobDetails;
  const { userData } = useContext(UserContext);

  console.log('jobDetails from otherpayment screen:', jobDetails.customer.email[0]);
  console.log(jobDetails.jobTotal);

  const navigation = useNavigation();

  const [selectedTab, setSelectedTab] = useState('cash');
  const [otherOption, setOtherOption] = useState('alternative-payment');
  const [paymentNote, setPaymentNote] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(jobDetails?.jobTotal.toFixed(2) || '');
  const [emailForReceipt, setEmailForReceipt] = useState(jobDetails?.customer?.email?.[0] || '');

  const navigateBackToJobDetails = () => {
    console.log('jobId sending back to job details', jobDetails.jobId);
    navigation.navigate(SCREENS.SCHEDULE, {
      screen: SCREENS.JOBDETAILS,
      params: {
        calendarData: jobDetails,
      },
    });
  };
  const handlePaid = async () => {
    // Implement your handlePaid functionality here
    console.log('handlePaid');
    const jobRef = doc(db, 'businesses', userData?.userData?.businessId, 'jobs', jobDetails?.jobId);
    try {
      await updateDoc(jobRef, {
        paymentHistory: arrayUnion({
          status: 'paid',
          billingType: selectedTab,
          date: new Date(),
          jobId: jobDetails?.jobId,
          paymentNote: paymentNote,
          otherOption: otherOption,
          totalAmountFromStripe: paymentAmount * 100,
        }),
        status: 'paid',
        datePaid: new Date(),
      });
      console.log('database updated');
    } catch (error) {
      console.log('database not been updated', error);
    }
    navigateBackToJobDetails(); // we need to refresh job details somehow
  };

  const renderPaymentNoteInput = () => (
    <View style={styles.inputContainer}>
      <Text
        style={{
          fontSize: 16,
          color: colors.gray700,
          fontWeight: 'bold',
        }}>
        Payment note
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Payment note"
        value={paymentNote}
        onChangeText={text => setPaymentNote(text)}
      />
    </View>
  );

  const renderPaymentAmountInput = () => (
    <View style={styles.inputContainer}>
      <Text
        style={{
          fontSize: 16,
          color: colors.gray700,
          fontWeight: 'bold',
        }}>
        Payment amount
      </Text>
      <TextInput
        style={styles.paymentAmountInput}
        placeholder="Payment amount"
        value={paymentAmount}
        onChangeText={text => setPaymentAmount(text)}
      />
    </View>
  );

  const renderEmailForReceiptInput = () => (
    <View style={styles.inputContainer}>
      <Text
        style={{
          fontSize: 16,
          color: colors.gray700,
          fontWeight: 'bold',
        }}>
        Email for receipt
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email for receipt"
        value={emailForReceipt}
        onChangeText={text => setEmailForReceipt(text)}
      />
    </View>
  );

  const renderPaidButton = () => (
    <TouchableOpacity style={styles.paidButton} onPress={handlePaid}>
      <Text style={styles.paidButtonText}>Pay</Text>
    </TouchableOpacity>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'cash' && styles.selectedTab]}
            onPress={() => setSelectedTab('cash')}>
            <Text style={styles.tabText}>Cash</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'check' && styles.selectedTab]}
            onPress={() => setSelectedTab('check')}>
            <Text style={styles.tabText}>Check</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'e-transfer' && styles.selectedTab]}
            onPress={() => setSelectedTab('e-transfer')}>
            <Text style={styles.tabText}>E-transfer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'other' && styles.selectedTab]}
            onPress={() => setSelectedTab('other')}>
            <Text style={styles.tabText}>Other</Text>
          </TouchableOpacity>
        </View>

        {selectedTab !== 'other' && (
          <>
            {renderPaymentAmountInput()}
            {renderEmailForReceiptInput()}
            {renderPaymentNoteInput()}
            {renderPaidButton()}
          </>
        )}

        {selectedTab === 'other' && (
          <>
            <View style={styles.otherOptionsContainer}>
              <TouchableOpacity style={styles.radioOption} onPress={() => setOtherOption('warrant-work')}>
                <RadioButton value="warrant-work" status={otherOption === 'warrant-work' ? 'checked' : 'unchecked'} />
                <Text style={styles.radioOptionText}>Warranty Work</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.radioOption} onPress={() => setOtherOption('homeowner-financing')}>
                <RadioButton
                  value="homeowner-financing"
                  status={otherOption === 'homeowner-financing' ? 'checked' : 'unchecked'}
                />
                <Text style={styles.radioOptionText}>Homeowner Financing</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.radioOption} onPress={() => setOtherOption('alternative-payment')}>
                <RadioButton
                  value="alternative-payment"
                  status={otherOption === 'alternative-payment' ? 'checked' : 'unchecked'}
                />
                <Text style={styles.radioOptionText}>Alternative Payment</Text>
              </TouchableOpacity>
            </View>
            {renderPaymentNoteInput()}
            {renderPaidButton()}
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default OtherPaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: '40%',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  tab: {
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  selectedTab: {
    backgroundColor: '#ccc',
  },
  tabText: {
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    height: 55,
  },
  paymentAmountInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    height: 55,
    width: '50%',
  },
  paidButton: {
    backgroundColor: colors.gray800,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 55,
  },
  paidButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  otherOptionsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  radioOptionText: {
    fontSize: 16,
    marginLeft: 8,
  },
});
