import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { SCREENS } from '../../../../constants';
import Input from '../../../../shared/form/Input';
import BigButton from '../../../../shared/buttons/BigButton';
import { colors, spacing, typography } from '../../../../theme';
import GoBackButton from '../../../../shared/buttons/GoBackButton';

import logo from '../../../../../assets/images/logo.png';
import icon from '../../../../../assets/images/Icon.png';
import plusIcon from '../../../../../assets/images/plusIcon.png';
import roleIcon from '../../../../../assets/images/roleIcon.png';
import crossIcon from '../../../../../assets/images/crossIcon.png';
import editPencil from '../../../../../assets/images/editPencil.png';

const CustomerCompanyDetatilsPresenter = ({ handleBackPress, customerAddress, customerData }) => {
  const navigation = useNavigation();
  const [role, setRole] = useState(customerData ? customerData.worksAt.role : '');
  const [keyword, setKeyword] = useState('');
  const [keywordArr, setKeywordArr] = useState(customerData ? customerData.tags.map(item => item) : []);
  const [leadSource, setLeadSource] = useState(customerData ? customerData.leadSource : '');
  const [companyName, setCompanyName] = useState(customerData ? customerData.worksAt.companyName : '');
  const [companyDetails, setCompanyDetails] = useState({});

  const onPressNext = () => {
    if (customerData) {
      navigation.navigate(SCREENS.CUSTOMER_NOTE_CONTAINER, { companyDetails, customerData });
    } else {
      navigation.navigate(SCREENS.CUSTOMER_NOTE_CONTAINER, { companyDetails });
    }
  };
  useEffect(() => {
    setCompanyDetails({ ...customerAddress, worksAt: { companyName, role }, tags: keywordArr, leadSource });
  }, [companyName, role, keywordArr, leadSource]);
  const onPress = () => {
    let arr = [...keywordArr];
    arr.unshift(keyword);
    setKeywordArr(arr);
    setKeyword('');
  };

  const onRemove = index => {
    let arr = [...keywordArr];
    arr.splice(index, 1);
    setKeywordArr([...arr]);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerView}>
          <GoBackButton onPress={handleBackPress} />
          <Image style={styles.editIcon} resizeMode="contain" source={editPencil} />
        </View>
        <View style={styles.logoView}>
          <Image style={styles.logo} resizeMode="cover" source={logo} />
          <Text style={styles.headerText}> Workplace Information</Text>
        </View>
        <Input leftImage={icon} value={companyName} onChangeText={setCompanyName} placeholder="Company name" />
        <Input leftImage={roleIcon} value={role} onChangeText={setRole} placeholder="Role" />
        <View>
          <Input
            rightImage={plusIcon}
            leftImage={icon}
            onChangeText={text => setKeyword(text)}
            placeholder="User Tags"
            onPressRightIcon={onPress}
            value={keyword}
            disabled={!keyword ? true : false}
          />
          <ScrollView
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginVertical: spacing.SCALE_10 }}>
            {keywordArr.map(item => {
              return (
                <View style={styles.keywordsView}>
                  <Text>{item}</Text>
                  <Pressable onPress={onRemove}>
                    <Image style={styles.crossIcon} source={crossIcon} />
                  </Pressable>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <Input leftImage={icon} value={leadSource} onChangeText={setLeadSource} placeholder="Lead Source" />
        <View style={{ marginTop: spacing.SCALE_20 }}>
          <BigButton onPress={onPressNext}>
            <Text style={{ color: colors.text }}>Next</Text>
          </BigButton>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.SCALE_10,
    paddingTop: spacing.SCALE_10,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editIcon: {
    height: spacing.SCALE_20,
    width: spacing.SCALE_20,
  },
  logoView: {
    alignItems: 'center',
  },
  logo: {
    height: spacing.SCALE_200,
    width: spacing.SCALE_200,
  },
  headerText: {
    fontSize: typography.FONT_SIZE_20,
    color: colors.primary,
  },
  dropdown: {
    width: '45%',
    borderWidth: 0.5,
    borderColor: colors.primary,
    borderRadius: spacing.SCALE_10,
    padding: spacing.SCALE_10,
    marginTop: spacing.SCALE_14,
  },
  keywordsView: {
    flexDirection: 'row',
    backgroundColor: colors.lightColor,
    borderRadius: spacing.SCALE_20,
    paddingHorizontal: spacing.SCALE_10,
    borderWidth: 0.5,
    borderColor: colors.primary,
    marginRight: spacing.SCALE_10,
    alignItems: 'center',
    paddingVertical: spacing.SCALE_4,
  },
  crossIcon: {
    height: spacing.SCALE_16,
    width: spacing.SCALE_16,
    marginLeft: spacing.SCALE_10,
  },
});

export default CustomerCompanyDetatilsPresenter;
