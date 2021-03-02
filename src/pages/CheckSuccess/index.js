import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {Success} from '../../assets';
import Geolocation from '@react-native-community/geolocation';

const CameraSuccess = ({navigation}) => {
  const [location, setLocation] = useState('');
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

  useEffect(() => {
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        (info) => {
          const {coords} = info;
          console.log(coords.langitude);
          console.log(coords.latitude);
          setLocation(coords.latitude + ' ' + coords.longitude);
        },
        (error) => console.log(error),
        {
          enableHighAccuracy: false,
          timeout: 2000,
          maximumAge: 3600000,
        },
      );
    }
  }, []);

  const hasLocationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  const successCheck = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.image}>
      <Text style={styles.textStyle}>Login Selfie</Text>
      <Image source={Success} style={styles.iconContainer} />
      <Text style={styles.textlogin}>Login Selfie Berhasil</Text>
      <Text style={styles.textGeo}>Lokasi: {location} </Text>
      <Text style={styles.textTime}>Tanggal/Jam: {currentDate}</Text>
      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.buttonContainer} onPress={successCheck}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              color: 'white',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraSuccess;

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 50,
    margin: 20,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 20,
  },
  textlogin: {
    // margin: 15,
    paddingLeft: 30,
    marginBottom: 10,
    fontSize: 15,
    marginTop: 20,
  },
  textGeo: {
    paddingLeft: 30,
    fontSize: 15,
  },
  textTime: {
    paddingLeft: 30,
    fontSize: 15,
  },

  iconContainer: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
  },
  image: {
    padding: 20,
    marginTop: 50,
    marginBottom: 10,
    flex: 1,
  },
  buttonSection: {
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 70,
    marginBottom: 25,
    marginTop: 20,
  },
});
