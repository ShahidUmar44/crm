import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

const keywordsArray = ['keyword', 'keyword', 'keyword', 'keyword', 'keyword', 'keyword'];
const CompletedDetails = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
        <View style={styles.Info}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.text}>Info</Text>
            <Pressable onPress={() => navigation.navigate(SCREENS.ADD_EDIT_CUSTOMER_PERSONAL_INFO)}>
              <Image style={styles.icon} source={editIcon} />
            </Pressable>
          </View>
          <Input leftImage={icon} value={item?.firstName} placeholder="Shahrukh" editable={false} />
          <Input leftImage={icon} value={item?.lastName} placeholder="khan" editable={false} />
          {/* <Input leftImage={emailIcon} value={item?.email[0]} placeholder="Shahrukh@gmail.com" editable={false} /> */}
          <Input leftImage={mobile} value={item?.phone?.mobile} placeholder="+923129988300" editable={false} />
          <Input leftImage={mobile} value={item?.phone?.home} placeholder="+923129988300" editable={false} />
        </View>
        <View style={{ ...styles.Info, marginTop: spacing.SCALE_30 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.text}>Address</Text>
          </View>
          {item?.Address?.map(address => {
            return <Text style={styles.addressText}>{address.address}</Text>;
          })}
        </View>
        <View style={{ ...styles.Info, marginTop: spacing.SCALE_30 }}>
          <Text style={styles.text}>Company details</Text>
          <Input leftImage={icon} value={item?.worksAt?.companyName} editable={false} />
          <Input leftImage={roleIcon} value={item?.worksAt?.role} editable={false} />
          <View style={styles.companyDescription}>
            <Text>{item?.notes}</Text>
          </View>
        </View>
        <View style={{ ...styles.Info, marginTop: spacing.SCALE_30 }}>
          <Text style={styles.text}>Tags</Text>
          <FlatList
            data={item?.tags}
            numColumns={3}
            style={{ width: '100%' }}
            renderItem={({ item }) => <Text style={styles.keyword}>{item}</Text>}
            ListEmptyComponent={keywordsArray}
            contentContainerStyle={{ flex: keywordsArray?.length ? 0 : 1, paddingTop: spacing.SCALE_10 }}
          />
        </View>
        <View style={{ ...styles.Info, marginTop: spacing.SCALE_30 }}>
          <Text style={styles.text}>Lead source</Text>
          <Text style={{ marginTop: spacing.SCALE_10 }}>{item?.leadSource}</Text>
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
  },
  companyDescription: {
    backgroundColor: colors.shadow,
    borderWidth: 0.5,
    borderColor: colors.primary,
    padding: spacing.SCALE_10,
    marginTop: spacing.SCALE_20,
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

export default CompletedDetails;
