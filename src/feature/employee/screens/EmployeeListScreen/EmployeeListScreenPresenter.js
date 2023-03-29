import React, { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { SCREENS } from '../../../../constants';
import Input from '../../../../shared/form/Input';
import EmployeeCard from '../../components/EmployeeCard';
import EmptyListCard from '../../components/EmptyListCard';
import IconButton from '../../../../shared/buttons/IconButton';
import { colors, spacing, typography } from '../../../../theme';

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
    marginLeft: '38%',
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

  useFocusEffect(
    React.useCallback(() => {
      getAllEmployees();
    }, []),
  );
  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        {/* <GoBackButton /> */}
        <Text style={styles.header}>Employee</Text>
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
          data={employeeData}
          style={{ width: '100%' }}
          renderItem={({ item }) => (
            <EmployeeCard
              item={item}
              onEditUser={() => onEditUser(item)}
              onPressName={() =>
                navigation.navigate(SCREENS.ADD_EDIT_EMPLOYEE, { header: 'Employee details', employee: item })
              }
              onDeleteUser={() => onDeleteUser(item)}
            />
          )}
          keyExtractor={item => item.id}
          ListEmptyComponent={EmptyListCard}
          contentContainerStyle={{ flex: data?.length ? 0 : 1, paddingTop: spacing.SCALE_10 }}
        />
      )}
    </View>
  );
};

export default EmployeeListScreenPresenter;
