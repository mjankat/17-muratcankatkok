import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const ShoppingPhones = (props) => {
  const { width, height } = Dimensions.get('window');
  
  return (
    <View style={[styles.container, { height: height * 0.47 }]}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{props.titleText}</Text>
        {props.titleDescription && (
          <Text style={styles.titleDescription}>{props.titleDescription}</Text>
        )}
      </View>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: 'black',
          tabBarShowIcon: true,
          tabBarPressColor: '#ffffff',
          tabBarIndicatorStyle: {
          backgroundColor: '#0e9cd8',
          height: '80%',
          borderRadius: 30,
          marginBottom: 4,
          marginLeft: 6,
          width: '30%',
          },
          tabBarStyle: {
          backgroundColor: '#ffffff',
          elevation: 0,
          marginTop: 13,
          //   height: '30%',
          },
          tabBarLabelStyle: {
          fontSize: 12,
          textTransform: 'capitalize',
          },
      })}
      >
        <Tab.Screen name={props.firstTabName} component={props.firstTabComponent} 
          options={{
            tabBarLabel: props.firstTabLabel,
          }}
        />
        <Tab.Screen name={props.secondTabName} component={props.secondTabComponent} 
          options={{
            tabBarLabel: props.secondTabLabel,
          }}
        />
        <Tab.Screen name={props.thirdTabName} component={props.thirdTabComponent} 
          options={{
            tabBarLabel: props.thirdTabLabel,
          }}
        />
      </Tab.Navigator>
    </View>
  )
}

export default ShoppingPhones

const styles = StyleSheet.create({
    container: {
       flex: 1,
       width:'100%',
       backgroundColor: '#ffffff',
    },
    title: {
        marginTop: '9%',
        marginHorizontal: 10,
    },
    titleText: {
        fontSize: 16,
        fontWeight:'bold'
    },
    titleDescription: {
        marginTop: 10
    }
})
