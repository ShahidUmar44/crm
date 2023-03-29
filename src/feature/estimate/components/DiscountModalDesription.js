import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BigButton from '../../../shared/buttons/BigButton';

import Input from '../../../shared/form/Input';
import { colors, spacing } from '../../../theme';

const DiscountModalDesription = ({ onPress, onChangeDesription, onChangePrice, leftImage }) => {
  return (
    <View style={styles.container}>
      <Input
        paddingTop={spacing.SCALE_4}
        textAlignVertical={'top'}
        alignItems={'flex-start'}
        placeholder="Descriotion..."
        height={spacing.SCALE_88}
        onChangeText={onChangeDesription}
        width={spacing.SCALE_244}
      />
      <Input
        onChangeText={onChangePrice}
        leftImage={leftImage}
        placeholder="$ 0.00"
        height={spacing.SCALE_40}
        width={spacing.SCALE_244}
        keyboardType={'numeric'}
      />
      <View style={{ marginTop: spacing.SCALE_10 }}>
        <BigButton width={spacing.SCALE_244} height={spacing.SCALE_40} onPress={onPress}>
          <Text style={{ color: colors.text }}>Save</Text>
        </BigButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
});
export default DiscountModalDesription;
