
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const MySearchBarButton = (props) => {
  return (
    
    <View style={styles.container}>
      <Ionicons name="search" size={24} color="black" />
      <Text>{props.searchBarTitle}</Text>
    </View>
  )
}

export default MySearchBarButton

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
})