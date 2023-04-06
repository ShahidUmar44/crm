import React, { useRef, useState, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View, Animated } from 'react-native';
import moment from 'moment';
import { TimelineCalendar } from '@howljs/calendar-kit';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { SCREENS } from '../../../../constants';
import { colors, spacing } from '../../../../theme';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

const ScheduleScreenPresenter = ({ responseData, loading }) => {
  const { bottom: safeBottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const [viewMode, setViewMode] = useState('day');
  const [iconAnimation] = useState(new Animated.Value(0));

  // useEffect(() => {
  //   console.log('jobs', responseData);
  // }, [responseData]);

  const handleDatePress = () => {
    console.log('handlePress');
  };

  function hexToRGBA(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const calendarRef = useRef(null);
  //set Events
  const eventArr =
    responseData?.map(item => {
      const notStarted = !item.startedJobTime ? true : false;
      const finishedAndPaid = item.endedJobTime && item.datePaid ? true : false;
      const startedNotFinished = item.startedJobTime && !item.endedJobTime ? true : false;
      const finishedNotPaid = item.endedJobTime && !item.datePaid ? true : false;
      const baseColor =
        item.dispatchedTo && item.dispatchedTo[0].color.value ? item.dispatchedTo[0].color.value : '#374151';
      let backgroundColor = hexToRGBA(baseColor, 0.7);

      if (startedNotFinished) {
        backgroundColor = hexToRGBA(baseColor, 0.3);
      } else if (item.endedJobTime) {
        backgroundColor = hexToRGBA('#374151', 0.1);
      }
      return {
        id: item.jobId,
        title: item.customer?.displayName,
        // description:
        description: item.lineItems?.[0].name,
        amount: item.jobTotal,
        start: moment(item.start.toDate()),
        end: moment(item.end.toDate()),
        // color: '#f3f4f6',
        // color: '#dbeafe',
        // color: '#fef9c3',
        color: backgroundColor,
        paid: item.datePaid ? true : false,
        notStarted: !item.startedJobTime ? true : false,
        finishedAndPaid: item.endedJobTime && item.datePaid ? true : false,
        startedNotFinished: item.startedJobTime && !item.endedJobTime ? true : false,
        finishedNotPaid: item.endedJobTime && !item.datePaid ? true : false,
      };
    }) || [];

  function renderedEventContent(event) {
    return (
      <View
        style={[
          {
            flex: 1,
            flexDirection: 'column',
            paddingTop: 10,
            paddingHorizontal: 10,
          },
          event.finishedNotPaid
            ? { borderWidth: 2, borderColor: '#ef4444' }
            : event.finishedAndPaid
            ? { borderWidth: 2, borderColor: '#22c55e' }
            : event.startedNotFinished
            ? { borderWidth: 2, borderColor: '#374151' }
            : {},
        ]}>
        <Text style={{ color: 'black', fontWeight: 'bold', color: colors.gray800 }}>{event.title}</Text>
        {/* <Text style={{ color: 'black', marginTop: 10 }}>{event.description}</Text> */}
        <Text style={{ color: 'black', marginTop: 10, color: colors.gray700 }}>${event.amount.toFixed(2)}</Text>
      </View>
    );
  }

  // function renderedEventContent(event) {
  //   return (
  //     <View style={{ flex: 1, flexDirection: 'column', marginTop: 10, marginHorizontal: 10 }}>
  //       <Text style={{ color: 'black', fontWeight: 'bold' }}>{event.title}</Text>
  //       {/* <Text style={{ color: 'black', marginTop: 10 }}>{event.description}</Text> */}
  //       <Text style={{ color: 'black', marginTop: 10 }}>${event.amount.toFixed(2)}</Text>
  //     </View>
  //   );
  // }

  // onselect
  const onSelected = event => {
    console.log('event', event);
    const selectedEvent = responseData.find(item => item.jobId === event.id);
    navigation.navigate(SCREENS.JOBDETAILS, { calendarData: selectedEvent });
  };

  const [showList, setShowList] = useState(false);
  const handlePressAdd = () => {
    setShowList(!showList);
    Animated.timing(iconAnimation, {
      toValue: showList ? 0 : 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOff = () => {
    setShowList(false);
    Animated.timing(iconAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const onPressAddJob = () => {
    navigation.navigate(SCREENS.NEWJOB);
    handlePressOff();
  };
  return (
    <View style={[styles.container, { paddingBottom: 0 }]}>
      {showList && (
        <View style={styles.listContainer}>
          <Pressable onPress={onPressAddJob}>
            <Text>Add Job</Text>
          </Pressable>
        </View>
      )}
      <View style={styles.headerGroup}>
        <Pressable
          onPress={() => {
            //Optional
            const optionalProps = {
              //Default: today
              hourScroll: true,
              animatedHour: true,
              animatedDate: true,
            };
            calendarRef.current?.goToDate(optionalProps);
          }}>
          <Text style={{ fontWeight: 'bold' }}>Today</Text>
        </Pressable>
        <View style={styles.buttonGroup}>
          <Pressable
            style={{
              ...styles.topButton,
              backgroundColor: viewMode === 'day' ? colors.primary : colors.whiteBackground,
            }}
            onPress={() => setViewMode('day')}>
            <Text style={{ color: viewMode === 'day' ? colors.yellow300 : colors.darkText }}>Day</Text>
          </Pressable>

          <Pressable
            style={{
              ...styles.topButton,
              backgroundColor: viewMode === 'threeDays' ? colors.primary : colors.whiteBackground,
            }}
            onPress={() => setViewMode('threeDays')}>
            <Text style={{ color: viewMode === 'threeDays' ? colors.yellow300 : colors.darkText }}>3 Days</Text>
          </Pressable>
          <Pressable
            style={{
              ...styles.topButton,
              backgroundColor: viewMode === 'week' ? colors.primary : colors.whiteBackground,
            }}
            onPress={() => setViewMode('week')}>
            <Text style={{ color: viewMode === 'week' ? colors.yellow300 : colors.darkText }}>Week</Text>
          </Pressable>
        </View>
        <Pressable
          onPress={handlePressAdd}
          style={{
            alignContent: 'center',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <AnimatedIonicons
            name="add-circle-outline"
            size={35}
            color={colors.primary}
            style={{
              zIndex: 1005,
              transform: [
                {
                  rotate: iconAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '45deg'],
                  }),
                },
              ],
            }}
          />
        </Pressable>
      </View>
      {/* <Pressable
        onPress={() => {
          //Optional
          const optionalProps = {
            //Default: today
            hourScroll: true,
            animatedHour: true,
            animatedDate: true,
          };
          calendarRef.current?.goToDate(optionalProps);
        }}>
        <Text style={{ marginVertical: 10 }}>Today</Text>
      </Pressable> */}

      <TimelineCalendar
        ref={calendarRef}
        viewMode={viewMode}
        isLoading={loading}
        allowPinchToZoom
        allowDragToCreate
        events={eventArr}
        onLongPressBackground={date => console.log('long press background', date)}
        start={4}
        end={24}
        hourFormat="hh:mm A"
        onPressEvent={onSelected}
        theme={{
          unavailableBackgroundColor: 'transparent',
          //Saturday style
          saturdayName: { color: 'black' },
          saturdayNumber: { color: 'black' },
          saturdayNumberContainer: { backgroundColor: 'white' },

          //Sunday style
          sundayName: { color: 'black' },
          sundayNumber: { color: 'black' },
          sundayNumberContainer: { backgroundColor: 'white' },

          //Today style
          todayName: { color: '#a16207' },
          todayNumber: { color: colors.gray800 },
          todayNumberContainer: { backgroundColor: '#fde047' },

          //Normal style
          dayName: { color: 'black' },
          dayNumber: { color: 'black' },
          dayNumberContainer: { backgroundColor: 'white' },
          allowFontScaling: false,

          //loading bar
          loadingBarColor: '#fde047',
        }}
        locale="en"
        timeZone="America/Los_Angeles"
        renderEventContent={renderedEventContent}
      />
    </View>
  );
};

export default ScheduleScreenPresenter;

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  listContainer: {
    position: 'absolute',
    top: spacing.SCALE_70,
    right: spacing.SCALE_20,
    backgroundColor: 'white',
    width: '30%',
    zIndex: 1000,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'space-around',
    paddingVertical: spacing.SCALE_20,
    marginBottom: spacing.SCALE_20,
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
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerGroup: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  topButton: {
    paddingVertical: spacing.SCALE_10,
    width: '24%',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 0.5,
    marginRight: 2,
    borderColor: colors.gray700,
  },
});
