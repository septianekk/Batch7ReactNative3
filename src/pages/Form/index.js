import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
  Button,
  Alert,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {Picker} from '@react-native-picker/picker';
import {Input} from '../../components';
import * as ImagePicker from 'react-native-image-picker';

const Form = ({navigation}) => {
  const [kategori, setKategori] = useState('');

  const [perihal, setPerihal] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [uri, setUri] = useState(
    'https://cdn0.iconfinder.com/data/icons/set-app-incredibles/24/Image-01-512.png',
  );
  const [fileUri, setFileUri] = useState('');

  const saveImage = () => {
    const namefile = '' + new Date();
    const reference = storage().ref(namefile);
    const pathToFile = uri;
    reference.putFile(pathToFile).then(() => {
      console.log('Uploaded');
      storage()
        .ref(namefile)
        .getDownloadURL()
        .then((downloadData) => {
          console.log(downloadData);
          console.log(namefile);
          formSubmit(downloadData, namefile);
        });
    });
  };

  const formSubmit = (downloadData, namaGambar) => {
    console.log('Sukses ' + kategori, perihal, keterangan, uri);
    firestore()
      .collection('Ijin')
      .add({
        category: kategori,
        perihal: perihal,
        keterangan: keterangan,

        uri: downloadData,
        namaGambar: namaGambar,
      })
      .then(() => {
        console.log('User Addeed');
        Alert.alert('Data berhasil di input');
        navigation.navigate('Dashboard');
      });
  };

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
        // If Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.PERMISSIONS_CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        this.captureCamera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const captureCamera = () => {
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        console.log('data urinya ' + response);
        // this.setState({uri: response.uri});
        setUri(response.uri);
        setFileUri(response);
      },
    );
  };

  return (
    <View style={styles.pages}>
      <ScrollView>
        <Text>Kategori: </Text>
        <View style={styles.container}>
          <Picker
            selectedValue={kategori}
            style={styles.pick}
            onValueChange={(itemValue) => setKategori(itemValue)}>
            <Picker.Item label="Pilih Kategori" />
            <Picker.Item label="Izin Bencana" value="Izin Bencana" />
            <Picker.Item label="Izin Sakit" value="Izin Sakit" />
            <Picker.Item label="Izin Anak Sakit" value="Izin Anak Sakit" />
          </Picker>
        </View>

        <Text>Perihal: </Text>
        <Input
          placeholder="Perihal"
          value={perihal}
          onChangeText={(value) => setPerihal(value)}
        />
        <Text>Keterangan: </Text>
        <TextInput
          multiline={true}
          numberOfLines={7}
          style={styles.inputArea}
          placeholder="Keterangan"
          placeholderTextColor="#aaaaaa"
          onChangeText={(value) => setKeterangan(value)}
          value={keterangan}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <View style={styles.image}>
          <Text>Lampiran: </Text>
          <Image style={styles.cameraContainer} source={{uri: uri}} />
        </View>
        <Button
          title="Take image"
          onPress={() => {
            if (requestPermission()) {
              captureCamera();
            }
          }}
          style={styles.Button}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={saveImage}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              color: 'white',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}>
            Submit
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    padding: 30,
  },
  container: {
    // flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  inputArea: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 18,
    fontSize: 14,
    color: 'black',
    marginBottom: 20,
    marginTop: 10,
    textAlignVertical: 'top',
    backgroundColor: 'white',
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
  pick: {
    borderColor: 'black',
    fontSize: 14,
    color: 'black',
    textAlignVertical: 'top',
  },
  cameraContainer: {
    borderWidth: 1,
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    borderColor: 'black',
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    marginTop: 20,
  },
  image: {
    marginBottom: 10,
  },
});
