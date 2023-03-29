import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { colors, typography } from '../../theme';

const DatePicker = ({
  mode = 'date',
  fontSize = typography.FONT_SIZE_14,
  getDate,
  defaultDate,
  disabled = false,
  opacity = 1,
  setStartDate,
  setEndDate,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateText, setDateText] = useState(defaultDate);

  useEffect(() => {
    setDateText(defaultDate);
  }, [defaultDate]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    if (setStartDate) {
      setStartDate('');
    }
    if (setEndDate) {
      setEndDate('');
    }
  };

  const handleConfirm = date => {
    if (mode == 'date') {
      hideDatePicker();

      setDateText(moment(date).format('MM/DD/YYYY'));
      getDate(moment(date).format('MM/DD/YYYY'));
    } else if (mode == 'time') {
      hideDatePicker();

      setDateText(moment(date).format('hh:mm A'));
      getDate(moment(date).format('hh:mm A'));
    } else {
      hideDatePicker();

      setDateText(moment(date).format('MM/DD/YYYY hh:mm A'));
      getDate(moment(date).format('MM/DD/YYYY hh:mm A'));
    }
  };

  return (
    <View>
      <TouchableOpacity activeOpacity={1} onPress={showDatePicker} disabled={disabled}>
        <Text style={[styles.dateText, { fontSize: fontSize, opacity: opacity }]}>
          {/\d/.test(defaultDate) ? dateText : defaultDate}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        minimumDate={new Date()}
        isVisible={isDatePickerVisible}
        date={moment(defaultDate, 'MM/DD/YYYY').toDate()}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  dateText: {
    color: colors.darkText,
  },
});
export default DatePicker;
