import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { updateDoc, doc, serverTimestamp } from '@firebase/firestore';
import { db } from '../../../../../utils/Firebase';
import { UserContext } from '../../../../../context/UserContext';

import { SCREENS } from '../../../../../constants';
import Input from '../../../../../shared/form/Input';
import BigButton from '../../../../../shared/buttons/BigButton';
import { colors, spacing, typography } from '../../../../../theme';

import icon from '../../../../../../assets/images/Icon.png';
import mobile from '../../../../../../assets/images/phone.png';
import plusIcon from '../../../../../../assets/images/plus-01.png';
import roleIcon from '../../../../../../assets/images/roleIcon.png';
import editIcon from '../../../../../../assets/images/editPencil.png';
import emailIcon from '../../../../../../assets/images/email-icon.png';
import switchOn from '../../../../../../assets/images/switch.png';
import switchOff from '../../../../../../assets/images/switchOff.png';

const keywordsArray = ['keyword', 'keyword', 'keyword', 'keyword', 'keyword', 'keyword'];
const CustomerDetails = ({ item }) => {
  const { userData } = useContext(UserContext);
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState(item?.notifications);

  const toggleNotifications = async () => {
    await updateDoc(doc(db, 'businesses', userData?.userData.businessId, 'customers', item?.customerId), {
      notifications: !notifications,
      lastUpdated: serverTimestamp(),
    });
    setNotifications(prev => !prev);
  };

  const renderEmptyList = () => {
    return (
      <View>
        {keywordsArray.map((keyword, index) => (
          <Text key={index} style={styles.keyword}>
            {keyword}
          </Text>
        ))}
      </View>
    );
  };

  const RenderFooter = () => {
    return (
      <>
        <View style={{ ...styles.Info, marginTop: spacing.SCALE_30 }}>
          <Text style={styles.text}>Notifications</Text>
          <View
            style={{
              paddingTop: spacing.SCALE_10,
              paddingLeft: spacing.SCALE_10,
              flexDirection: 'row',

              alignItems: 'center',
            }}>
            {notifications ? (
              <Pressable onPress={toggleNotifications}>
                <Image style={styles.notifyIcon} source={switchOn} />
              </Pressable>
            ) : (
              <Pressable onPress={toggleNotifications}>
                <Image style={styles.notifyIcon} source={switchOff} />
              </Pressable>
            )}
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: spacing.SCALE_40 }}>
          <BigButton width={spacing.SCALE_154} onPress={() => navigation.navigate(SCREENS.NEWJOB)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image style={styles.icon} source={plusIcon} />
              <Text style={{ marginLeft: spacing.SCALE_10, color: colors.text }}>Job</Text>
            </View>
          </BigButton>
          <BigButton width={spacing.SCALE_154} onPress={() => navigation.navigate(SCREENS.ESTIMATE)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image style={styles.icon} source={plusIcon} />
              <Text style={{ marginLeft: spacing.SCALE_10, color: colors.text }}>ESTIMATE</Text>
            </View>
          </BigButton>
        </View>
      </>
    );
  };

  const RenderHeader = () => {
    return (
      <>
        <View style={styles.Info}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.text}>Personal info</Text>
            <Pressable onPress={() => navigation.navigate(SCREENS.EDIT_CUSTOMER_INFO, { employee: item })}>
              <Image style={styles.icon} source={editIcon} />
            </Pressable>
          </View>
          <Input leftImage={icon} value={item?.firstName} placeholder="" editable={false} />
          <Input leftImage={icon} value={item?.lastName} placeholder="" editable={false} />
          {/* <Input leftImage={emailIcon} value={item?.email[0]} placeholder="Shahrukh@gmail.com" editable={false} /> */}
          <Input
            leftImage={mobile}
            value={
              '(' +
              item?.phone.mobile.substring(2, 5) +
              ') ' +
              item?.phone.mobile.substring(5, 8) +
              '-' +
              item?.phone.mobile.substring(8, 12)
            }
            placeholder=""
            editable={false}
          />
          {item?.phone?.home && (
            <Input
              leftImage={mobile}
              value={
                '(' +
                item?.phone.home.substring(2, 5) +
                ') ' +
                item?.phone.home.substring(5, 8) +
                '-' +
                item?.phone.home.substring(8, 12)
              }
              placeholder=""
              editable={false}
            />
          )}
          {item?.phone?.work && (
            <Input
              leftImage={mobile}
              value={
                '(' +
                item?.phone.work.substring(2, 5) +
                ') ' +
                item?.phone.work.substring(5, 8) +
                '-' +
                item?.phone.work.substring(8, 12)
              }
              placeholder=""
              editable={false}
            />
          )}
          {item?.phone?.additional && (
            <Input
              leftImage={mobile}
              value={
                '(' +
                item?.phone.additional.substring(2, 5) +
                ') ' +
                item?.phone.additional.substring(5, 8) +
                '-' +
                item?.phone.additional.substring(8, 12)
              }
              placeholder=""
              editable={false}
            />
          )}
          <Input leftImage={emailIcon} value={item.email[0]} placeholder="" editable={false} />
        </View>
        <View style={{ ...styles.Info, marginTop: spacing.SCALE_30 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.text}>Address</Text>
            <Pressable onPress={() => navigation.navigate(SCREENS.EDIT_CUSTOMER_INFO, { employee: item })}>
              <Image style={styles.icon} source={editIcon} />
            </Pressable>
          </View>
          {item?.address?.map((address, key) => {
            return (
              <Text style={styles.addressText} key={key}>
                {address}
              </Text>
            );
          })}
        </View>
        <View style={{ ...styles.Info, marginTop: spacing.SCALE_30 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.text}>Notes</Text>
            <Pressable onPress={() => navigation.navigate(SCREENS.EDIT_CUSTOMER_INFO, { employee: item })}>
              <Image style={styles.icon} source={editIcon} />
            </Pressable>
          </View>

          <View style={styles.notes}>
            <Text>{item?.notes}</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={{
          flex: 1,
          flexDirection: 'column',
        }}>
        <Text style={styles.text}>Tags</Text>

        <RenderHeader />
        <RenderFooter />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  Info: {
    backgroundColor: colors.lightColor,
    padding: spacing.SCALE_20,
    borderRadius: spacing.SCALE_10,
  },
  notifyIcon: {
    height: spacing.SCALE_40,
    width: spacing.SCALE_40,
  },
  icon: {
    height: spacing.SCALE_20,
    width: spacing.SCALE_20,
  },
  text: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: typography.FONT_SIZE_16,
  },
  addressText: {
    borderBottomWidth: 0.5,
    borderColor: colors.primary,
    paddingVertical: spacing.SCALE_10,
    paddingLeft: 10,
  },
  notes: {
    backgroundColor: colors.shadow,
    borderWidth: 0.5,
    borderColor: colors.primary,
    padding: spacing.SCALE_20,
    marginTop: spacing.SCALE_10,
    borderRadius: spacing.SCALE_10,
    shadowColor: colors.shadow,
    shadowOpacity: 0.2,
    shadowRadius: 18,
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  keyword: {
    backgroundColor: colors.whiteBackground,
    borderWidth: 0.5,
    borderColor: colors.primary,
    textAlign: 'center',
    paddingVertical: spacing.SCALE_4,
    borderRadius: spacing.SCALE_20,
    marginTop: spacing.SCALE_10,
    paddingHorizontal: spacing.SCALE_20,
    marginRight: spacing.SCALE_10,
  },
});

export default CustomerDetails;
