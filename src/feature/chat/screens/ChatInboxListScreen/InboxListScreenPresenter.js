import React, { useState, useLayoutEffect, useContext, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import { collection, orderBy, query, onSnapshot, getDocs } from 'firebase/firestore';

import { db } from '../../../../utils/Firebase';
import Input from '../../../../shared/form/Input';
import { colors, spacing } from '../../../../theme';
import { UserContext } from '../../../../context/UserContext';

import CustomerCardChat from '../../../../components/CustomerCardChat';
import EmptyListCard from '../../../employee/components/EmptyListCard';

import SearchIcon from '../../../../../assets/images/search-icon.png';
import newMessage from '../../../../../assets/images/new-message.png';
import { SCREENS } from '../../../../constants';

const ChatInboxListScreen = ({ onInboxPress, navigation }) => {
  const { userData } = useContext(UserContext);
  const [chats, setChats] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredChats, setFilteredChats] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchCustomers, setSearchCustomers] = useState('');
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    async function getCustomers() {
      const customersRef = collection(db, 'businesses', userData.userData.businessId, 'customers');
      const q = query(customersRef);
      const querySnapshot = await getDocs(q);
      const customers = querySnapshot.docs.map(doc => doc.data());
      setCustomers(customers);
    }
    getCustomers();
  }, []);

  useEffect(() => {
    setFilteredCustomers(customers);
  }, [customers]);

  useEffect(() => {
    setFilteredChats(chats);
  }, [chats]);

  function filterChats(input, chats) {
    const filtered = chats.filter(item => {
      return item.displayName?.toLowerCase().includes(input.toLowerCase()) || item.phone?.includes(input);
    });
    setFilteredChats(filtered);
  }

  useLayoutEffect(() => {
    const collectionRef = collection(db, 'businesses', userData.userData.businessId, 'conversations');
    const q = query(collectionRef, orderBy('lastMessageTime', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      console.log('querySnapshot unsusbscribe');
      setChats(
        querySnapshot.docs.map(doc => ({
          phone: doc.data().phone,
          timeStamp: new Date(doc.data().seconds * 1000),
          displayName: doc.data().displayName,
          lastMessage: doc.data().lastMessage,
          read: doc.data().read,
          id: doc.id,
        })),
      );
    });
    return unsubscribe;
  }, []);

  const renderChatItem = ({ item }) => (
    <TouchableOpacity activeOpacity={0.7} onPress={() => onInboxPress(item)}>
      <View style={styles.chatItem}>
        <View style={styles.chatUserInfo}>
          <View style={styles.chatUserImage}>
            <Text style={styles.chatUserInitials}>{item.displayName.substring(0, 2).toUpperCase()}</Text>
          </View>
          <View style={styles.chatUserDetails}>
            <Text style={styles.chatUserName}>
              {item.displayName ||
                '(' +
                  item?.phone.substring(2, 5) +
                  ') ' +
                  item?.phone.substring(5, 8) +
                  '-' +
                  item?.phone.substring(8, 12)}
            </Text>
            <Text style={styles.chatLastMessage}>{item.lastMessage.slice(0, 46)}</Text>
          </View>
        </View>
        <View style={styles.chatMessageDetails}>
          <Text style={styles.chatTime}>{item.read ? `` : '•'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleSearch = text => {
    setSearchText(text);
    // Perform a search on your chat data to filter by text
    filterChats(text, chats);
  };

  const handleCustomerSearch = text => {
    setSearchCustomers(text);
    // Perform a search on your customer data to filter by text
    filterCustomers(text, customers);
  };
  function filterCustomers(input, customers) {
    const filtered = customers.filter(item => {
      return item.displayName?.toLowerCase().includes(input.toLowerCase()) || item.phone?.mobile?.includes(input);
    });
    setFilteredCustomers(filtered);
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Input
          value={searchText}
          onChangeText={text => handleSearch(text, chats)}
          error={''}
          width="90%"
          leftImage={SearchIcon}
          placeholder={'Search conversations'}
          height={spacing.SCALE_44}
          borderRadius={spacing.SCALE_22}
          backgroundColor={colors.shadow}
        />
        <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
          <Image source={newMessage} style={styles.addIcon} />
        </TouchableOpacity>
      </View>
      <FlatList data={filteredChats} renderItem={renderChatItem} keyExtractor={item => item.id} />
      <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={toggleModal}>
        <View style={styles.modalContainer}>
          {/* Add your content and functionalities for selecting a new customer here */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Create Conversation</Text>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Input
              value={searchCustomers}
              onChangeText={text => handleCustomerSearch(text, customers)}
              error={''}
              width="90%"
              leftImage={SearchIcon}
              placeholder={'Search customers'}
              height={spacing.SCALE_44}
              borderRadius={spacing.SCALE_22}
              backgroundColor={colors.shadow}
            />
          </View>
          <ScrollView contentContainerStyle={styles.customerListContainer}>
            <FlatList
              data={filteredCustomers}
              style={{ width: '100%' }}
              renderItem={({ item }) => (
                <CustomerCardChat
                  onPressCard={() => {
                    navigation.navigate(SCREENS.CHAT, {
                      phone: item.phone.mobile,
                      name: item.displayName,
                    });
                    toggleModal();
                  }}
                  item={item}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={EmptyListCard}
              contentContainerStyle={{ flex: filteredCustomers.length ? 0 : 1, paddingTop: spacing.SCALE_10 }}
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'start',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    paddingTop: 100,
  },
  modalHeader: {
    width: '100%',
    height: 100,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    paddingHorizontal: 16,
    top: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {},
  closeButtonText: {
    color: '#000000',
    fontSize: 16,
  },
  image: {
    width: 50,
    height: 50,
  },
  searchBar: {
    height: 48,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginBottom: 10,
  },
  addButton: {
    marginLeft: 10,
    marginTop: 10,
  },
  addIcon: {
    width: 32,
    height: 32,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  chatUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  chatUserImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatUserInitials: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  chatUserDetails: {
    flex: 1,
  },
  chatUserName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  chatLastMessage: {
    color: '#999',
    fontSize: 14,
    marginTop: 4,
  },
  chatMessageDetails: {
    justifyContent: 'center',
  },
  chatTime: {
    color: '#999',
    fontSize: 12,
  },
});

export default ChatInboxListScreen;
