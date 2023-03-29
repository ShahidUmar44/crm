import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { SCREENS } from '../../../../constants';
import Input from '../../../../shared/form/Input';
import IconButton from '../../../../shared/buttons/IconButton';
import { colors, spacing, typography } from '../../../../theme';
import GoBackButton from '../../../../shared/buttons/GoBackButton';
import EmployeeCard from '../../../employee/components/EmployeeCard';
import EmptyListCard from '../../../employee/components/EmptyListCard';

import SearchIcon from '../../../../../assets/images/search-icon.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.whiteBackground,
  },
  headerWrapper: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.SCALE_10,
  },
  header: {
    fontSize: typography.FONT_SIZE_20,
    fontFamily: typography.secondary,
    color: colors.primaryDarker,
    width: '90%',
    textAlign: 'center',
    paddingLeft: '5%',
  },
});

const CustomersListScreenPresenter = ({ data, onEditUser, onDeleteUser, onAddUser, getAllCustomers, loading }) => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  const filteredData = data.filter(item => item?.displayName?.toLowerCase()?.includes(search.toLowerCase()));

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.header}>Customers</Text>
        <IconButton onPress={onAddUser}>
          <AntDesign name="adduser" size={20} color={colors.primaryDarker} />
        </IconButton>
      </View>
      <Input
        value={search}
        onChange={setSearch}
        onChangeText={setSearch}
        error={''}
        width="90%"
        leftImage={SearchIcon}
        placeholder={'Search employee'}
        height={spacing.SCALE_44}
        borderRadius={spacing.SCALE_22}
        backgroundColor={colors.shadow}
      />
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredData}
          style={{ width: '100%' }}
          renderItem={({ item }) => (
            <EmployeeCard
              onPressName={() => navigation.navigate(SCREENS.CUSTOMER_DETAILS, { item })}
              item={item}
              onEditUser={() => onEditUser(item)}
              onDeleteUser={() => onDeleteUser(item)}
            />
          )}
          keyExtractor={(item, index) => index}
          ListEmptyComponent={EmptyListCard}
          contentContainerStyle={{ flex: data?.length ? 0 : 1, paddingTop: spacing.SCALE_10 }}
        />
      )}
    </View>
  );
};

export default CustomersListScreenPresenter;
