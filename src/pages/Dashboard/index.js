import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Checkin, Checkout, Ijin, History, Logout} from '../../assets';
const Dashboard = ({navigation}) => {
  const [checkinDisabled, setCheckinDisabled] = useState(false);
  const [checkoutDisabled, setCheckoutDisabled] = useState(true);

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

  const checkinButton = () => {
    navigation.navigate('CameraCheck');
    setCheckinDisabled(true);
    setTimeout(() => {
      setCheckoutDisabled(false);
    }, 2000);
  };

  const checkoutButton = () => {
    Alert.alert('Check out Berhasil. Pada Tanggal/Jam' + currentDate);
    setCheckinDisabled(false);
    setCheckoutDisabled(true);
  };

  const ijinButton = () => {
    navigation.navigate('Form');
  };

  const historyButton = () => {
    navigation.navigate('History');
  };

  const signoutButton = () => {
    Alert.alert('Berhasil signout');
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.pages}>
      <View syle={styles.cardWrapper}>
        <Text style={styles.dashboardText}>Menu Dashboard</Text>
        <View style={styles.cardContent}>
          <TouchableOpacity
            style={[
              styles.card,
              {
                backgroundColor: checkinDisabled ? '#dddddd' : '#f7d9d9',
              },
            ]}
            disabled={checkinDisabled}
            onPress={checkinButton}>
            <View style={styles.cardContainer}>
              <Image source={Checkin} style={styles.cardImage} />
            </View>
            <Text style={styles.title}>Check-In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.card,
              {
                backgroundColor: checkoutDisabled ? '#dddddd' : '#f7d9d9',
              },
            ]}
            disabled={checkoutDisabled}
            onPress={checkoutButton}>
            <View style={styles.cardContainer}>
              <Image source={Checkout} style={styles.cardImage} />
            </View>
            <Text style={styles.title}>Check-Out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={ijinButton}>
            <View style={styles.cardContainer}>
              <Image source={Ijin} style={styles.cardImage} />
            </View>
            <Text style={styles.title}>Ijin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={historyButton}>
            <View style={styles.cardContainer}>
              <Image source={History} style={styles.cardImage} />
            </View>
            <Text style={styles.title}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={signoutButton}>
            <View style={styles.cardContainer}>
              <Image source={Logout} style={styles.cardImage} />
            </View>
            <Text style={styles.title}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  cardContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  cardWrapper: {
    flex: 1,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: 75,
    height: 50,
  },
  pages: {
    flex: 1,
    padding: 30,
  },

  dashboardText: {
    marginTop: 30,
    margin: 20,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 20,
  },
  card: {
    width: 150,
    height: 150,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00000021',

    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 10,
    backgroundColor: '#f7d9d9',
    flexBasis: '42%',
    marginHorizontal: 10,
  },
  cardImage: {
    height: 70,
    width: 70,
    alignSelf: 'center',
  },
  title: {
    marginTop: 30,
    fontSize: 18,
    color: '#696969',
  },
});
