import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function SuccessScreen({ route }) {
  const jobDetails = route?.params?.jobDetails;

  const navigation = useNavigation();

  const navigateBackToJobDetails = () => {
    console.log('jobDetails', jobDetails);
    navigation.navigate('Schedule', {
      screen: 'JobDetails',
      params: {
        calendarData: jobDetails,
      },
    });
  };

  //   const resetChatStack = () => {
  //     navigation.dispatch(
  //       CommonActions.reset({
  //         index: 0,
  //         routes: [{ name: SCREENS.CHAT_INBOX_LIST }],
  //       }),
  //     );
  //   };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Successful</Text>
      <Text style={styles.message}>Your payment has been processed successfully.</Text>
      <Pressable style={styles.okButton} onPress={navigateBackToJobDetails}>
        <Text style={styles.okButtonText}>Ok</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
  },
  okButton: {
    backgroundColor: '#111827',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 5,
  },
  okButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
