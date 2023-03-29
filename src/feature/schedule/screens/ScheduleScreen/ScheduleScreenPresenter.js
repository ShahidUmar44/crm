import React, { useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import { TimelineCalendar } from '@howljs/calendar-kit';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SCREENS } from '../../../../constants';
import { colors, spacing } from '../../../../theme';

const ScheduleScreenPresenter = ({ responseData }) => {
  const { bottom: safeBottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const [viewMode, setViewMode] = useState('day');

  const calendarRef = useRef(null);
  //set Events
  let eventArr = [];

  responseData?.forEach(item => {
    let object = {
      id: item.jobId,
      title: item.customer.displayName,
      start: moment(item.start).subtract(moment().utcOffset(), 'minutes').toISOString(),
      end: moment(item.end).subtract(moment().utcOffset(), 'minutes').toISOString(),
      color: '#B1AFFF',
    };
    eventArr.push(object);
  });

  // onselect
  const onSelected = event => {
    const selectedEvent = responseData.find(item => item.jobId === event.id);
    navigation.navigate(SCREENS.JOBDETAILS, { calendarData: selectedEvent });
  };
  return (
    <View style={[styles.container, { paddingBottom: safeBottom }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Pressable
          style={{ ...styles.topButton, backgroundColor: viewMode === 'day' ? colors.primary : colors.whiteBackground }}
          onPress={() => setViewMode('day')}>
          <Text style={{ color: viewMode === 'day' ? colors.text : colors.darkText }}>Day</Text>
        </Pressable>
        <Pressable
          style={{
            ...styles.topButton,
            backgroundColor: viewMode === 'threeDays' ? colors.primary : colors.whiteBackground,
          }}
          onPress={() => setViewMode('threeDays')}>
          <Text style={{ color: viewMode === 'threeDays' ? colors.text : colors.darkText }}>Three Days</Text>
        </Pressable>
        <Pressable
          style={{
            ...styles.topButton,
            backgroundColor: viewMode === 'week' ? colors.primary : colors.whiteBackground,
          }}
          onPress={() => setViewMode('week')}>
          <Text style={{ color: viewMode === 'week' ? colors.text : colors.darkText }}>Week</Text>
        </Pressable>
      </View>
      <TimelineCalendar
        ref={calendarRef}
        viewMode={viewMode}
        allowPinchToZoom
        allowDragToCreate
        events={eventArr}
        onPressEvent={onSelected}
        theme={{
          unavailableBackgroundColor: 'transparent',
          //Saturday style
          saturdayName: { color: 'blue' },
          saturdayNumber: { color: 'blue' },
          saturdayNumberContainer: { backgroundColor: 'white' },

          //Sunday style
          sundayName: { color: 'red' },
          sundayNumber: { color: 'red' },
          sundayNumberContainer: { backgroundColor: 'white' },

          //Today style
          todayName: { color: 'green' },
          todayNumber: { color: 'white' },
          todayNumberContainer: { backgroundColor: 'green' },

          //Normal style
          dayName: { color: 'black' },
          dayNumber: { color: 'black' },
          dayNumberContainer: { backgroundColor: 'white' },
          allowFontScaling: false,
        }}
        locale="en"
        useHaptic
        timeZone="Asia/Tokyo"
      />
    </View>
  );
};

export default ScheduleScreenPresenter;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  headerRight: { marginRight: 16 },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    height: 85,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    height: 45,
    paddingHorizontal: 24,
    backgroundColor: '#1973E7',
    justifyContent: 'center',
    borderRadius: 24,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  btnText: { fontSize: 16, color: '#FFF', fontWeight: 'bold' },
  halfLineContainer: { backgroundColor: 'transparent' },
  topButton: {
    paddingVertical: spacing.SCALE_10,
    width: '33%',
    alignItems: 'center',
    borderRightWidth: 0.5,
    borderColor: colors.primary,
  },
});
