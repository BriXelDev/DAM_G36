import React, { useState } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import styles from '../styles/styles';

const GameItem = ({ game }) => {
  const [imageHeight, setImageHeight] = useState(200);

  const onImageLoad = (event) => {
    const { width, height } = event.nativeEvent.source;
    const screenWidth = Dimensions.get('window').width - 32;
    const calculatedHeight = (screenWidth * height) / width;
    setImageHeight(calculatedHeight);
  };
  /*No encontré una manera más simple de colocarlos, los tamaños fijos no funcionan en todas 
  las imágenes porque vienen con diferentes 
  dimensiones y se veían mal*/

  return (
    <View style={styles.gameItemContainer}>
      <Image
        source={game.image}
        style={[styles.gameItemImage, { height: imageHeight }]}
        resizeMode="cover"
        onLoad={onImageLoad}
      />
      <View style={styles.gameItemTextContainer}>
        <Text style={styles.gameItemTitle}>{game.name}</Text>
        <Text style={styles.gameItemDescription}>{game.description}</Text>
      </View>
    </View>
  );
};

export default GameItem;