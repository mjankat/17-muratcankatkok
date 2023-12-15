import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';

const MySearchBar = (props) => {
  const [word, setWord] = useState('');

  const handleSearch = (text) => {
    setWord(text);
    props.onSearch(text);
  };

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={24} color="black" />
      <TextInput
        onChangeText={handleSearch}
        value={word}
        placeholder={props.searchBarTitle}
      />
    </View>
  );
}

export default MySearchBar

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 14,
    gap: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor:"#DCDBDB",
    backgroundColor: "#F5F6F8",
    borderRadius: 12,
    padding: 12,
    width: "90%",
  },
});
