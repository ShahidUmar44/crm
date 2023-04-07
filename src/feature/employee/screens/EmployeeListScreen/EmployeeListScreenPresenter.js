import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { SCREENS } from '../../../../constants';
import Input from '../../../../shared/form/Input';
import RealEmployeeCard from '../../components/RealEmployeeCard';
import EmptyListCard from '../../components/EmptyListCard';
import IconButton from '../../../../shared/buttons/IconButton';
import { colors, spacing, typography } from '../../../../theme';
import GoBackButton from '../../../../shared/buttons/GoBackButton';

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
  },
});

const EmployeeListScreenPresenter = ({
  getAllEmployees,
  loading,
  data,
  onEditUser,
  onDeleteUser,
  onAddUser,
  employeeData,
}) => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(employeeData);
  }, [employeeData]);

  useEffect(() => {
    if (search === '') {
      setFilteredData(employeeData);
    } else {
      setFilteredData(
        employeeData.filter(item => {
          const searchTerm = search.toLowerCase();
          const firstNameMatch = item?.firstName?.toLowerCase()?.includes(searchTerm);
          const lastNameMatch = item?.lastName?.toLowerCase()?.includes(searchTerm);
          const emailMatch = item?.email?.toLowerCase()?.includes(searchTerm);
          const phoneMatch = item?.phone?.toLowerCase()?.includes(searchTerm);

          return firstNameMatch || lastNameMatch || emailMatch || phoneMatch;
        }),
      );
    }
  }, [search]);

  useFocusEffect(
    React.useCallback(() => {
      getAllEmployees();
    }, []),
  );
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <GoBackButton />
        <Text style={styles.header}>Team Members</Text>
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
        placeholder={'Search'}
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
            <RealEmployeeCard
              item={item}
              onEditUser={() => onEditUser(item)}
              onPressName={() => onEditUser(item)}
              onDeleteUser={() => onDeleteUser(item)}
            />
          )}
          keyExtractor={item => item.id}
          ListEmptyComponent={EmptyListCard}
          contentContainerStyle={{ flex: employeeData?.length ? 0 : 1, paddingTop: spacing.SCALE_10 }}
        />
      )}
    </View>
  );
};

export default EmployeeListScreenPresenter;
