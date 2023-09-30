import React from 'react';
import {View} from 'react-native';

const LabelBadge = ({color, dimension, margin}) => {
  return (
    <View
      style={{
        backgroundColor: color,
        height: dimension,
        width: dimension,
        borderRadius: dimension / 2,
        marginVertical: margin,
      }}
    />
  );
};

export default LabelBadge;
