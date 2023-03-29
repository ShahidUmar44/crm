import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Pressable, ScrollView } from 'react-native';

import JobTags from '../../../../shared/job-tags/JobTags';
import Schedule from '../../../../shared/schedule/Schedule';
import BigButton from '../../../../shared/buttons/BigButton';
import DropDown from '../../../../shared/drop-down/DropDown';
import Accordian from '../../../../shared/accordain/Accordian';
import { colors, spacing, typography } from '../../../../theme';
import LeaveScreenModal from '../../components/LeaveScreenModal';
import AddDiscountModal from '../../components/AddDiscountModal';
import ServicesModal from '../../../../shared/modals/ServicesModal';
import GoBackButton from '../../../../shared/buttons/GoBackButton';

import editIcon from '../../../../../assets/images/editIcon.png';
import plusIcon from '../../../../../assets/images/plusIcon.png';
import personIcon from '../../../../../assets/images/personIcon.png';
import deleteIcon from '../../../../../assets/images/deleteIcon.png';
import locationIcon from '../../../../../assets/images/locationIcon.png';
import servicesIcon from '../../../../../assets/images/servicesIcon.png';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../../../constants';
import { serverTimestamp } from 'firebase/firestore';

const data = ['option 1', 'option 2', 'option 3', 'option 4'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
    backgroundColor: colors.whiteBackground,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '2%',
  },
  header: {
    fontSize: typography.FONT_SIZE_20,
    fontFamily: typography.secondary,
    color: colors.primaryDarker,
    width: '90%',
    textAlign: 'center',
  },
  contactInfoView: {
    borderRadius: spacing.SCALE_4,
    marginTop: spacing.SCALE_20,
    backgroundColor: colors.shadow,
    width: '100%',
    paddingBottom: spacing.SCALE_4,
  },
  contactInfoHeaderView: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: spacing.SCALE_4,
    borderTopRightRadius: spacing.SCALE_4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: spacing.SCALE_10,
  },
  contactInfoHeader: {
    fontSize: typography.FONT_SIZE_16,
    color: colors.whiteBackground,
    paddingLeft: spacing.SCALE_10,
    paddingVertical: spacing.SCALE_10,
  },
  line: { width: '100%', height: 0.5, backgroundColor: colors.primary, marginVertical: spacing.SCALE_4 },
  innerListItemView: {
    backgroundColor: colors.whiteBackground,
    marginHorizontal: spacing.SCALE_10,
    paddingHorizontal: spacing.SCALE_10,
    marginVertical: spacing.SCALE_10,
    borderRadius: spacing.SCALE_6,
  },
  ListItemView: {
    marginTop: spacing.SCALE_10,
    borderRadius: spacing.SCALE_4,
    backgroundColor: colors.shadow,
    paddingBottom: spacing.SCALE_10,
  },
  servicesIcon: {
    height: spacing.SCALE_20,
    width: spacing.SCALE_20,
  },
  serviceText: {
    marginLeft: spacing.SCALE_10,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.SCALE_10,
  },
  listItemCardView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.SCALE_10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: colors.primary,
  },
  iconsView: { flexDirection: 'row', marginBottom: spacing.SCALE_10, alignItems: 'center' },
  scheduleView: {
    marginTop: spacing.SCALE_10,
    borderRadius: spacing.SCALE_4,
    backgroundColor: colors.shadow,
    paddingBottom: spacing.SCALE_10,
  },
});

const EstimateListScreenPresenter = ({ responseData, addNewEstimate }) => {
  const navigation = useNavigation();

  /*
  ### States
    */
  const [keyword, setKeyword] = useState('');
  const [keywordArr, setKeywordArr] = useState([]);
  const [arr, setArr] = useState([]);
  const [materialArray, setMaterialArray] = useState([]);
  const [pieceName, setPieceName] = useState('');
  const [discount, setDiscount] = useState(0);
  const [percentageDiscount, setPercentageDiscount] = useState(0);
  const [description, setDescription] = useState('');
  const [piecePrice, setPiecePrice] = useState('');
  const [totalUnits, settotalUnits] = useState(1);
  const [showDiscountAccordian, setShowDiscountAccordian] = useState(false);
  const [customerDisplayIndex, setCustomerDisplayIndex] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [showAccordian, setshowAccordian] = useState(false);
  const [customerDefaultName, setCustomerDefaultName] = useState('Customer');

  const [showModal, setShowModal] = useState({
    leaveScreen: false,
    addDiscount: false,
    service: false,
    materials: false,
  });

  let defaultCustomerName;
  useFocusEffect(
    React.useCallback(() => {
      setCustomerDisplayIndex('');
      setSelectedAddress('');
      setArr([]);
      setKeywordArr([]);
      defaultCustomerName = customerDisplayIndex === '' ? 'Customer' : customerDisplayIndex;
      setCustomerDefaultName(defaultCustomerName);
    }, []),
  );

  /*
  ### Functions
    */
  const onPressMinus = () => {
    settotalUnits(old => old - 1);
  };
  const onPressPlus = () => {
    settotalUnits(old => old + 1);
  };
  const onSave = () => {
    const newItem = { pieceName, description, piecePrice, totalUnits };
    setArr(prevArr => [...prevArr, newItem]);
    setShowModal({ service: false, materials: false, addDiscount: false, leaveScreen: false });
    settotalUnits(1);
  };
  const onSaveMaterials = () => {
    const newItem = { pieceName, description, piecePrice, totalUnits };
    setMaterialArray(prevArr => [...prevArr, newItem]);
    setShowModal({ service: false, materials: false, addDiscount: false, leaveScreen: false });
    settotalUnits(1);
  };
  const totalItemsPrice = arr?.reduce((total, item) => {
    const itemPrice = item.piecePrice * item.totalUnits;
    return total + itemPrice;
  }, 0);

  const totalMaterialPrice = materialArray?.reduce((total, item) => {
    const itemPrice = item.piecePrice * item.totalUnits;
    return total + itemPrice;
  }, 0);

  const grandTotalPrice = totalItemsPrice + totalMaterialPrice;

  let totalPrice;
  if (discount !== 0) {
    totalPrice = grandTotalPrice - discount;
  } else if (percentageDiscount !== 0) {
    let percentage = (percentageDiscount * grandTotalPrice) / 100;
    totalPrice = grandTotalPrice - percentage;
  } else {
    totalPrice = grandTotalPrice - discount;
  }
  const onPress = () => {
    let arr = [...keywordArr];
    arr.unshift({ _id: keyword.length, keywordText: keyword });
    setKeywordArr(arr);
    setKeyword('');
  };
  const onRemove = index => {
    let arr = [...keywordArr];
    arr.splice(index, 1);
    setKeywordArr([...arr]);
  };
  const onSaveDiscount = () => {
    setDiscount(discount);
    setShowModal({ service: false, materials: false, addDiscount: false, leaveScreen: false });
  };
  const onPressDelete = index => {
    let array = [...arr];
    array.splice(index, 1);
    setArr([...array]);
  };
  const onPressDeleteMaterials = index => {
    let array = [...materialArray];
    array.splice(index, 1);
    setMaterialArray([...array]);
  };
  const onPressDiscountDelete = () => {
    setShowDiscountAccordian(false);
    setDiscount(0);
    setPercentageDiscount(0);
  };

  // display names

  //customerNames for dropdown
  let customersName = [];
  responseData?.forEach(item => {
    let singleName = item.displayName;
    customersName.push(singleName);
  });

  //customerAddress for dropdown for specific name
  let customerAddress = [];
  responseData[customerDisplayIndex]?.Address?.forEach(item => {
    let singleAddress = item.address;
    customerAddress.push(singleAddress);
  });

  const onPressSave = () => {
    addNewEstimate({
      customer: { ...responseData[customerDisplayIndex], Address: [selectedAddress] },
      dateAdded: serverTimestamp(),
      jobTags: keywordArr,
      lineItem: arr,
      jobTotal: totalPrice,
    });
  };
  return (
    <View
      style={{
        ...styles.container,
        opacity: showModal.addDiscount || showModal.leaveScreen || showModal.materials || showModal.service ? 0.5 : 1,
      }}>
      <View style={styles.headerView}>
        <GoBackButton
          onPress={() => setShowModal({ addDiscount: false, leaveScreen: true, service: false, materials: false })}
        />
        <Text style={styles.header}>Estimate</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contactInfoView}>
          <View style={styles.contactInfoHeaderView}>
            <Text style={styles.contactInfoHeader}>Contact Info</Text>
          </View>
          <DropDown
            buttonTextStyle={{ fontSize: typography.FONT_SIZE_14 }}
            data={customersName}
            onSelect={(val, index) => {
              setCustomerDisplayIndex(index);
            }}
            defaultButtonText={customerDefaultName}
            leftIcon={personIcon}
          />
          <View style={styles.line}></View>
          <DropDown
            buttonTextStyle={{ fontSize: typography.FONT_SIZE_14 }}
            data={customerAddress}
            onSelect={val => setSelectedAddress(val)}
            defaultButtonText="Location"
            leftIcon={locationIcon}
          />
        </View>
        <View style={styles.ListItemView}>
          <View style={styles.contactInfoHeaderView}>
            <Text style={styles.contactInfoHeader}>Services</Text>
            <Text style={styles.contactInfoHeader}>$ {totalPrice}</Text>
          </View>
          <Accordian
            showAccordian={showAccordian}
            onPressShowAccordian={() => setshowAccordian(!showAccordian)}
            onPressDelete={index => onPressDelete(index)}
            data={arr}
            header="Services"
            onPress={() => setShowModal({ service: true, materials: false })}
          />
          {/* ############# will be added later ################ */}
          {/* <Accordian
            showAccordian={showAccordian}
            onPressShowAccordian={() => setshowAccordian(!showAccordian)}
            onPressDelete={index => onPressDeleteMaterials(index)}
            data={materialArray}
            header="Materials"
            onPress={() => setShowModal({ service: false, materials: true })}
          /> 
          <View style={styles.innerListItemView}>
            <View style={styles.serviceRow}>
              <Pressable
                onPress={() =>
                  discount == 0 && percentageDiscount == 0
                    ? setShowDiscountAccordian(false)
                    : setShowDiscountAccordian(!showDiscountAccordian)
                }
                style={{ flexDirection: 'row', width: '80%' }}>
                <Image style={styles.servicesIcon} source={servicesIcon} />
                <Text style={styles.serviceText}>Discount</Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  setShowModal({ addDiscount: true, leaveScreen: false, service: false, materials: false })
                }>
                <Image style={styles.servicesIcon} source={plusIcon} />
              </Pressable>
            </View>
            {showDiscountAccordian && (
              <View style={styles.listItemCardView}>
                <View>
                  <Text style={{ color: colors.primary, marginBottom: spacing.SCALE_10 }}>
                    {percentageDiscount !== 0 ? 'By percentage' : 'By value'}
                  </Text>
                  <Text>$ {discount == 0 ? percentageDiscount : discount}</Text>
                </View>
                <View>
                  <View style={styles.iconsView}>
                    <Image style={{ ...styles.servicesIcon, marginRight: spacing.SCALE_10 }} source={editIcon} />
                    <Pressable onPress={onPressDiscountDelete}>
                      <Image style={styles.servicesIcon} source={deleteIcon} />
                    </Pressable>
                  </View>
                  <Text>$ {discount !== 0 ? discount : percentageDiscount}</Text>
                </View>
              </View>
            )}
          </View>
          */}
        </View>
        <Schedule />
        <JobTags
          data={keywordArr}
          onPress={onPress}
          onChangeText={text => setKeyword(text)}
          onRemove={index => onRemove(index)}
          value={keyword}
        />
        <BigButton marginBottom={spacing.SCALE_10} onPress={onPressSave}>
          <Text style={{ color: colors.text, fontSize: typography.FONT_SIZE_18 }}>Save & Send</Text>
        </BigButton>
      </ScrollView>
      <LeaveScreenModal
        onPressCancel={() => setShowModal({ addDiscount: false, leaveScreen: false, service: false, materials: false })}
        visible={showModal.leaveScreen}
      />
      <AddDiscountModal
        onChangePercentagePrice={text => setPercentageDiscount(text)}
        onPress={onSaveDiscount}
        onChangePrice={text => setDiscount(text)}
        onPressCancel={() => setShowModal({ addDiscount: false, leaveScreen: false, service: false, materials: false })}
        visible={showModal.addDiscount}
      />
      <ServicesModal
        onChangePieceName={text => setPieceName(text)}
        onChangeDescription={text => setDescription(text)}
        onChangePiecePrice={text => setPiecePrice(text)}
        onChangeTotalUnits={text => settotalUnits(text)}
        onSave={onSave}
        onPressPlus={onPressPlus}
        modalTotalPrice={totalUnits * piecePrice}
        onPressMinus={onPressMinus}
        totalUnitsValue={totalUnits.toString()}
        modalHeader="Add Services"
        onPressCancel={() => setShowModal({ addDiscount: false, leaveScreen: false, service: false, materials: false })}
        visible={showModal.service}
      />
      <ServicesModal
        onChangePieceName={text => setPieceName(text)}
        onChangeDescription={text => setDescription(text)}
        onChangePiecePrice={text => setPiecePrice(text)}
        onChangeTotalUnits={text => settotalUnits(text)}
        onSave={onSaveMaterials}
        onPressPlus={onPressPlus}
        modalTotalPrice={totalUnits * piecePrice}
        onPressMinus={onPressMinus}
        totalUnitsValue={totalUnits.toString()}
        modalHeader="Add Materials"
        onPressCancel={() => setShowModal({ addDiscount: false, leaveScreen: false, service: false, materials: false })}
        visible={showModal.materials}
      />
    </View>
  );
};

export default EstimateListScreenPresenter;
