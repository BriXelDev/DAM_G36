import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignContent: 'stretch',
  },
  headerLogo: {
    width: '100%',
    resizeMode: 'cover'
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  gameItemContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gameItemImage: {
    width: width - 32,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  gameItemTextContainer: {
    padding: 16,
  },
  gameItemTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  gameItemDescription: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    lineHeight: 24,
  },
});

export default styles;