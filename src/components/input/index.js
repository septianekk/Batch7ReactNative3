import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
// import {colors} from '../../global';
const Input = ({placeholder, ...rest}) => {
  return <TextInput style={styles.input} placeholder={placeholder} {...rest} />;
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 18,
    fontSize: 14,
    color: 'black',
    marginBottom: 20,
    marginTop: 10,
  },
});
