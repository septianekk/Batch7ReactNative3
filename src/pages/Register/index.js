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
import firestore from '@react-native-firebase/firestore';
const Register = ({navigation}) => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');

  const registUser = () => {
    console.log('test regist');
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log('User account created');
        console.log('responseNIHBOS' + response);
        firestore()
          .collection('users')
          .doc(email)
          .set({
            nama,
            email,
          })
          .then(() => {
            Alert.alert('Resgiter Berhasil');
            navigation.navigate('Dashboard');
          });
      });
  };

  return (
    <View style={styles.pages}>
      <ScrollView>
        <Text>Nama: </Text>
        <Input
          placeholder="Nama"
          value={nama}
          onChangeText={(value) => setNama(value)}
        />
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
        <Text>Re-Password: </Text>
        <Input
          placeholder="Re-Password"
          value={repassword}
          secureTextEntry
          onChangeText={(value) => setRePassword(value)}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={registUser}>
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
      </ScrollView>
    </View>
  );
};

export default Register;

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
