import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CategoryHome from './CategoryHome';
import CategoryBrand from './CategoryBrand';
import expoLanguageDetector from '../../../plugins/expoLanguageDetector';
import { useTranslation } from 'react-i18next';
import { addResources } from '../../../i18n';
import { en, tr } from '../../../locales';

const Tab = createMaterialTopTabNavigator();
const Categories = () => {

  const language = expoLanguageDetector.detect();

  const { t } = useTranslation();

  useEffect(() => {
   if(language == "en") {
    addResources(en);
   }
   else {
    addResources(tr);
   }
  }, []);

  return (
  <View style={styles.container}>
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: 'black',
          tabBarShowIcon: true,
          tabBarPressColor: '#ffffff',
          tabBarIndicatorStyle: {
            backgroundColor: '#e81f89',
            height: '80%',
            borderRadius: 30,
            marginBottom: 4,
            marginLeft: 12,
            width: '45%',
          },
          tabBarStyle: {
            backgroundColor: '#ffffff',
            elevation: 0,
            marginTop: 14,
            height: '6%',
          },
          tabBarLabelStyle: {
            fontSize: 12,
          },
        })}
      >
      <Tab.Screen name="CategoryHome" component={CategoryHome} 
       options={{
        tabBarLabel: t("navbar.categories"),
        
       }}
      
      />
      <Tab.Screen name="CategoryBrand" component={CategoryBrand} 
      options={{
        tabBarLabel: t("navbar.brands"),
        
       }}
      />
    </Tab.Navigator>
  </View>
  )
}

export default Categories

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
})