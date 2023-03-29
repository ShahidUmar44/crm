import React from 'react';

import ChatScreenPresenter from './ChatScreenPresenter';

const ChatScreenContainer = ({ route }) => {
  return (
    <ChatScreenPresenter
      phone={route?.params?.phone}
      name={route?.params?.name}
      fromJobDetails={route?.params?.fromJobDetails}
      calendarData={route?.params?.calendarData}
    />
  );
};

export default ChatScreenContainer;
