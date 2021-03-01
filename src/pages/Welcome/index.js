import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const Welcome = ({navigation}) => {
  const handleLogin = () => {
    navigation.navigate('Login');
  };
  const handleRegister = () => {
    navigation.navigate('Register');
  };
  return (
    <View style={styles.page}>
      <Text style={styles.welcomeText}>Welcome</Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: 'bold',
            color: 'white',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleRegister}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: 'bold',
            color: 'white',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}>
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  welcomeText: {
    fontSize: 50,
    color: 'black',
    marginBottom: 76,
  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 100,
    marginBottom: 25,
  },
});
