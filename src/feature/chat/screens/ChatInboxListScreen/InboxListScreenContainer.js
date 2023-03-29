import React from 'react';
import { SCREENS } from '../../../../constants';
import InboxListScreenPresenter from './InboxListScreenPresenter';

const InboxListScreenContainer = ({ navigation }) => {
  const handleInboxPress = item => {
    console.log('item', item);
    console.log('item.displayName', item.displayName);
    navigation.navigate(SCREENS.CHAT, {
      phone: item.phone,
      name: item.displayName,
    });
  };

  return <InboxListScreenPresenter onInboxPress={handleInboxPress} navigation={navigation} />;
};

export default InboxListScreenContainer;
