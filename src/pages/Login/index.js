import React, {useState} from 'react';
import {
  ScrollViewBase,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Input} from '../../components';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const TestButton = () => {
    console.log('Berhasil Login' + email, password);
    navigation.navigate('Dashboard');
  };

  const loginUser = () => {
    console.log('Test Register');
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        Alert.alert('Berhasil Login');
        console.log('User account  signed in!');
        console.log('RESPONSE LOGIN' + response);
        navigation.navigate('Dashboard');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
  };

  return (
    <View style={styles.pages}>
      <ScrollView>
        <Text>Email: </Text>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <Text>Password: </Text>
        <Input
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={(value) => setPassword(value)}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={loginUser}>
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
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    padding: 30,
  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 100,
    marginBottom: 25,
    marginTop: 20,
  },
});
