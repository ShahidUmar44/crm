import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { SCREENS } from '../../../../../constants';
import Input from '../../../../../shared/form/Input';
import { colors, spacing, typography } from '../../../../../theme';

import searchIcon from '../../../../../../assets/images/searchIcon.png';

const ListEstimate = ({ data }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {data?.length == 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: typography.FONT_SIZE_16 }}>No Estimates</Text>
        </View>
      ) : (
        <ScrollView>
          {data?.length > 0 &&
            data?.map(item => {
              return (
                <View style={styles.card} key={item?.estimateId}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>$ {item?.estimateTotal}</Text>
                    <Text style={{ ...styles.jobNumber, fontSize: typography.FONT_SIZE_10 }}>
                      {item?.dateAdded?.seconds && new Date(item?.dateAdded.seconds * 1000).toLocaleDateString()}
                    </Text>
                  </View>
                  <Pressable onPress={() => navigation.navigate(SCREENS.JOBDETAILS)}>
                    {item?.lineItems?.map((line, key) => {
                      return (
                        <Text style={styles.jobNumber} key={key}>
                          {line?.name}
                        </Text>
                      );
                    })}
                    <Text
                      style={{
                        width: '60%',
                      }}>
                      {item?.customer?.address?.[0]}
                    </Text>
                  </Pressable>
                </View>
              );
            })}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  card: {
    flexDirection: 'column',
    backgroundColor: colors.whiteBackground,
    padding: spacing.SCALE_10,
    borderRadius: spacing.SCALE_10,
    marginTop: spacing.SCALE_10,
  },
  statusText: {
    borderWidth: 0.5,
    borderColor: colors.primary,
    width: spacing.SCALE_70,
    textAlign: 'center',
    alignSelf: 'flex-end',
    borderRadius: spacing.SCALE_4,
    paddingVertical: 4,
  },
  jobNumber: {
    color: colors.primary,
    fontSize: typography.FONT_SIZE_16,
    marginVertical: spacing.SCALE_6,
    fontWeight: 'bold',
  },
  personList: {
    color: colors.primary,
    fontSize: typography.FONT_SIZE_16,
  },
});
export default ListEstimate;
