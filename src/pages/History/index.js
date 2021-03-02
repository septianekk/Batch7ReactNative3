import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HistoryList from '../HistoryList';
import CheckIn from '../CheckIn';
import CheckOut from '../Checkout';
const Tab = createMaterialTopTabNavigator();

const History = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="History" component={HistoryList} />
      <Tab.Screen name="CheckIn" component={CheckIn} />
      <Tab.Screen name="CheckOut" component={CheckOut} />
    </Tab.Navigator>
  );
};

export default History;

const styles = StyleSheet.create({});
