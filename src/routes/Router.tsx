import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeRoutes from './HomeRoutes';
import AuthRoutes from './AuthRoutes';
import { useState } from 'react';
import { useEffect } from 'react';
import { auth } from '../services/firebase';
import SearchScreen from '../screens/home/SearchScreen';
import { AntDesign } from '@expo/vector-icons'; 
import BrandMap from '../screens/home/BrandMap';
import expoLanguageDetector from '../../plugins/expoLanguageDetector';
import { useTranslation } from 'react-i18next';
import { addResources } from '../../i18n';
import { en, tr } from '../../locales';

const Stack = createNativeStackNavigator();
const Router = () => {
    const [user, setUser] = useState(null);

    const language = expoLanguageDetector.detect();

    const { t } = useTranslation();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) setUser(user);
            else setUser(null);
        });

        if(language == "en") {
            addResources(en);
           }
           else {
            addResources(tr);
           }
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {user ? (
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name="HomeRoutes"
                        component={HomeRoutes} />
                ) : (
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name="AuthRoutes"
                        component={AuthRoutes} />
                )}
                <Stack.Screen
                    options={({ navigation }) => ({
                        headerTitle: t("router.search"),
                        headerTitleAlign: 'center',
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <AntDesign name="left" size={24} color="black" />
                            </TouchableOpacity>
                        ),
                        headerStyle: {
                            backgroundColor: 'white',
                        },
                        headerShadowVisible: false,
                    })}
                    name="SearchScreen"
                    component={SearchScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router

const styles = StyleSheet.create({})
