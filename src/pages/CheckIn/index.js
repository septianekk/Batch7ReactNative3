import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';

import firestore from '@react-native-firebase/firestore';

const CheckIn = () => {
  const [checkin, setCheckin] = useState([]);
  useEffect(() => {
    const subscriber = firestore()
      .collection('CheckIn')
      .onSnapshot((querySnapshot) => {
        // see next step
        const checkin = [];

        querySnapshot.forEach((documentSnapshot) => {
          checkin.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setCheckin(checkin);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
  return (
    <FlatList
      data={checkin}
      renderItem={({item}) => (
        <View>
          <View style={styles.listItem}>
            <Text>Tanggal/Jam : {item.currentDate}</Text>
          </View>
        </View>
      )}
    />
  );
};

export default CheckIn;

const styles = StyleSheet.create({});
