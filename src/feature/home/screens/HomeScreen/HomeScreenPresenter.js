import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated, Dimensions, ScrollView } from 'react-native';
import { UserContext } from '../../../../context/UserContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LineChart, BarChart, ProgressChart } from 'react-native-chart-kit';

import { SCREENS } from '../../../../constants';
import { colors, spacing } from '../../../../theme';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: spacing.SCALE_20,
    paddingTop: Platform.OS === 'ios' ? spacing.SCALE_10 : spacing.SCALE_10,
    paddingBottom: spacing.SCALE_8,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
});
const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons);

const HomeScreenPresenter = ({ dailyRevenue, averageJobSize, monthlyRevenue }) => {
  const { userData } = useContext(UserContext);
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [830, 762, 810, 700, 723, 493, 677, 641, 509, 213, 335, 198, 29],
      },
    ],
  };
  const navigation = useNavigation();
  // states
  const [showList, setShowList] = useState(false);
  const [iconAnimation] = useState(new Animated.Value(0));

  const handlePress = () => {
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
    <View style={styles.container}>
      {showList && (
        <View style={styles.listContainer}>
          <TouchableOpacity onPress={onPressAddJob}>
            <Text>Add Job</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.header}>
        <Text style={{ fontSize: 20, color: colors.primary, fontWeight: 'bold' }}>{userData.bizData.companyName}</Text>

        <TouchableOpacity onPress={handlePress}>
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
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ width: '100%' }}>
        <TouchableWithoutFeedback onPress={handlePressOff}>
          <View
            style={{
              width: '100%',
              flexDirection: 'column',
            }}>
            <Text style={{ fontSize: 20, color: colors.primary, fontWeight: 'bold' }}>Average Job Size</Text>
            {averageJobSize && (
              <BarChart
                style={{ marginBottom: 16, borderRadius: 16 }}
                data={averageJobSize}
                width={Dimensions.get('window').width - 40}
                height={200}
                yAxisSuffix={''}
                yAxisLabel={'$'}
                chartConfig={{
                  backgroundGradientFrom: '#1e3a8a',
                  backgroundGradientTo: '#2563eb',
                  color: (opacity = 2) => `rgba(255, 255, 255, ${opacity})`,
                  decimalPlaces: 0, // optional, defaults to 2dp
                }}
              />
            )}

            <Text style={{ fontSize: 20, color: colors.primary, fontWeight: 'bold' }}>Daily Revenue</Text>
            {dailyRevenue && (
              <LineChart
                data={dailyRevenue}
                width={Dimensions.get('window').width - 40} // from react-native
                height={220}
                yAxisLabel={'$'}
                chartConfig={{
                  backgroundGradientFrom: '#f9fafb',
                  backgroundGradientTo: '#fefce8',
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                }}
                bezier
                style={{
                  borderRadius: 16,
                  marginBottom: 16,
                }}
              />
            )}
            <Text style={{ fontSize: 20, color: colors.primary, fontWeight: 'bold' }}>Monthly Revenue</Text>
            {monthlyRevenue && (
              <LineChart
                style={{ marginBottom: 16, borderRadius: 16 }}
                data={monthlyRevenue}
                width={Dimensions.get('window').width - 40}
                height={220}
                yAxisLabel={'$'}
                chartConfig={{
                  backgroundGradientFrom: '#111827',
                  backgroundGradientTo: '#6f5b0a',
                  color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`,
                  decimalPlaces: 0, // optional, defaults to 2dp
                  style: {
                    borderRadius: 16,
                  },
                }}
                bezier
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  );
};

export default HomeScreenPresenter;
