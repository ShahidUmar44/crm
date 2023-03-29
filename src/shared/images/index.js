import React from 'react';
import { Image } from 'react-native';

export const PrimaryImage = ({ source, styles = {}, size, borderRadius }) => {
  return (
    <Image
      source={source}
      resizeMode={'contain'}
      style={[
        {
          height: size ?? 24,
          width: size ?? 24,
          borderRadius: borderRadius ?? 0,
        },
        styles,
      ]}
    />
  );
};
