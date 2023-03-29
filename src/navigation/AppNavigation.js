import React from 'react';
import { ScrollView, Image, Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { signOut } from 'firebase/auth';

import { SCREENS } from '../constants';
import BottomTabs from './CustomTabBar';
import { auth } from '../utils/Firebase';
import { colors, spacing, typography } from '../theme';
import NewJobNavigator from '../feature/new-job/NewJobNavigator';
import InvoiceNavigator from '../feature/invoice/InvoiceNavigator';
import PaymentNavigator from '../feature/payment/PaymentNavigator';
import EmployeeNavigator from '../feature/employee/EmployeeNavigator';
import EstimateNavigator from '../feature/estimate/EstimateNavigator';
import CustomerNavigator from '../feature/customer/CustomerNavigator';
import JobDetailsNavigator from '../feature/job-details/JobDetailsNavigator';
import ChartNavigator from '../feature/chart/ChartNavigator';

import icon from '../../assets/images/Icon.png';
import crossIcon from '../../assets/images/x-02.png';
import logout from '../../assets/images/logout-02.png';
import industry from '../../assets/images/homeIcon.png';
import roleIcon from '../../assets/images/roleIcon.png';
import estimate from '../../assets/images/luggage-02.png';
import newJob from '../../assets/images/bank-note-05.png';
import editPencil from '../../assets/images/pencil.png';
import rightIcon from '../../assets/images/chevron-right.png';
import blueDollarIcon from '../../assets/images/blueDollarIcon.png';

/* ################################################################################
 * App/Root Navigation Settings
 * ############################################################################### */

const screenOptions = {
  headerTitle: false,
  headerShown: false,
  gestureEnabled: true,
  headerTransparent: true,
  headerBackTitleVisible: false,
};

const Drawer = createDrawerNavigator();

export default function AppNavigation() {
  const navigation = useNavigation();

  function CustomDrawerContent(props) {
    const onLogout = async () => {
      await signOut(auth);
      await AsyncStorage.removeItem('userToken');
    };

    return (
      <ScrollView>
        <View style={styles.customDrawerView}>
          <View style={styles.headerWrap}>
            <Pressable onPress={() => navigation.goBack()}>
              <Image style={styles.crossIcon} source={crossIcon} />
            </Pressable>
            <Pressable onPress={() => {}} style={styles.editProfileWrap}>
              <Text style={styles.headerText}>Edit Profile</Text>
              <Image style={styles.icon} source={editPencil} />
            </Pressable>
          </View>
          <DrawerItemList {...props} />
          <TouchableOpacity style={styles.logoutView} onPress={onLogout}>
            <Image style={styles.icon} source={logout} />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  const RenderItem = ({ name, leftIcon }) => {
    return (
      <View style={styles.drawerItem}>
        <View style={styles.itemLeftIconWrap}>
          <Image style={styles.itemLeftIcon} resizeMode="contain" source={leftIcon} />
        </View>
        <Text style={styles.itemTitle}>{name}</Text>
        <Image style={styles.itemRightIcon} resizeMode="contain" source={rightIcon} />
      </View>
    );
  };

  return (
    <Drawer.Navigator screenOptions={screenOptions} drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        options={{
          drawerLabel: '',
          drawerIcon: () => {
            return <RenderItem leftIcon={industry} name="Home" />;
          },
        }}
        name={SCREENS.HOMESCREEN}
        component={BottomTabs}
      />
      <Drawer.Screen
        name={SCREENS.EMPLOYEES_LIST}
        options={{
          drawerLabel: '',
          drawerIcon: () => {
            return <RenderItem leftIcon={icon} name="Employee" />;
          },
        }}
        component={EmployeeNavigator}
      />
      <Drawer.Screen
        options={{
          drawerLabel: '',
          drawerIcon: () => {
            return <RenderItem leftIcon={newJob} name="New Estimate" />;
          },
        }}
        name={SCREENS.ESTIMATE}
        component={EstimateNavigator}
      />
      <Drawer.Screen
        options={{
          drawerLabel: '',
          drawerIcon: () => {
            return <RenderItem leftIcon={estimate} name="New Job" />;
          },
        }}
        name={SCREENS.NEWJOB}
        component={NewJobNavigator}
      />
      <Drawer.Screen
        options={{
          drawerLabel: '',
          drawerIcon: () => {
            return <RenderItem leftIcon={estimate} name="Job Details" />;
          },
        }}
        name={SCREENS.JOBDETAILS}
        component={JobDetailsNavigator}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => {
            return <RenderItem leftIcon={icon} name="Customer" />;
          },
        }}
        name={SCREENS.CUSTOMER}
        component={CustomerNavigator}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => {
            return <RenderItem leftIcon={roleIcon} name="Invoice" />;
          },
        }}
        name={SCREENS.INVOICE}
        component={InvoiceNavigator}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => {
            return <RenderItem leftIcon={blueDollarIcon} name="Checkout" />;
          },
        }}
        name={SCREENS.CHECKOUTSCREEN}
        component={PaymentNavigator}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => {
            return <RenderItem leftIcon={roleIcon} name="Chart" />;
          },
        }}
        name={SCREENS.CHART}
        component={ChartNavigator}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    height: spacing.SCALE_16,
    width: spacing.SCALE_16,
  },
  drawerItem: {
    // height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: colors.primary,
    paddingBottom: spacing.SCALE_6,
    borderRadius: spacing.SCALE_6,
  },
  itemLeftIconWrap: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: spacing.SCALE_8,
    backgroundColor: colors.whiteBackground,
  },
  itemLeftIcon: { width: 26, height: 26 },
  itemTitle: { marginLeft: 22, fontSize: typography.FONT_SIZE_14 },
  itemRightIcon: {
    width: 26,
    height: 26,
    borderRadius: 8,
    marginLeft: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.whiteBackground,
  },
  headerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.SCALE_20,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.SCALE_14,
  },
  crossIcon: { width: 24, height: 24 },
  customDrawerView: {
    flex: 1,
    paddingTop: spacing.SCALE_24,
    backgroundColor: colors.shadow,
    paddingBottom: spacing.SCALE_20,
  },
  editProfileWrap: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: colors.primary,
    borderRadius: spacing.SCALE_6,
    height: 34,
    width: 120,
  },
  headerText: {
    color: colors.primaryDarker,
    marginRight: spacing.SCALE_10,
    fontSize: typography.FONT_SIZE_14,
  },
  logoutView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: spacing.SCALE_20,
    marginTop: spacing.SCALE_10,
  },
  logoutText: { color: colors.primaryDarker, marginLeft: spacing.SCALE_6 },
});
