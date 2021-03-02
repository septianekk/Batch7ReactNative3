import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';

import firestore from '@react-native-firebase/firestore';

const CheckOut = () => {
  const [checkout, setCheckout] = useState([]);
  useEffect(() => {
    const subscriber = firestore()
      .collection('CheckIn')
      .onSnapshot((querySnapshot) => {
        // see next step
        const checkout = [];

        querySnapshot.forEach((documentSnapshot) => {
          checkout.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setCheckout(checkout);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
  return (
    <FlatList
      data={checkout}
      renderItem={({item}) => (
        <View style={styles.listItem}>
          <Text>Tanggal/Jam : {item.checkout}</Text>
        </View>
      )}
    />
  );
};

export default CheckOut;

const styles = StyleSheet.create({});
