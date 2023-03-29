import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import moment from 'moment';

import DatePicker from '../date-picker/DatePicker';
import TimePicker from '../date-picker/TimePicker';
import { AppContext } from '../../context/AppContext';
import { colors, spacing, typography } from '../../theme';

import dateIcon from '../../../assets/images/dateIcon.png';
import timeIcon from '../../../assets/images/timeIcon.png';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const Schedule = ({
  defaultStartDate,
  defaultStartTime,
  defaultEndDate,
  defaultEndTime,
  setCombinedEndTime,
  setCombinedStartTime,
}) => {
  const navigation = useNavigation();
  const { setStart, setEnd } = useContext(AppContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const [timesWrong, setTimesWrong] = useState(false);
  const [datesWrong, setDatesWrong] = useState(false);

  const initialCombinedStartTime = moment(`${defaultStartDate} ${defaultStartTime}`, 'MM/DD/YYYY hh:mm A').toDate();

  const initialCombinedEndTime = moment(`${defaultEndDate} ${defaultEndTime}`, 'MM/DD/YYYY hh:mm A').toDate();

  useEffect(() => {
    if (!startTime) return;
    const formattedStartTime = moment(startTime, 'h:mm A');
    const newEndTime = moment(formattedStartTime).add(2, 'hours').format('h:mm A');
    setEndTime(newEndTime);
  }, [startTime]);

  useEffect(() => {
    if (!startDate) return;
    setEndDate(startDate);
  }, [startDate]);

  useEffect(() => {
    // check if the selected start time is after the end time
    const start = moment(startTime, 'h:mm A');
    const end = moment(endTime, 'h:mm A');
    if (start.isAfter(end)) {
      setTimesWrong(true);
    } else {
      setTimesWrong(false);
    }

    // check if the selected start date is after the end date
    const startDateCheck = moment(startDate, 'MM/DD/YYYY');
    const endDateCheck = moment(endDate, 'MM/DD/YYYY');
    if (startDateCheck.isAfter(endDateCheck)) {
      setDatesWrong(true);
    } else {
      setDatesWrong(false);
    }
  }, [startDate, endDate, startTime, endTime]);

  useEffect(() => {
    if (!startDate && !endDate && !startTime && !endTime) {
      setCombinedEndTime(initialCombinedEndTime);
      setCombinedStartTime(initialCombinedStartTime);
      return;
    }

    setTimeout(() => {
      // set the new combined start time and end time every time the selectedStartDate, selectedEndDate, selectedTimeStart, or selectedTimeEnd state variables change
      // we put it inside a set timeout so that we wait for the next event loop so the state variables update via other useEffects before we set the new combined start time and end time
      const newCombinedStartTime = moment(
        `${startDate ? startDate : moment().format('MM/DD/YYYY')} ${
          startTime ? startTime : moment().hours(9).minutes(0).format('hh:mm A')
        }`,
        'MM/DD/YYYY hh:mm A',
      ).toDate();

      const newCombinedEndTime = moment(
        `${endDate ? endDate : moment().format('MM/DD/YYYY')} ${
          endTime ? endTime : moment().hours(11).minutes(0).format('hh:mm A')
        }`,
        'MM/DD/YYYY hh:mm A',
      ).toDate();

      // console.log('initialCombinedStartTime', initialCombinedStartTime);
      // console.log('initialCombinedEndTime', initialCombinedEndTime);
      // console.log('newCombinedStartTime', newCombinedStartTime);
      // console.log('newCombinedEndTime', newCombinedEndTime);

      setCombinedStartTime(newCombinedStartTime);
      setCombinedEndTime(newCombinedEndTime);
    }, 200);
  }, [startDate, endDate, startTime, endTime]);

  // useEffect(() => {
  //   console.log('initialCombinedStartTime', initialCombinedStartTime);
  //   console.log('initialCombinedEndTime', initialCombinedEndTime);
  //   console.log('combinedStartTime', combinedStartTime);
  //   console.log('combinedEndTime', combinedEndTime);
  // }, [startTime, endTime, startDate, endDate]);

  return (
    <View style={styles.scheduleView}>
      <View style={styles.scheduleInfoHeaderView}>
        <Text style={styles.scheduleHeader}>Schedule </Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: spacing.SCALE_20 }}>
        <View style={[styles.dateField, datesWrong ? { backgroundColor: '#f87171' } : {}]}>
          <Image style={{ ...styles.dateIcon }} resizeMode="contain" source={dateIcon} />
          <DatePicker
            defaultDate={!startDate ? moment().format('MM/DD/YYYY').toString() : startDate}
            mode="date"
            getDate={date => setStartDate(date)}
          />
        </View>
        <View style={styles.dateField}>
          <Image style={{ ...styles.dateIcon }} resizeMode="contain" source={timeIcon} />
          <TimePicker
            defaultDate={!startTime ? moment().hours(9).minutes(0).format('hh:mm A') : startTime}
            mode="time"
            getDate={time => setStartTime(time)}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: spacing.SCALE_10,
          marginBottom: spacing.SCALE_10,
        }}>
        <View style={[styles.dateField, datesWrong ? { backgroundColor: '#f87171' } : {}]}>
          <Image style={{ ...styles.dateIcon }} resizeMode="contain" source={dateIcon} />
          <DatePicker
            defaultDate={!endDate ? moment().format('MM/DD/YYYY').toString() : endDate}
            mode="date"
            getDate={date => setEndDate(date)}
          />
        </View>
        <View style={styles.dateField}>
          <Image style={{ ...styles.dateIcon }} resizeMode="contain" source={timeIcon} />
          <TimePicker
            defaultDate={!endTime ? moment().hours(11).minutes(0).format('hh:mm A') : endTime}
            mode="time"
            getDate={time => setEndTime(time)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scheduleInfoHeaderView: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: spacing.SCALE_4,
    borderTopRightRadius: spacing.SCALE_4,
  },
  scheduleHeader: {
    fontSize: typography.FONT_SIZE_16,
    color: colors.whiteBackground,
    paddingLeft: spacing.SCALE_10,
    paddingVertical: spacing.SCALE_10,
  },
  scheduleView: {
    marginTop: spacing.SCALE_10,
    borderRadius: spacing.SCALE_4,
    backgroundColor: colors.shadow,
    paddingBottom: spacing.SCALE_10,
  },
  dateField: {
    backgroundColor: colors.whiteBackground,
    padding: spacing.SCALE_10,
    borderRadius: spacing.SCALE_4,
    flexDirection: 'row',
    alignItems: 'center',
    width: spacing.SCALE_128,
  },
  dateIcon: {
    height: spacing.SCALE_16,
    width: spacing.SCALE_16,
    marginRight: spacing.SCALE_6,
  },
});

export default Schedule;
