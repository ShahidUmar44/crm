import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { colors, SCALE_10, spacing, typography } from '../../../../theme';
import MultipleSelectDropDown from '../../../../shared/drop-down/MultipleSelectDropDown';

const DispatchModal = ({ data, setSelectUser }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dipatchView}>
        <View style={styles.dispatchHeaderView}>
          <Text style={styles.header}>Dispatch to</Text>
        </View>
        <View style={{ paddingBottom: spacing.SCALE_10, paddingHorizontal: 5 }}>
          <MultipleSelectDropDown data={data} setSelectUser={setSelectUser} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dipatchView: {
    borderRadius: spacing.SCALE_4,
    marginTop: spacing.SCALE_20,
    backgroundColor: colors.shadow,
    width: '100%',
    paddingBottom: spacing.SCALE_4,
  },
  dispatchHeaderView: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: spacing.SCALE_4,
    borderTopRightRadius: spacing.SCALE_4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: spacing.SCALE_10,
  },
  header: {
    fontSize: typography.FONT_SIZE_16,
    color: colors.whiteBackground,
    paddingLeft: spacing.SCALE_10,
    paddingVertical: spacing.SCALE_10,
  },
});
export default DispatchModal;
