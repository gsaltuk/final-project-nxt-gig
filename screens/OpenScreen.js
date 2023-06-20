import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import UserContext from '../context/user-context';

const OpenScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user) {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Welcome');
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/nxt-gig-logo.png')}
          style={styles.image}
        />
        <Image
          source={require('../assets/716.gif')}
          style={styles.spinner}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    aspectRatio: 1,
    resizeMode: 'contain',
    marginBottom: -75,
  },
  spinner: {
    width: '80%',
    aspectRatio: 1,
    resizeMode: 'contain',
    marginTop: 0
  }
});

export default OpenScreen;
