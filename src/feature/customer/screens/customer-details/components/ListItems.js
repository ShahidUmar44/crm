import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { SCREENS } from '../../../../../constants';
import Input from '../../../../../shared/form/Input';
import { colors, spacing, typography } from '../../../../../theme';

import searchIcon from '../../../../../../assets/images/searchIcon.png';
// list jobs
const ListItems = ({ data }) => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  console.log('jobs list data', data);

  return (
    <View style={styles.container}>
      {/* <Input
        value={search}
        onChangeText={setSearch}
        backgroundColor={colors.whiteBackground}
        leftImage={searchIcon}
        placeholder="Search"
      /> */}
      {data?.length == 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: typography.FONT_SIZE_16 }}>No Jobs</Text>
        </View>
      ) : (
        <ScrollView>
          {data?.length > 0 &&
            data?.map((item, key) => {
              return (
                <View style={styles.card} key={key}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text>$ {item.jobTotal}</Text>
                    <Text style={{ ...styles.jobNumber, fontSize: typography.FONT_SIZE_10 }}>
                      {item?.start?.seconds && new Date(item?.start.seconds * 1000).toLocaleDateString()}
                    </Text>
                  </View>
                  <Pressable onPress={() => navigation.navigate(SCREENS.JOBDETAILS)}>
                    {item.lineItems.map((line, key) => {
                      return (
                        <Text style={styles.jobNumber} key={key}>
                          {line.name}
                        </Text>
                      );
                    })}
                    <Text
                      style={{
                        width: '60%',
                      }}>
                      {item.customer.address?.[0]}
                    </Text>
                    <View
                      style={{
                        marginTop: spacing.SCALE_10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        width: '100%',
                      }}>
                      <View
                        style={{
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          width: '40%',
                        }}>
                        <Text style={styles.jobNumber} key={key}>
                          Dispatched
                        </Text>

                        {item.dispatchedTo.map(person => {
                          return (
                            <Text style={styles.personList} key={person.id}>
                              {`${person.firstName} ${person.lastName} `}
                            </Text>
                          );
                        })}
                      </View>
                      <View
                        style={{
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          width: '30%',
                        }}>
                        <Text style={styles.jobNumber} key={key}>
                          Source
                        </Text>
                        {item.leadSource.online && <Text style={styles.personList}>Online</Text>}
                        {item.leadSource.refferal && <Text style={styles.personList}>Refferal</Text>}
                        <Text style={styles.personList}>
                          {item.leadSource.salesPerson
                            ? item.leadSource.salesPerson.firstName + ' ' + item.leadSource.salesPerson.lastName
                            : ''}
                        </Text>
                      </View>

                      <View
                        style={{
                          width: '30%',
                          justifyContent: 'flex-end',
                          flex: 1,
                          alignSelf: 'flex-end',
                        }}>
                        <Text
                          style={{
                            ...styles.statusText,
                            color: item.datePaid ? colors.green : colors.error,
                            borderColor: item.datePaid ? colors.green : colors.error,
                          }}>
                          {item?.datePaid ? 'Paid' : 'Unpaid'}
                        </Text>
                      </View>
                    </View>
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
export default ListItems;
