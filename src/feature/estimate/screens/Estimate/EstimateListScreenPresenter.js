import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Pressable,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import { UserContext } from '../../../../context/UserContext';

import { serverTimestamp } from '@firebase/firestore';
import plusIcon from '../../../../../assets/images/plus-01.png';
import searchIcon from '../../../../../assets/images/search-icon.png';
import undoIcon from '../../../../../assets/images/undo-circular-arrow.png';

import JobSource from '../../../new-job/screens/components/JobSource';
import DispatchModal from '../../../new-job/screens/components/DispatchModal';
import JobTags from '../../../../shared/job-tags/JobTags';
import { AppContext } from '../../../../context/AppContext';
import BigButton from '../../../../shared/buttons/BigButton';
import DropDownAddJob from '../../../../shared/drop-down/DropDownAddJob';
import DropDown from '../../../../shared/drop-down/DropDown';
import Schedule from '../../../../shared/schedule/Schedule';
import Accordian from '../../../../shared/accordain/Accordian';
import { colors, spacing, typography } from '../../../../theme';
import GoBackButton from '../../../../shared/buttons/GoBackButton';
import ServicesModal from '../../../../shared/modals/ServicesModal';
import LeaveScreenModal from '../../../estimate/components/LeaveScreenModal';
import AddDiscountModal from '../../../estimate/components/AddDiscountModal';
import { SCREENS } from '../../../../constants/index';
import editIcon from '../../../../../assets/images/edit-light.png';
import personIcon from '../../../../../assets/images/personIcon.png';
import locationIcon from '../../../../../assets/images/locationIcon.png';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import JobNotes from '../../../../shared/notes/JobNotes';
import AddCustomerModal from '../../../new-job/screens/components/AddCustomerModal';

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
    paddingBottom: spacing.SCALE_20,
  },
  plusIcon: {
    height: spacing.SCALE_30,
    width: spacing.SCALE_30,
  },
  editIcon: {
    height: spacing.SCALE_20,
    width: spacing.SCALE_20,
  },
  contactInfoHeaderView: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: spacing.SCALE_4,
    borderTopRightRadius: spacing.SCALE_4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  customerInfoBox: {
    backgroundColor: colors.whiteBackground,
    borderColor: colors.primary,
    borderWidth: 1,
    flexDirection: 'row',
    marginHorizontal: spacing.SCALE_20,
    marginTop: spacing.SCALE_20,
    padding: spacing.SCALE_10,
    justifyContent: 'space-between',
    borderRadius: spacing.SCALE_6,
  },
});

const EstimateListScreenPresenter = ({ customers, users, addNewEstimate, estimateLoading, estimateSent }) => {
  const navigation = useNavigation();
  const { userData } = useContext(UserContext);
  const [keyword, setKeyword] = useState('');
  const [keywordArr, setKeywordArr] = useState([]);
  const [lineItems, setLineItems] = useState([]);
  const [materialArray, setMaterialArray] = useState([]);
  const [itemName, setItemName] = useState('');
  const [discount, setDiscount] = useState(0);
  const [percentageDiscount, setPercentageDiscount] = useState(0);
  const [description, setDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [totalUnits, settotalUnits] = useState(1);
  const [showDiscountAccordian, setShowDiscountAccordian] = useState(false);
  const [customerDisplayIndex, setCustomerDisplayIndex] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectUser, setSelectUser] = useState([]);
  const [showAccordian, setshowAccordian] = useState(false);
  const [salePersonDisplayIndex, setSalePersonDisplayIndex] = useState('');
  const [defaultCustomer, setDefaultCustomer] = useState('Customer');
  const [defaultSalepersonText, setDefaultSalepersonText] = useState('Sale Person');
  const [note, setNote] = useState('');
  const [customerModal, setCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [combinedStartTime, setCombinedStartTime] = useState(null);
  const [combinedEndTime, setCombinedEndTime] = useState(null);

  const [online, setOnline] = useState(false);
  const [referral, setReferral] = useState(false);

  useEffect(() => {
    console.log('combinedStartTime', combinedStartTime);
    console.log('combinedEndTime', combinedEndTime);
  }, [combinedStartTime, combinedEndTime]);

  const [showModal, setShowModal] = useState({
    leaveScreen: false,
    addDiscount: false,
    service: false,
    materials: false,
  });

  useFocusEffect(
    React.useCallback(() => {
      setCustomerDisplayIndex('');
      setSelectedAddress('');
      setLineItems([]);
      setKeywordArr([]);
      setSelectUser([]);
      setSalePersonDisplayIndex('');
      const newDefaultCustomer = customerDisplayIndex !== '' ? customerDisplayIndex : 'Customer';
      const newDefaultSalepersonText = salePersonDisplayIndex !== '' ? salePersonDisplayIndex : 'Sale Person';
      setDefaultCustomer(newDefaultCustomer);
      setDefaultSalepersonText(newDefaultSalepersonText);
    }, []),
  );

  const onPressMinus = () => {
    settotalUnits(old => old - 1);
  };
  const onPressPlus = () => {
    settotalUnits(old => old + 1);
  };
  const onSave = () => {
    const newItem = { name: itemName, description, unitPrice: itemPrice, quantity: totalUnits };
    setLineItems(prevArr => [...prevArr, newItem]);
    setShowModal({ service: false, materials: false, addDiscount: false, leaveScreen: false });
    settotalUnits(1);
    setshowAccordian(true);
  };
  const onSaveMaterials = () => {
    const newItem = { itemName, description, itemPrice, totalUnits };
    setMaterialArray(prevArr => [...prevArr, newItem]);
    setShowModal({ service: false, materials: false, addDiscount: false, leaveScreen: false });
    settotalUnits(1);
  };
  const totalItemsPrice = lineItems?.reduce((total, item) => {
    const itemPrice = parseFloat(item.unitPrice) * parseFloat(item.quantity);
    return total + itemPrice;
  }, 0);

  const totalMaterialPrice = materialArray?.reduce((total, item) => {
    const itemPrice = item.itemPrice * item.totalUnits;
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
    let lineItems = [...keywordArr];
    lineItems.unshift({ _id: keyword.length, keywordText: keyword });
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
    setShowDiscountAccordian(true);
  };
  const onPressDelete = index => {
    let array = [...lineItems];
    array.splice(index, 1);
    setLineItems([...array]);
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

  //usernames for dropdown
  let usersNames = users?.length > 0 && users?.map(item => item.firstName + ' ' + item.lastName);

  // add new job
  const onSubmit = () => {
    addNewEstimate({
      customer: selectedCustomer,
      dateAdded: serverTimestamp(),
      leadSource: { online, referral, salesPerson: users[salePersonDisplayIndex] ? users[salePersonDisplayIndex] : '' },
      lineItems,
      estimateTotal: totalPrice,
      note: note,
    });
    setCustomerDisplayIndex('');
    setSelectedCustomer('');
    setLineItems([]);
    setKeywordArr([]);
    setSelectUser([]);
  };

  const [searchText, setSearchText] = useState('');

  return (
    // <TouchableOpacity
    //   activeOpacity={1}
    //   onPress={() => setSearchText('')}
    // style={{
    //   ...styles.container,
    //   opacity: showModal.addDiscount || showModal.leaveScreen || showModal.materials || showModal.service ? 0.5 : 1,
    // }}>
    <View
      style={{
        ...styles.container,
        opacity: showModal.addDiscount || showModal.leaveScreen || showModal.materials || showModal.service ? 0.5 : 1,
      }}
      activeOpacity={1}>
      <Modal visible={customerModal} animationType="slide">
        <AddCustomerModal setSelectedCustomer={setSelectedCustomer} setCustomerModal={setCustomerModal} />
      </Modal>
      <View style={styles.headerView}>
        <GoBackButton
          onPress={() => setShowModal({ addDiscount: false, leaveScreen: true, service: false, materials: false })}
        />
        <Text style={styles.header}>New Estimate</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {selectedCustomer ? (
          <View style={styles.contactInfoView}>
            <View style={styles.contactInfoHeaderView}>
              <Text style={styles.contactInfoHeader}>Customer</Text>
              <Pressable onPress={() => setSelectedCustomer(null)}>
                <Image source={undoIcon} style={styles.editIcon} />
              </Pressable>
            </View>
            <View style={styles.customerInfoBox}>
              <View>
                <Text>{selectedCustomer?.displayName}</Text>
                <Text
                  style={{
                    paddingVertical: 5,
                  }}>
                  {selectedCustomer?.address[0]}
                </Text>
                <Text>
                  {selectedCustomer?.phone?.mobile &&
                    '(' +
                      selectedCustomer?.phone?.mobile.substring(2, 5) +
                      ') ' +
                      selectedCustomer?.phone?.mobile.substring(5, 8) +
                      '-' +
                      selectedCustomer?.phone?.mobile.substring(8, 12)}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={{ ...styles.contactInfoView, zIndex: 1000 }}>
            <View style={{ ...styles.contactInfoHeaderView, position: 'relative' }}>
              <Text style={styles.contactInfoHeader}>Customer</Text>
              <Pressable onPress={() => setCustomerModal(true)}>
                <Image source={plusIcon} style={styles.plusIcon} />
              </Pressable>
            </View>

            <DropDownAddJob
              buttonTextStyle={{ fontSize: typography.FONT_SIZE_14 }}
              data={customers}
              setSelectedCustomer={setSelectedCustomer}
              leftIcon={searchIcon}
              searchText={searchText}
              setSearchText={setSearchText}
              defaultButtonText="Search customers"
            />
          </View>
        )}

        <View
          style={{
            marginTop: spacing.SCALE_10,
          }}>
          <View style={styles.ListItemView}>
            <View style={styles.contactInfoHeaderView}>
              <Text style={styles.contactInfoHeader}>LineItems</Text>
              <Text style={styles.contactInfoHeader}>${totalPrice.toFixed(2)}</Text>
            </View>

            <Accordian
              showAccordian={showAccordian}
              onPressShowAccordian={() => setshowAccordian(!showAccordian)}
              onPressDelete={index => onPressDelete(index)}
              data={lineItems}
              header="Services"
              onPress={() => setShowModal({ service: true, materials: false, addDiscount: false, leaveScreen: false })}
            />
          </View>
          {/* ******* will be added leter *********/}
          {/* ############
           <Accordian
            showAccordian={showAccordian}
            onPressShowAccordian={() => setshowAccordian(!showAccordian)}
            onPressDelete={index => onPressDeleteMaterials(index)}
            data={materialArray}
            header="Materials"
            onPress={() => setShowModal({ service: false, materials: true })}
          /> 
         ############### */}

          {/* <View style={styles.innerListItemView}>
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
          </View> */}
        </View>
        <View
          style={{
            marginTop: spacing.SCALE_20,
          }}>
          <JobSource
            defaultButtonText={'Salesperson'}
            data={usersNames}
            onSelect={(val, index) => {
              setSalePersonDisplayIndex(index);
            }}
            online={online}
            setOnline={setOnline}
            setReferral={setReferral}
            referral={referral}
          />
        </View>
        <JobNotes onChangeText={text => setNote(text)} value={note} />
        <View style={{ paddingBottom: 200 }}>
          <BigButton
            marginBottom={spacing.SCALE_20}
            width={'60%'}
            onPress={onSubmit}
            disabled={estimateSent || estimateLoading}>
            {estimateSent ? (
              <Text style={{ color: colors.yellow400, fontSize: typography.FONT_SIZE_16, fontWeight: 'bold' }}>
                Sent
              </Text>
            ) : (
              <>
                {estimateLoading ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={{ color: colors.yellow400, fontSize: typography.FONT_SIZE_16, fontWeight: 'bold' }}>
                    Create and Send
                  </Text>
                )}
              </>
            )}
          </BigButton>
        </View>
      </ScrollView>
      <LeaveScreenModal
        onPressConfirm={() => {
          navigation.goBack();
          setShowModal({ addDiscount: false, leaveScreen: false, service: false, materials: false });
        }}
        onPressCancel={() => setShowModal({ addDiscount: false, leaveScreen: false, service: false, materials: false })}
        visible={showModal.leaveScreen}
      />
      {/* <AddDiscountModal
        onChangePercentagePrice={text => setPercentageDiscount(text)}
        onPress={onSaveDiscount}
        onChangePrice={text => setDiscount(text)}
        onPressCancel={() => setShowModal({ addDiscount: false, leaveScreen: false, service: false, materials: false })}
        visible={showModal.addDiscount}
      /> */}
      <ServicesModal
        onChangeItemName={text => setItemName(text)}
        onChangeDescription={text => setDescription(text)}
        onChangeItemPrice={text => setItemPrice(text)}
        onChangeTotalUnits={text => settotalUnits(text)}
        onSave={onSave}
        onPressPlus={onPressPlus}
        modalTotalPrice={totalUnits * itemPrice}
        onPressMinus={onPressMinus}
        totalUnitsValue={totalUnits.toString()}
        modalHeader="Add Line Item"
        onPressCancel={() => setShowModal({ addDiscount: false, leaveScreen: false, service: false, materials: false })}
        visible={showModal.service}
      />
      {/* <ServicesModal
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
      /> */}
    </View>
    // </TouchableOpacity>
  );
};

export default EstimateListScreenPresenter;
