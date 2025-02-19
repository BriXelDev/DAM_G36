import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, ScrollView, Button} from 'react-native';
import { CheckBox } from '@rneui/themed';
import { useState } from 'react';

export default function App() {
  const [lista, setLista] = useState([]);
  const [texto, setTexto] = useState('');

  const agregarProducto = () => {
    if (texto) {
      setLista([...lista, { nombre: texto, seleccionado: false }]);
      setTexto('');
    }
  };

  const toggleSeleccionado = (index) => {
    const nuevaLista = [...lista];
    nuevaLista[index].seleccionado = !nuevaLista[index].seleccionado;
    setLista(nuevaLista);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.navbar}>
        <Text style={styles.title}>Lista de compras</Text>
      </View>

      {/* Agregar producto */}
      <View style={styles.agregar}>
        <TextInput placeholder="Necesito comprar..." value={texto} onChangeText={setTexto} style={styles.input}/>
        <Button title="Agregar" onPress={agregarProducto} />
      </View>

      {/* Lista de compras */}
      <ScrollView style={styles.lista}>
        <Text style={styles.subtitle}>Tus productos:</Text>
        {lista.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <CheckBox
              checked={item.seleccionado}
              onPress={() => toggleSeleccionado(index)}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="#1ED6B1"
              //Tomado de la documentación de react native elements (para el estilo del checkbox)
            />
            <Text style={styles.item}>{item.nombre}</Text>
          </View>
        ))}
      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BEFEFD',
  },
  navbar: {
    backgroundColor: '#1ED6B1',
    width: '100%',
    height: 75,
    justifyContent: 'center',
    paddingLeft: 16,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '5%',
  },
  agregar: {
    padding: 16,
    backgroundColor: '#88FAF0',
    width: '100%',
  },
  input: {
    marginBottom: 16,
    paddingVertical: 8,
  },
  lista: {
    flex: 1,
    padding: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  item: {
    fontSize: 16,
    marginLeft: 8,
  },
});