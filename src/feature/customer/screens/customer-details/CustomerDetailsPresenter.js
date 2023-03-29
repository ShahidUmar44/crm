import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import ListItems from './components/ListItems';
import ListEstimate from './components/ListEstimate';
import ListInvoice from './components/ListInvoice';
import CustomerDetails from './components/CustomerDetails';
import { colors, spacing, typography } from '../../../../theme';
import GoBackButton from '../../../../shared/buttons/GoBackButton';

const CustomerDetailsPresenter = ({ name, item, listJobsData, listEstimatesData, listInvoicesData }) => {
  const [state, setState] = useState({
    completeDetails: true,
    listItems: false,
    ListEstimate: false,
    ListInvoice: false,
  });
  useEffect(() => {
    if (name == 'NewJob') {
      setState({
        completeDetails: false,
        listItems: true,
        ListEstimate: false,
        ListInvoice: false,
      });
    }
    if (name == 'Estimate') {
      setState({
        completeDetails: false,
        listItems: false,
        ListEstimate: true,
        ListInvoice: false,
      });
    }
  }, [name]);

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <GoBackButton />
        <Text style={styles.header}>Customer Profile</Text>
      </View>
      <View style={styles.threeButtonsView}>
        <Pressable
          style={{ ...styles.button, backgroundColor: state.completeDetails ? colors.primary : colors.whiteBackground }}
          onPress={() =>
            setState({ completeDetails: true, listItems: false, ListEstimate: false, ListInvoice: false })
          }>
          <Text style={{ color: state.completeDetails ? colors.text : colors.primary }}>Details</Text>
        </Pressable>
        <Pressable
          style={{ ...styles.button, backgroundColor: state.listItems ? colors.primary : colors.whiteBackground }}
          onPress={() =>
            setState({ completeDetails: false, listItems: true, ListEstimate: false, ListInvoice: false })
          }>
          <Text style={{ color: state.listItems ? colors.text : colors.primary }}>Jobs</Text>
        </Pressable>
        <Pressable
          style={{ ...styles.button, backgroundColor: state.ListEstimate ? colors.primary : colors.whiteBackground }}
          onPress={() =>
            setState({ completeDetails: false, listItems: false, ListEstimate: true, ListInvoice: false })
          }>
          <Text style={{ color: state.ListEstimate ? colors.text : colors.primary }}>Estimates</Text>
        </Pressable>
        <Pressable
          style={{ ...styles.button, backgroundColor: state.ListInvoice ? colors.primary : colors.whiteBackground }}
          onPress={() =>
            setState({ completeDetails: false, listItems: false, ListEstimate: false, ListInvoice: true })
          }>
          <Text style={{ color: state.ListInvoice ? colors.text : colors.primary }}>Invoices</Text>
        </Pressable>
      </View>
      {state.completeDetails && <CustomerDetails item={item} />}
      {state.listItems && <ListItems data={listJobsData} />}
      {state.ListEstimate && <ListEstimate data={listEstimatesData} />}
      {state.ListInvoice && <ListInvoice data={listInvoicesData} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.SCALE_10,
    paddingHorizontal: '5%',
  },
  header: {
    fontSize: typography.FONT_SIZE_20,
    fontFamily: typography.secondary,
    color: colors.primaryDarker,
    marginLeft: '30%',
  },
  threeButtonsView: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    marginVertical: spacing.SCALE_20,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.SCALE_10,
    paddingVertical: spacing.SCALE_6,
    borderRadius: spacing.SCALE_30,
    marginRight: spacing.SCALE_10,
  },
});
export default CustomerDetailsPresenter;
