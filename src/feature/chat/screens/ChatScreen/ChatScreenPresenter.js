import React, { useState, useCallback, useEffect, useLayoutEffect, useContext } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
  updateDoc,
  where,
  setDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';

import { auth, db } from '../../../../utils/Firebase';
import { node } from '../../../../constants/index';
import { UserContext } from '../../../../context/UserContext';
import { colors, spacing, typography } from '../../../../theme';
import GoBackButton from '../../../../shared/buttons/GoBackButton';

const ChatScreenPresenter = ({ phone, name }) => {
  const { userData } = useContext(UserContext);
  const [messages, setMessages] = useState([]);

  console.log('phone', phone);
  console.log('name', name);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ]);
  // }, []);

  useLayoutEffect(() => {
    const messagesRef = collection(db, 'businesses', userData.bizData.id, 'conversations', phone, 'messages');

    const q = query(messagesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      console.log('querySnapshot unsusbscribe');
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id);
      //   console.log(doc.data().createdAt.toString());
      //   console.log(doc.data().text);
      // });
      setMessages(
        querySnapshot.docs.map(doc => ({
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
          _id: doc.data()._id,
          image: doc.data().imageUrl,
        })),
      );
    });
    return unsubscribe;
  }, []);

  const onSend = useCallback(async (messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

    const { _id, createdAt, text, user, image } = messages[0];

    console.log('sending message', text);
    console.log('sending to name', name);

    try {
      const response = await fetch(`${node}/messages/twilioSend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: phone,
          from: userData.bizData.twilioNumber,
          message: text,
          bizId: userData.bizData.id,
          bizName: userData.bizData.companyName,
          customerName: name,
          mediaUrl: null,
        }),
      });
      if (response.ok) {
        console.log('response:', response);
      }
    } catch (error) {
      console.log('error:', error);
    }
  }, []);

  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" hidden={false} />
      <View style={{ flex: 1 }}>
        <View style={styles.headerWrapper}>
          <View style={{ flex: 1 }}>
            <GoBackButton />
          </View>
          <Text style={styles.header}>
            {name || '(' + phone.substring(2, 5) + ') ' + phone.substring(5, 8) + '-' + phone.substring(8, 12)}
          </Text>
          <View style={{ flex: 1 }} />
        </View>
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: userData.userData.businessId,
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.whiteBackground,
  },
  headerWrapper: {
    flex: 0.06,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.SCALE_10,
  },
  header: {
    flex: 1,
    textAlign: 'center',
    color: colors.primaryDarker,
    fontFamily: typography.secondary,
    fontSize: typography.FONT_SIZE_20,
  },
});

export default ChatScreenPresenter;
