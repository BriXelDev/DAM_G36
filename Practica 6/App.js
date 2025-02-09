import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useState } from 'react';

export default function App() {
  // Estado para almacenar la energía de la publicación
  const [energy, setEnergy] = useState(0);

  // Estado para mostrar/ocultar comentarios
  const [showComments, setShowComments] = useState(false);

  // Estado para almacenar la energía de los comentarios
  const [commentsEnergy, setCommentsEnergy] = useState([0, 0, 0]); 

  // Si la cantidad de energía es menor a 10, la aumenta
  const handleEnergy = () => {
    if (energy < 10) {
      setEnergy(energy + 1);
    }
  };

  // Recibe el índice de los comentarios, y sigue la misma lógica que la función de arriba
  const handleCommentEnergy = (index) => {
    const newEnergy = [...commentsEnergy];
    if (newEnergy[index] < 10) {
      newEnergy[index] += 1;
      setCommentsEnergy(newEnergy);
    }
  };

  // Roja si >3, Amarilla si <3 y >7. Verde si <7
  const getEnergyColor = (energy) => {
    return energy === 0 ? '#e74c3c' : energy < 3 ? '#e74c3c' : energy < 7 ? '#f1c40f' : '#2ecc71';
  };

  // Comentarios de la publicación (no se me ocurrió otra manera)
  const comments = [
    {
      id: 1,
      user: 'Hg Francor',
      description: 'Wen momo papu',
      text: 'Yo cuando me dicen "mira el audio que te mandé"',
      time: 'hace 5 minutos',
      isReply: false,
    },
    {
      id: 2,
      user: 'William Arm',
      description: 'Hail grasa :V',
      text: 'Yo cuando veo con los ojos',
      time: 'hace 10 minutos',
      isReply: false,
    },
    {
      id: 3,
      user: 'Neses Kris',
      description: 'Pucha que sal pasen el clorox :,v',
      text: 'Ni modo que veas con las orejas mamaguev0',
      time: 'hace 2 minutos',
      isReply: true, // Esto se verá como una respuesta
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.title}>MIMO</Text>
        <TouchableOpacity style={styles.button_icon}>
          <Icon name="user" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <ScrollView style={styles.bodycontent}>
          <View style={styles.post}>
            <View style={styles.postHeader}>
              <Image source={require('./assets/sanic1.jpg')} style={styles.pfp} />
              <View style={styles.userInfo}>
                <View style={styles.nameTime}>
                  <Text style={styles.postUser}>Sanic</Text>
                  <View style={styles.TimeEnergy}>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.postTime}>hace 9 minutos</Text>
                    {/* Barra de energía al lado del tiempo */}
                    <View style={styles.energyBarSmall}>
                      <Icon name="bolt" size={12} color={getEnergyColor(energy)} /> 
                      {energy > 0 && (
                        <View style={styles.EnergySmallContainer}>
                          <View
                            style={[
                              styles.energyProgressSmall,
                              { width: `${energy * 10}%`, backgroundColor: getEnergyColor(energy) },
                              {/*Aumenta el ancho de la barra dependiendo de la cantidad de energía, por ejemplo, si tiene 2 energías, el ancho será de 20%*/},
                              {/*Overflow evita que se vaya más lejos de su contenedor*/},
                            ]}
                          />
                        </View>
                      )}
                    </View>
                  </View>
                </View>
                <Text style={styles.profileDescription}>Puro meme rancio aquí :v</Text>
              </View>
            </View>
            <TextInput style={styles.postText}editable={true}> Yo cuando: </TextInput>
            <Image source={require('./assets/hqdefault.jpg')} style={styles.postImage} />
            {/* Sección de acciones (energía y comentarios) */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity onPress={handleEnergy} style={styles.actionButton}>
                <Icon name="bolt" size={20} color={getEnergyColor(energy)} /> 
                {/*El rayito también va a cambiar su color dependiendo de la cantidad de energía que tenga el comentario*/}
                <Text style={styles.actionText}>Energía</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => setShowComments(!showComments)}
              >
                <Icon name="comment" size={20} color="#666" />
                <Text style={styles.actionText}>Comentar</Text>
              </TouchableOpacity>
            </View>
            {/* Si se toca el botón, se desplegarán los comentarios*/}
            {showComments && (
              <View style={styles.commentsContainer}>
                {comments.map((comment, index) => ( // Copiamos el arreglo de comentarios de arriba, cada iteración devuelve un View con el comentario
                  <View
                    key={comment.id}
                    style={[
                      styles.comment,
                      comment.isReply && styles.commentReply, //En las iteraciones, si el atributo isReply es verdadero, se le aplica el estilo commentReply en lugar del estilo normal
                    ]}
                  >
                    <Image source={require('./assets/user-icon-vector.jpg')} style={styles.commentPfp} />
                    <View style={styles.commentContent}>
                      <Text style={styles.commentUser}>{comment.user}</Text>
                      <Text style={styles.commentDescription}>{comment.description}</Text>
                      <Text style={styles.commentText}>{comment.text}</Text>
                      <Text style={styles.commentTime}>{comment.time}</Text>
                      <View style={styles.commentEnergy}>
                        <TouchableOpacity onPress={() => handleCommentEnergy(index)} style={styles.commentEnergyButton}>
                          <Icon name="bolt" size={12} color={getEnergyColor(commentsEnergy[index])} />
                        </TouchableOpacity>
                        {commentsEnergy[index] > 0 && (
                          <View style={styles.commentEnergyBar}>
                            <View
                              style={[
                                styles.commentEnergyProgress,
                                { width: `${commentsEnergy[index] * 10}%`, backgroundColor: getEnergyColor(commentsEnergy[index]) },
                              ]}
                            />
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navbar: {
    backgroundColor: '#A138F5',
    height: '10%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop:'5%'
  },
  body: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f3f2ef',
  },
  bodycontent: {
    flex: 1,
    padding: 10,
  },
  post: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  pfp: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  nameTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postUser: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  TimeEnergy: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dot: {
    fontSize: 16,
    marginHorizontal: 5,
  },
  postTime: {
    color: '#666',
    fontSize: 14,
  },
  profileDescription: {
    color: '#666',
    fontSize: 14,
    marginTop: 2,
  },
  postText: {
    marginBottom: 10,
    fontSize: 16,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  energyBarSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    flex: 1,
  },
  EnergySmallContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#ecf0f1',
    borderRadius: 3,
    overflow: 'hidden', //Si se sale de las dimensiones, no se muestra
    marginLeft: 5,
  },
  energyProgressSmall: {
    height: '100%',
    borderRadius: 3,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#666',
  },
  commentsContainer: {
    marginTop: 10,
  },
  comment: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  commentReply: {
    marginLeft: 20, // Lo alineamos más a la derecha para simular una respuesta
  },
  commentPfp: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  commentContent: {
    flex: 1,
    marginLeft: 10,
  },
  commentUser: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  commentDescription: {
    fontSize: 12,
    color: '#666',
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  commentTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  commentEnergy: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  commentEnergyButton: {
    marginRight: 5,
  },
  commentEnergyBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#ecf0f1',
    borderRadius: 2,
    overflow: 'hidden',
  },
  commentEnergyProgress: {
    height: '100%',
    borderRadius: 2,
  },
  button_icon: {
    backgroundColor: '#A138F5',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%'
  },
});