/* eslint-disable @typescript-eslint/no-unused-vars */
import { Image, Text, View } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { FeatureItemProps } from './props';
import CustomText from '../../../../../components/common/CustomText';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const FeatureItem = ({ title, content, imgSrc }: FeatureItemProps) => {

  const imageSource = typeof imgSrc === 'string' ? { uri: imgSrc } : imgSrc;

  return (
    <View style={styles.containner}>
      <Image source={imageSource} style={styles.image} />
      {/* <View style={styles.content}>
        <View style={{ ...styles.title }}>
          <CustomText text={title} />
        </View>
        <View style={styles.content}>
          <Text style={styles.TextContent}>{content}</Text>
        </View>
      </View> */}
    </View>
  );
};

export default FeatureItem;
