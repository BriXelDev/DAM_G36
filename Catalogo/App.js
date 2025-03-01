import React, { useState } from 'react';
import { View, FlatList, Text, Image } from 'react-native';
import GameItem from './components/GameItem';
import games from './data/games';
import styles from './styles/styles'; // Importa los estilos

export default function App() {
  const [gameList, setGameList] = useState(games);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./assets/logo.jpg')} style={styles.headerLogo} />
      </View>
      <FlatList
        data={gameList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <GameItem game={item} />}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}