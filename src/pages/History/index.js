import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';

import firestore from '@react-native-firebase/firestore';

const History = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Ijin')
      .onSnapshot((querySnapshot) => {
        // see next step
        const users = [];

        querySnapshot.forEach((documentSnapshot) => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setUsers(users);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
  return (
    <FlatList
      data={users}
      renderItem={({item}) => (
        <View>
          <View style={styles.listItem}>
            <Image source={{uri: item.uri}} style={styles.img} />
            <View style={styles.listContent}>
              <Text>Kategori: {item.category}</Text>
              <Text>Perihal: {item.perihal}</Text>
              <Text>Keterangan: {item.keterangan}</Text>
              <Text>
                Dari Tanggal {item.startDate} sampai {item.endDate}
              </Text>
            </View>
          </View>
        </View>
      )}
    />
  );
};

export default History;

const styles = StyleSheet.create({
  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: '#FFF',
    width: '80%',
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    borderColor: 'black',
    shadowColor: '#00000021',
    marginTop: 20,

    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 10,
    flexBasis: '42%',
    marginHorizontal: 10,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 30,
    alignSelf: 'center',
  },
  listContent: {
    flex: 1,
    marginLeft: 20,
  },
});
