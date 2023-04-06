import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import * as Clipboard from 'expo-clipboard';
import {
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  Timestamp,
  getDoc,
  deleteDoc,
  where,
  serverTimestamp,
  increment,
} from 'firebase/firestore';
import { db } from '../../../../utils/Firebase';

import { jobDetails } from '../../../../example_docs';
import Notes from './components/Notes';
import { SCREENS } from '../../../../constants';
import JobTags from '../../../../shared/job-tags/JobTags';
import Schedule from '../../../../shared/schedule/Schedule';
import ShowSchedule from './components/ShowSchedule';
import DispatchInvoices from './components/DispatchInvoices';
import BigButton from '../../../../shared/buttons/BigButton';
import Accordian from '../../../../shared/accordain/Accordian';
import { colors, spacing, typography } from '../../../../theme';
import GoBackButton from '../../../../shared/buttons/GoBackButton';
import ServicesModal from '../../../../shared/modals/ServicesModal';
import JobSource from '../../../new-job/screens/components/JobSource';
import AddDiscountModal from '../../../estimate/components/AddDiscountModal';
import { UserContext } from '../../../../context/UserContext';
import DispatchModal from '../../../new-job/screens/components/DispatchModal';
import JobSourceDisplay from './components/JobSourceDisplay';
import JobNotes from '../../../../shared/notes/JobNotes';
import PaymentHistory from './components/PaymentHistory';
import Refund from './components/Refund';

import playIcon from '../../../../../assets/images/playIcon.png';
import truckIcon from '../../../../../assets/images/truckIcon.png';
import finishIcon from '../../../../../assets/images/finishIcon.png';
import messageIcon from '../../../../../assets/images/messageIcon.png';
import commentIcon from '../../../../../assets/images/comment.png';
import star from '../../../../../assets/images/star.png';
import closeIcon from '../../../../../assets/images/reject.png';
import confirmIcon from '../../../../../assets/images/confirm.png';
import saveIcon from '../../../../../assets/images/save.png';
import car from '../../../../../assets/images/car.png';

const JobDetailsPresenter = ({
  calendarData,
  handleStartDrivingTime,
  handleEndDrivingTime,
  handleStartTime,
  handleEndTime,
  sendReview,
  users,
  refreshData,
}) => {
  const { user, userData } = useContext(UserContext);
  const navigation = useNavigation();
  const [keyword, setKeyword] = useState('');
  const [keywordArr, setKeywordArr] = useState(calendarData?.jobTags ? calendarData?.jobTags : []);
  const [lineItems, setLineItems] = useState(calendarData?.lineItems ? calendarData?.lineItems : []);
  const [materialArray, setMaterialArray] = useState(
    calendarData?.lineItem?.seriveces ? calendarData?.lineItem?.seriveces : [],
  );
  const [itemName, setItemName] = useState('');
  const [discount, setDiscount] = useState(
    calendarData?.lineItem?.discount?.discount ? calendarData?.lineItem?.discount?.discount : 0,
  );
  const [percentageDiscount, setPercentageDiscount] = useState(0);
  const [description, setDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [totalUnits, settotalUnits] = useState(1);
  const [showDiscountAccordian, setShowDiscountAccordian] = useState(false);
  const [drive, setDrive] = useState({ drive: true, onTheWay: false, arrived: false });
  const [start, setStart] = useState({ start: true, inProgress: false, finish: false });
  const [showAccordian, setshowAccordian] = useState(false);

  const [displayStartTime, setDisplayStartTime] = useState(new Date(calendarData?.start.seconds * 1000));
  const [displayEndTime, setDisplayEndTime] = useState(new Date(calendarData?.end.seconds * 1000));
  const [combinedStartTime, setCombinedStartTime] = useState(new Date(calendarData?.start.seconds * 1000));
  const [combinedEndTime, setCombinedEndTime] = useState(new Date(calendarData?.end.seconds * 1000));

  const [selectUser, setSelectUser] = useState(calendarData?.dispatchedTo);
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [displayedUsers, setDisplayedUsers] = useState(calendarData?.dispatchedTo);

  const [displayedJobSource, setDisplayedJobSource] = useState(calendarData?.leadSource);
  const [newSalesPersonIndex, setNewSalesPersonIndex] = useState(null);
  const [showJobSourceModal, setShowJobSourceModal] = useState(false);
  const [newOnline, setNewOnline] = useState(null);
  const [newReferral, setNewReferral] = useState(null);

  const [showNotesModal, setShowNotesModal] = useState(false);
  const [displayedNotes, setDisplayedNotes] = useState(calendarData?.note ? calendarData?.note : '');
  const [newNotes, setNewNotes] = useState(calendarData?.note ? calendarData?.note : '');

  const [paymentHistory, setPaymentHistory] = useState(
    calendarData?.paymentHistory ? calendarData?.paymentHistory : null,
  );

  useEffect(() => {
    setKeywordArr(calendarData?.jobTags ? calendarData?.jobTags : []);
    setLineItems(calendarData?.lineItems ? calendarData?.lineItems : []);
    setMaterialArray(calendarData?.lineItem?.seriveces ? calendarData?.lineItem?.seriveces : []);
    setDiscount(calendarData?.lineItem?.discount?.discount ? calendarData?.lineItem?.discount?.discount : 0);
    setDisplayStartTime(new Date(calendarData?.start.seconds * 1000));
    setDisplayEndTime(new Date(calendarData?.end.seconds * 1000));
    setCombinedStartTime(new Date(calendarData?.start.seconds * 1000));
    setCombinedEndTime(new Date(calendarData?.end.seconds * 1000));
    setSelectUser(calendarData?.dispatchedTo);
    setDisplayedUsers(calendarData?.dispatchedTo);
    setDisplayedJobSource(calendarData?.leadSource);
    setDisplayedNotes(calendarData?.note ? calendarData?.note : '');
    setNewNotes(calendarData?.note ? calendarData?.note : '');
    setPaymentHistory(calendarData?.paymentHistory ? calendarData?.paymentHistory : null);
  }, [calendarData]);

  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundPayment, setRefundPayment] = useState(null);

  const handleRefundClick = payment => {
    console.log('handle refund click');
    setRefundPayment(payment);
    setShowRefundModal(true);
  };

  useEffect(() => {
    console.log('newReferral', newReferral);
    console.log('newOnline', newOnline);
    console.log('newSalesPersonIndex', newSalesPersonIndex);
    console.log('newSalesPeron', users[newSalesPersonIndex]);
  }, [newReferral, newOnline, newSalesPersonIndex]);

  // useEffect(() => {
  //   setSelectUser(calendarData.dispatchedTo);
  // }, [calendarData.dispatchedTo]);
  // useEffect to set drive to the correct state
  useEffect(() => {
    if (!calendarData?.startDrivingTime && !calendarData?.endDrivingTime) {
      setDrive({ drive: true, onTheWay: false, arrived: false });
    } else if (calendarData?.startDrivingTime && !calendarData?.endDrivingTime) {
      setDrive({ drive: false, onTheWay: true, arrived: false });
    } else if (calendarData?.startDrivingTime && calendarData?.endDrivingTime) {
      setDrive({ drive: false, onTheWay: false, arrived: true });
    }
  }, [calendarData?.startDrivingTime, calendarData?.endDrivingTime]);

  // useEffect to set the start to the correct state initially based on calendar data
  useEffect(() => {
    if (!calendarData?.startedJobTime && !calendarData?.endedJobTime) {
      setStart({ start: true, inProgress: false, end: false });
    } else if (calendarData?.startedJobTime && !calendarData?.endedJobTime) {
      setStart({ start: false, inProgress: true, end: false });
    } else if (calendarData?.startedJobTime && calendarData?.endedJobTime) {
      setStart({ start: false, inProgress: false, end: true });
    }
  }, [calendarData?.startedJobTime, calendarData?.endedJobTime]);

  // useEffect to set the review to the correct state initially based on caledar data
  useEffect(() => {
    if (!calendarData?.reviewMessageSent) {
      setReviewSent(false);
    } else if (calendarData?.reviewMessageSent) {
      setReviewSent(true);
    }
  }, [calendarData?.reviewMessageSent]);

  const [showModal, setShowModal] = useState({
    leaveScreen: false,
    addDiscount: false,
    service: false,
    materials: false,
  });

  const onPressMinus = () => {
    settotalUnits(old => old - 1);
  };
  const onPressPlus = () => {
    settotalUnits(old => old + 1);
  };
  const onSave = async () => {
    const newItem = { name: itemName, description, unitPrice: itemPrice, quantity: totalUnits };
    await updateDoc(doc(db, 'businesses', userData.userData.businessId, 'jobs', calendarData?.jobId), {
      lineItems: [...lineItems, newItem],
    });
    setLineItems(prevArr => [...prevArr, newItem]);
    setShowModal({ service: false, materials: false, addDiscount: false, leaveScreen: false });
    settotalUnits(1);
  };

  const onSaveMaterials = () => {
    const newItem = { pieceName, description, piecePrice, totalUnits };
    setMaterialArray(prevArr => [...prevArr, newItem]);
    setShowModal({ service: false, materials: false, addDiscount: false, leaveScreen: false });
    settotalUnits(1);
  };
  const totalItemsPrice = lineItems?.reduce((total, item) => {
    const itemPrice = parseFloat(item.unitPrice) * parseFloat(item.quantity);
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
  };
  const onPressDelete = async index => {
    let array = [...lineItems];
    array.splice(index, 1);
    setLineItems([...array]);
    await updateDoc(doc(db, 'businesses', userData.userData.businessId, 'jobs', calendarData?.jobId), {
      lineItems: [...array],
    });
  };
  // const onPressDeleteMaterials = index => {
  //   let array = [...materialArray];
  //   array.splice(index, 1);
  //   setMaterialArray([...array]);
  // };
  // const onPressDiscountDelete = () => {
  //   setShowDiscountAccordian(false);
  //   setDiscount(0);
  //   setPercentageDiscount(0);
  // };

  //Start date and time formatted
  // const date = new Date(combinedStartTime);
  // const day = date.getDate().toString().padStart(2, '0');
  // const month = (date.getMonth() + 1).toString().padStart(2, '0');
  // const year = date.getFullYear();
  // const hours = date.getHours();
  // const minutes = date.getMinutes().toString().padStart(2, '0');
  // const ampm = hours >= 12 ? 'PM' : 'AM';
  // const formattedStartDate = `${day}/${month}/${year}`;
  // const formattedStartTime = `${hours % 12}:${minutes} ${ampm}`;

  // //end date and time formatted
  // const endDate = new Date(combinedEndTime);
  // const endDay = endDate.getDate().toString().padStart(2, '0');
  // const endMonth = (endDate.getMonth() + 1).toString().padStart(2, '0');
  // const endYear = endDate.getFullYear();
  // const endHour = endDate.getHours();
  // const endMinutes = endDate.getMinutes().toString().padStart(2, '0');
  // const endampm = endHour >= 12 ? 'PM' : 'AM';
  // const formattedEndDate = `${endDay}/${endMonth}/${endYear}`;
  // const formattedEndTime = `${endHour % 12}:${endMinutes} ${endampm}`;

  //start drive

  const handleDrive = () => {
    if (drive.drive && !drive.onTheWay && !drive.arrived) {
      setDrive({ drive: false, onTheWay: true, arrived: false });
      handleStartDrivingTime();
    } else if (drive.onTheWay) {
      setDrive({ drive: false, onTheWay: false, arrived: true });
      handleEndDrivingTime();
    }
  };

  const handleUpdateJobTime = () => {
    if (start.start && !start.end) {
      setStart({ start: false, inProgress: true, end: false });
      handleStartTime();
    } else if (start.inProgress) {
      setStart({ start: false, inProgress: false, end: true });
      handleEndTime();
    }
  };

  const [reviewSent, setReviewSent] = useState(false);
  const handleReviewRequest = () => {
    console.log('review request');
    setReviewSent(true);
    sendReview();
  };

  const [employeeList, setEmployeeList] = useState([]);

  // fetch employee list from firestore
  useEffect(() => {
    async function getEmployees() {
      const q = query(collection(db, 'users'), where('businessId', '==', userData.userData.businessId));
      const querySnapshot = await getDocs(q);
      const employees = querySnapshot.docs.map(doc => doc.data());
      setEmployeeList(employees);
    }
    getEmployees();
  }, []);

  //usernames for dropdown
  let usersNames = employeeList?.length > 0 && employeeList?.map(item => item.firstName + ' ' + item.lastName);

  const handleCopyAddress = async () => {
    await Clipboard.setStringAsync(calendarData?.customer?.address[0]);
    alert('Address copied to clipboard');
  };

  const handleCopyPhone = async () => {
    await Clipboard.setStringAsync(calendarData?.customer?.phone.mobile);
    alert('Phone number copied to clipboard');
  };

  const handleChangeDate = async () => {
    // Convert the date strings to Date objects
    const combinedStartDate = new Date(combinedStartTime);
    const combinedEndDate = new Date(combinedEndTime);
    const displayStartDate = new Date(displayStartTime);
    const displayEndDate = new Date(displayEndTime);

    // Compare the timestamps
    if (
      combinedStartDate.getTime() === displayStartDate.getTime() &&
      combinedEndDate.getTime() === displayEndDate.getTime()
    ) {
      console.log('no changes');
      setShowSchedule(false);
      return;
    }
    console.log('were updating firestore');
    // update firestore
    await updateDoc(doc(db, 'businesses', userData.userData.businessId, 'jobs', calendarData?.jobId), {
      start: combinedStartTime,
      end: combinedEndTime,
    });
    setDisplayEndTime(combinedEndTime);
    setDisplayStartTime(combinedStartTime);

    setShowSchedule(false);
  };

  const [showSchedule, setShowSchedule] = useState(false);

  const handleSaveDispatch = async () => {
    if (selectUser !== displayedUsers) {
      const updatedDispatchedTo = selectUser.map(user => {
        const { _index, ...rest } = user;
        return rest;
      });
      await updateDoc(doc(db, 'businesses', userData.userData.businessId, 'jobs', calendarData?.jobId), {
        dispatchedTo: updatedDispatchedTo,
      });
      console.log('updated firestore');
      setDisplayedUsers(selectUser);
    }
    setShowDispatchModal(false);
  };

  // handle submit change sales person logic is like this: leadSource: { online, referral, salesPerson: users[newSalespersonIndex] },

  const handleSaveJobSource = async () => {
    console.log('handlesavejobsource');

    const newSalesPerson = newSalesPersonIndex != null ? users[newSalesPersonIndex] : null;
    //update firestore with the new jobsource information
    await updateDoc(doc(db, 'businesses', userData.userData.businessId, 'jobs', calendarData?.jobId), {
      leadSource: {
        online: newOnline,
        referral: newReferral,
        salesPerson: newSalesPerson,
      },
    });
    // set the displayed job source to match
    setDisplayedJobSource({
      online: newOnline,
      referral: newReferral,
      salesPerson: newSalesPerson,
    });

    setShowJobSourceModal(false);
  };

  const handleSaveNotes = async () => {
    console.log('handle save notes');
    await updateDoc(doc(db, 'businesses', userData.userData.businessId, 'jobs', calendarData?.jobId), {
      note: newNotes,
    });
    setDisplayedNotes(newNotes);
    setShowNotesModal(false);
  };

  return (
    <View
      style={{
        ...styles.container,
        opacity: showModal.addDiscount || showModal.leaveScreen || showModal.materials || showModal.service ? 0.5 : 1,
      }}>
      <View style={styles.headerView}>
        <GoBackButton />
        <Text style={styles.header}>Job Details</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contactInfoView}>
          <View style={styles.contactInfoHeaderView}>
            <Text style={styles.contactInfoHeader}>Customer Info</Text>
          </View>
          <View style={styles.customerInfoBox}>
            <View>
              <Text style={styles.customerInfoText}>{calendarData?.customer?.displayName}</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: spacing.SCALE_10,
                }}>
                <Text
                  style={{
                    ...styles.customerInfoText,
                    paddingRight: 5,
                  }}
                  onLongPress={handleCopyPhone}>
                  {calendarData?.customer?.phone?.mobile &&
                    '(' +
                      calendarData?.customer?.phone?.mobile.substring(2, 5) +
                      ') ' +
                      calendarData?.customer?.phone?.mobile.substring(5, 8) +
                      '-' +
                      calendarData?.customer?.phone?.mobile.substring(8, 12)}
                </Text>
                <Pressable
                  onPress={() => {
                    console.log('calednar data', calendarData);
                    navigation.navigate(SCREENS.CHATNAVIGATOR, {
                      screen: SCREENS.CHAT,
                      params: {
                        name: calendarData.customer.displayName,
                        phone: calendarData.customer.phone.mobile,
                        fromJobDetails: true,
                        calendarData,
                      },
                    });
                  }}>
                  <Image style={styles.messageIcon} resizeMode="contain" source={commentIcon} />
                </Pressable>
              </View>
              <Text
                style={{ ...styles.customerInfoText, paddingVertical: spacing.SCALE_10 }}
                onLongPress={handleCopyAddress}>
                {calendarData?.customer?.address[0]}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity onPress={handleDrive} style={{ ...styles.startButton, backgroundColor: colors.shadow }}>
            <Image style={styles.messageIcon} resizeMode="contain" source={car} />
            <Text style={{ color: colors.primary }}>
              {drive.drive ? 'Drive' : drive.onTheWay ? 'On My way' : 'Arrived'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.startButton} onPress={handleUpdateJobTime}>
            {start?.start ? (
              <>
                <Image style={styles.messageIcon} resizeMode="contain" source={playIcon} />
                <Text style={{ color: colors.text }}>Start</Text>
              </>
            ) : start?.inProgress ? (
              <>
                <Image style={styles.messageIcon} resizeMode="contain" source={finishIcon} />
                <Text style={{ color: colors.text }}>Finish</Text>
              </>
            ) : (
              <>
                <Image style={styles.messageIcon} resizeMode="contain" source={finishIcon} />
                <Text style={{ color: colors.text }}>Done</Text>
              </>
            )}
          </TouchableOpacity>
          {reviewSent ? (
            <TouchableOpacity style={styles.startButton} onPress={handleReviewRequest}>
              <Image style={styles.messageIcon} resizeMode="contain" source={star} />
              <Text style={{ color: colors.text }}>Sent</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.startButton} onPress={handleReviewRequest}>
              <Image style={styles.messageIcon} resizeMode="contain" source={star} />
              <Text style={{ color: colors.text }}>Review</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.ListItemView}>
          <View style={styles.contactInfoHeaderView}>
            <Text style={styles.contactInfoHeader}>Line Items</Text>
            <Text style={styles.contactInfoHeader}>${totalPrice.toFixed(2)}</Text>
          </View>
          <Accordian
            showAccordian={lineItems?.length > 0}
            onPressShowAccordian={() => setshowAccordian(!showAccordian)}
            onPressDelete={index => onPressDelete(index)}
            data={lineItems}
            header="Services"
            onPress={() => setShowModal({ service: true, materials: false })}
          />
          {/*  ############## will be added later ############ */}
          {/* <Accordian
            showAccordian={showAccordian}
            onPressDelete={index => onPressDeleteMaterials(index)}
            onPressShowAccordian={() => setshowAccordian(!showAccordian)}
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
                    {calendarData?.lineItem?.discount?.discountType
                      ? calendarData?.lineItem?.discount?.discountType
                      : percentageDiscount !== 0
                      ? 'By percentage'
                      : 'By value'}
                  </Text>
                  <Text>
                    ${' '}
                    {calendarData?.discount?.discount
                      ? calendarData?.discount?.discount
                      : discount == 0
                      ? percentageDiscount
                      : discount}
                  </Text>
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
        <ShowSchedule setShowSchedule={setShowSchedule} start={displayStartTime} end={displayEndTime} />
        <Modal visible={showSchedule} transparent={true} animation="slide">
          <TouchableWithoutFeedback onPress={() => setShowSchedule(false)}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                alignItems: 'center',
              }}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                  style={{
                    width: '90%',
                    marginTop: '40%',
                    position: 'relative',
                  }}>
                  <Pressable style={{ position: 'absolute', right: 10, top: 14, zIndex: 1 }} onPress={handleChangeDate}>
                    <Image
                      style={{
                        width: spacing.SCALE_30,
                        height: spacing.SCALE_30,
                      }}
                      source={confirmIcon}
                    />
                  </Pressable>
                  <View style={styles.modalHeader}>
                    <Schedule
                      defaultStartTime={moment(displayStartTime).format('hh:mm A')}
                      defaultEndTime={
                        combinedEndTime
                          ? moment(displayEndTime).format('hh:mm A')
                          : moment().hours(11).minutes(0).format('hh:mm A')
                      }
                      defaultStartDate={
                        combinedStartTime
                          ? moment(displayStartTime).format('MM/DD/YYYY')
                          : moment().format('MM/DD/YYYY')
                      }
                      defaultEndDate={
                        combinedEndTime ? moment(displayEndTime).format('MM/DD/YYYY') : moment().format('MM/DD/YYYY')
                      }
                      // defaultStartDate={
                      //   formattedStartDate !== `NaN/NaN/NaN` ? formattedStartDate : moment().format('MM/DD/YYYY')
                      // }
                      // defaultStartTime={
                      //   formattedStartTime !== 'NaN:NaN AM' ? formattedStartTime : moment().format('hh:mm A')
                      // }
                      // defaultEndDate={
                      //   formattedEndDate !== `NaN/NaN/NaN` ? formattedEndDate : moment().format('MM/DD/YYYY')
                      // }
                      // defaultEndTime={formattedEndTime !== 'NaN:NaN AM' ? formattedEndTime : moment().format('hh:mm A')}
                      setCombinedEndTime={setCombinedEndTime}
                      setCombinedStartTime={setCombinedStartTime}
                      setShowSchedule={setShowSchedule}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <DispatchInvoices data={displayedUsers} setModal={setShowDispatchModal} />

        <Modal visible={showDispatchModal} transparent={true}>
          <TouchableWithoutFeedback onPress={() => setShowDispatchModal(false)}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              }}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                  style={{
                    width: '90%',
                    marginTop: '40%',
                    marginLeft: '5%',
                    position: 'relative',
                    height: '20%',
                  }}>
                  <Pressable
                    style={{ position: 'absolute', right: 10, top: 35, zIndex: 1 }}
                    onPress={handleSaveDispatch}>
                    <Image
                      style={{
                        width: spacing.SCALE_30,
                        height: spacing.SCALE_30,
                      }}
                      source={saveIcon}
                    />
                  </Pressable>

                  <DispatchModal data={users} setSelectUser={setSelectUser} selectUser={selectUser} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* <JobTags
          data={keywordArr}
          onPress={onPress}
          onChangeText={text => setKeyword(text)}
          onRemove={index => onRemove(index)}
          value={keyword}
        /> */}
        <JobSourceDisplay data={displayedJobSource} setModal={setShowJobSourceModal} />
        <Modal visible={showJobSourceModal} transparent={true}>
          <TouchableWithoutFeedback onPress={() => setShowJobSourceModal(false)}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              }}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                  style={{
                    width: '90%',
                    marginTop: '40%',
                    marginLeft: '5%',
                    position: 'relative',
                    height: '20%',
                  }}>
                  <Pressable
                    style={{ position: 'absolute', right: 10, top: 5, zIndex: 1 }}
                    onPress={handleSaveJobSource}>
                    <Image
                      style={{
                        width: spacing.SCALE_30,
                        height: spacing.SCALE_30,
                      }}
                      source={saveIcon}
                    />
                  </Pressable>
                  <JobSource
                    defaultButtonText="Salesperson"
                    data={usersNames}
                    leadSource={displayedJobSource}
                    onSelect={(val, index) => setNewSalesPersonIndex(index)}
                    online={newOnline}
                    setOnline={setNewOnline}
                    referral={newReferral}
                    setReferral={setNewReferral}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        {/* <Attachments /> */}
        <Notes notes={displayedNotes} setModal={setShowNotesModal} />

        <Modal visible={showNotesModal} transparent={true}>
          <TouchableWithoutFeedback onPress={() => setShowNotesModal(false)}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              }}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                  style={{
                    width: '90%',
                    marginTop: '40%',
                    marginLeft: '5%',
                    position: 'relative',
                    height: '20%',
                  }}>
                  <Pressable style={{ position: 'absolute', right: 10, top: 20, zIndex: 1 }} onPress={handleSaveNotes}>
                    <Image
                      style={{
                        width: spacing.SCALE_20,
                        height: spacing.SCALE_20,
                      }}
                      source={saveIcon}
                    />
                  </Pressable>
                  <JobNotes value={newNotes} onChangeText={setNewNotes} />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        {paymentHistory && <PaymentHistory paymentHistory={paymentHistory} handleRefundClick={handleRefundClick} />}

        <Modal visible={showRefundModal} transparent={true}>
          <TouchableWithoutFeedback onPress={() => setShowRefundModal(false)}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
              }}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                  style={{
                    width: '90%',
                    marginTop: '40%',
                    marginLeft: '5%',
                    position: 'relative',
                    height: '20%',
                  }}>
                  <Pressable
                    style={{ position: 'absolute', right: 10, top: 20, zIndex: 1 }}
                    onPress={() => setShowRefundModal(false)}>
                    <Image
                      style={{
                        width: spacing.SCALE_20,
                        height: spacing.SCALE_20,
                      }}
                      source={closeIcon}
                    />
                  </Pressable>
                  <Refund
                    payment={refundPayment}
                    setPaymentHistory={setPaymentHistory}
                    setModal={setShowRefundModal}
                    calendarData={calendarData}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: spacing.SCALE_40 }}>
          <BigButton
            width={spacing.SCALE_154}
            onPress={() =>
              navigation.navigate(SCREENS.INVOICE_SCREEN, {
                jobId: calendarData?.jobId,
              })
            }>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: colors.text }}>Invoice</Text>
            </View>
          </BigButton>
          <BigButton
            width={spacing.SCALE_154}
            onPress={() =>
              navigation.navigate(SCREENS.CHECKOUTSCREEN, {
                screen: SCREENS.CHECKOUT,
                params: { jobId: calendarData?.jobId },
              })
            }>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: colors.text }}>Pay</Text>
            </View>
          </BigButton>
        </View>
      </ScrollView>
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
        modalHeader="Add Services"
        onPressCancel={() => setShowModal({ addDiscount: false, leaveScreen: false, service: false, materials: false })}
        visible={showModal.service}
      />
      {/* <ServicesModal
        onChangePieceName={text => setPieceName(text)}
        onChangeDescription={text => setDescription(text)}
        onChangeItemPrice={text => setItemPrice(text)}
        onChangeTotalUnits={text => settotalUnits(text)}
        onSave={onSaveMaterials}
        onPressPlus={onPressPlus}
        modalTotalPrice={totalUnits * itemPrice}
        onPressMinus={onPressMinus}
        totalUnitsValue={totalUnits.toString()}
        modalHeader="Add Materials"
        onPressCancel={() => setShowModal({ addDiscount: false, leaveScreen: false, service: false, materials: false })}
        visible={showModal.materials}
      /> */}
    </View>
  );
};

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
    paddingBottom: spacing.SCALE_10,
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
  customerInfoBox: {
    backgroundColor: colors.whiteBackground,
    borderColor: colors.primary,
    borderWidth: 1,
    flexDirection: 'row',
    marginHorizontal: spacing.SCALE_20,
    marginTop: spacing.SCALE_10,
    padding: spacing.SCALE_10,
    justifyContent: 'space-between',
    borderRadius: spacing.SCALE_6,
  },
  customerInfoText: {
    fontSize: typography.FONT_SIZE_16,
    color: '#111827',
    fontFamily: typography.primary,
  },
  messageIcon: {
    height: spacing.SCALE_20,
    width: spacing.SCALE_20,
  },
  startButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    padding: spacing.SCALE_10,
    borderRadius: spacing.SCALE_6,
    width: spacing.SCALE_90,
  },
  buttonView: { flexDirection: 'row', justifyContent: 'space-around', marginTop: spacing.SCALE_20 },
  ListItemView: {
    marginTop: spacing.SCALE_20,
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
  innerListItemView: {
    backgroundColor: colors.whiteBackground,
    marginHorizontal: spacing.SCALE_10,
    paddingHorizontal: spacing.SCALE_10,
    marginVertical: spacing.SCALE_10,
    borderRadius: spacing.SCALE_6,
  },
  icon: {
    height: spacing.SCALE_20,
    width: spacing.SCALE_20,
  },
});
export default JobDetailsPresenter;
