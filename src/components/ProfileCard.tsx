import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ProfileCard = (props) => {
  return (
    <TouchableOpacity style={styles.container}>
        <View style={styles.cardContainer}>
        <Feather name={props.iconName} size={24} color="black" />
        <Text style={styles.cardText}>{props.cardText}</Text>
        <Text style={styles.titleText}>{props.titleText}</Text>
        </View>
      
    </TouchableOpacity>
  )
}

export default ProfileCard

const styles = StyleSheet.create({
    container: {
        width: width * 0.3,
        height: height * 0.15,
        backgroundColor: '#f6f7fb',
        borderRadius: 8
    },
    cardContainer: {
        padding: 10,
    },
    cardText: {
        fontSize: 21,
        fontWeight: 'bold',
        color: '#e81f89',
        marginTop: '10%',
        marginLeft: '3%'
    },
    titleText: {
        fontSize: 12,
        color: '#aaabaf',
        marginTop: '3%'
    }

})