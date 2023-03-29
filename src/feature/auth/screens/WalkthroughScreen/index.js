import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../../../../theme';

const slides = [
  {
    key: 'slide1',
    image: require('@assets/images/walkthrough1.png'),
    title: 'Welcome to CRM 1',
    description:
      'Lorem ipsum dolor sit amet consectetur. Pellentesque commodo sit ultricies risus convallis. Quisque urna enim viverra commodo eleifend faucibus laoreet. Turpis dolor arcu lacus arcu volutpat. Massa nisi nec iaculis magna ',
  },
  {
    key: 'slide2',
    image: require('@assets/images/walkthrough1.png'),
    title: 'Welcome to CRM 2',
    description:
      'Lorem ipsum dolor sit amet consectetur. Pellentesque commodo sit ultricies risus convallis. Quisque urna enim viverra commodo eleifend faucibus laoreet. Turpis dolor arcu lacus arcu volutpat. Massa nisi nec iaculis magna ',
  },
  {
    key: 'slide3',
    image: require('@assets/images/walkthrough1.png'),
    title: 'Welcome to CRM 3',
    description:
      'Lorem ipsum dolor sit amet consectetur. Pellentesque commodo sit ultricies risus convallis. Quisque urna enim viverra commodo eleifend faucibus laoreet. Turpis dolor arcu lacus arcu volutpat. Massa nisi nec iaculis magna ',
  },
];

const WalkthroughScreen = () => {
  const navigation = useNavigation();
  const [slideIndex, setSlideIndex] = useState(0);

  const handleResponderRelease = () => {
    if (slideIndex === 2) {
      navigation.navigate('SignIn');
    }
  };

  return (
    <Swiper
      onTouchStartCapture={handleResponderRelease}
      onIndexChanged={setSlideIndex}
      style={styles.wrapper}
      activeDotStyle={styles.activeDot}
      dotStyle={styles.dotStyle}>
      {slides.map(slide => (
        <View key={slide.key} style={styles.slide}>
          <Image source={slide.image} style={styles.image} resizeMode="contain" />
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.description}>{slide.description}</Text>
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 264,
    height: 160,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.primary,
    marginTop: 64,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 40,
  },
  dotStyle: {
    width: 14,
    height: 14,
    borderRadius: 8,
    backgroundColor: colors.primaryDarker,
  },
  activeDot: {
    width: 16,
    height: 16,
    borderRadius: 10,
    borderWidth: 2,
    backgroundColor: '#fff',
    borderColor: colors.primaryDarker,
  },
});

export default WalkthroughScreen;
