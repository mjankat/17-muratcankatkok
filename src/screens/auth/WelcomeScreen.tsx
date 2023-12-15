import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MyWelcomeScreenButton from '../../components/MyWelcomeScreenButton'
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../services/firebase';
import { useNavigation } from '@react-navigation/native';
import expoLanguageDetector from '../../../plugins/expoLanguageDetector';
import { useTranslation } from 'react-i18next';
import { addResources } from '../../../i18n';
import { en, tr } from '../../../locales';

const WelcomeScreen = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const navigation = useNavigation();

  const language = expoLanguageDetector.detect();

  const { t } = useTranslation();


  useEffect(() => {
    const storageRef = ref(storage, 'images/welcomePhoto.png');

    getDownloadURL(storageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.error('Resmi alma hatası:', error);
      });

      if(language == "en") {
        addResources(en);
       }
       else {
        addResources(tr);
       }
  }, []);

  const navigateToEmail = () => {
    navigation.navigate('EmailScreen');
  };

  return (
    <View style={styles.container}>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
      <MyWelcomeScreenButton buttonText={t("buttontext.login")} onPress={navigateToEmail} arrow={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});

export default WelcomeScreen;