import React from 'react';

import ChatScreenPresenter from './ChatScreenPresenter';

const ChatScreenContainer = ({ route }) => {
  return <ChatScreenPresenter phone={route?.params?.phone} name={route?.params?.name} />;
};

export default ChatScreenContainer;
