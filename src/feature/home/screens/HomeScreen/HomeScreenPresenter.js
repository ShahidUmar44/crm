import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { SCREENS } from '../../../../constants';
import { colors, spacing } from '../../../../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: spacing.SCALE_20,
    paddingRight: spacing.SCALE_20,
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
    bottom: spacing.SCALE_78,
    backgroundColor: 'white',
    width: '30%',

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

const HomeScreenPresenter = () => {
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

  const onPressAddJob = () => {
    navigation.navigate(SCREENS.NEWJOB);
    setShowList(false);
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
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <AnimatedIonicons
          name="add-circle-outline"
          size={50}
          color={colors.primary}
          style={{
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
  );
};

export default HomeScreenPresenter;
