import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const CameraCheck = ({navigation}) => {
  const [uri, setUri] = useState(
    'https://image.flaticon.com/icons/png/512/147/147144.png',
  );
  const [fileUri, setFileUri] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    let date = new Date().getDate(); //Current Date
    let month = new Date().getMonth() + 1; //Current Month
    let year = new Date().getFullYear(); //Current Year
    let hours = new Date().getHours(); //Current Hours
    let min = new Date().getMinutes(); //Current Minutes
    let sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    );
  }, []);

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
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const formSubmit = (downloadData, namaGambar) => {
    console.log('Sukses ');
    firestore()
      .collection('CheckIn')
      .add({
        currentDate: currentDate,
        uri: downloadData,
        namaGambar: namaGambar,
      })
      .then(() => {
        console.log('User CheckIn');
        Alert.alert('Data berhasil checkin');
        navigation.navigate('CheckSuccess');
      });
  };

  const buttonSelfie = () => {
    console.log(uriCheck);
    navigation.navigate('CheckSuccess');
  };
  return (
    <View style={styles.pages}>
      <Text>Current Date Time</Text>
      <Text>{currentDate}</Text>
      <View style={styles.image}>
        <Image style={styles.cameraContainer} source={{uri: uri}} />
      </View>
      <View style={styles.buttonSelfie}>
        <Button
          title="Login Foto Selfie"
          onPress={() => {
            if (requestPermission()) {
              captureCamera();
            }
          }}
        />
      </View>
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
    </View>
  );
};

export default CameraCheck;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    padding: 30,
  },
  image: {
    marginBottom: 10,
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
  buttonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 100,
    marginBottom: 25,
    marginTop: 20,
  },
  buttonSelfie: {
    marginTop: 20,
  },
});
