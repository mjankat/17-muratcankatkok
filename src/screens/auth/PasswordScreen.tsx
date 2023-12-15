import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import MyWelcomeScreenButton from '../../components/MyWelcomeScreenButton';
import { auth } from "../../services/firebase";
import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import expoLanguageDetector from '../../../plugins/expoLanguageDetector';
import { useTranslation } from 'react-i18next';
import { addResources } from '../../../i18n';
import { en, tr } from '../../../locales';

const PasswordScreen = ({ route }) => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const email = route.params.email;

  // const navigateToHome = async () => {
  //   let signInMethods = await fetchSignInMethodsForEmail(auth, email);
  //   if (signInMethods.length > 0) {
  //     signInWithEmailAndPassword(auth, email, password).then(() => {
  //       navigation.navigate("HomeRoutes");
  //     });
  //   } else {
  //     createUserWithEmailAndPassword(auth, email, password).then(() => {
  //       navigation.navigate("HomeRoutes");
  //     });
  //   }
  // };

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

  const navigateToHome = async () => {
    try {
      let signInMethods = await fetchSignInMethodsForEmail(auth, email);
  
      if (signInMethods.length > 0) {
        await signInWithEmailAndPassword(auth, email, password);
        navigation.navigate("HomeRoutes");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        await signInWithEmailAndPassword(auth, email, password);
        navigation.navigate("HomeRoutes");
      }
    } catch (error) {
      console.error("Bir hata oluştu: ", error);
    }
  };
  

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>{t("password")}</Text>
    </View>
    <View style={styles.description}>
      <Text style={styles.descriptionText}>{t("enterpassword")}</Text>
    </View>
    <View style={styles.textInputContainer}>
     <TextInput
           style={styles.textInput}
           placeholder={t("enterpasswordplease")}
           secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          value={password}
       />
    </View>
    <View style={styles.horizontalLine} />
    <MyWelcomeScreenButton buttonText={t("buttontext.continue")} onPress={navigateToHome} arrow={true} />
  </View>
  )
}

export default PasswordScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    marginTop: 30,
  },
  headerText: {
    fontSize: 36,
  },
  description: {
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 24,
  },
  textInputContainer: {
    marginTop: 20,
  },
  textInput: {
    fontSize: 18,
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginTop: 10,
  },
})