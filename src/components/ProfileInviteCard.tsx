import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import expoLanguageDetector from '../../plugins/expoLanguageDetector';
import { useTranslation } from 'react-i18next';
import { addResources } from '../../i18n';
import { en, tr } from '../../locales';

const ProfileInviteCard = () => {

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
    <TouchableOpacity style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>{t("profile.card.invitefriends")}</Text>
          <AntDesign name="right" size={18} color="black" />
        </View>
        <View style={styles.secondInnerContainer}>
            <Text>{t("profile.card.coinsyouearned")}</Text>
            <Text style={styles.paracik}>{t("profile.card.coins")}</Text>
        </View>
        <View style={styles.thirdInnerContainer}>
            <Text style={styles.thirdInnerContainerText}>{t("profile.card.inviteyourlovedones")}</Text>
        </View>
        <View style={styles.progressBarContainer}>
            <View style={styles.progressBar} />
            <View style={styles.progressBar} />
            <View style={styles.progressBar} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileInviteCard;

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: '4%',
    marginTop: '2%',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 10,
    // elevation: 5,
  },
  innerContainer: {
    borderRadius: 10,
    // overflow: 'hidden',
    backgroundColor: 'white',
  },
  secondInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '3%',
    paddingVertical: '1%',
  },
  thirdInnerContainer: {
    paddingHorizontal: '3%',
    paddingTop: '1%',
    paddingBottom: '4%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '3%',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paracik: {
    fontWeight: 'bold',
    color: '#e81f89'
  },
  thirdInnerContainerText: {
    fontSize: 11
  },
  progressBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 3,
    marginHorizontal: '3%',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#f6f7fb',
    marginHorizontal: 3,
    marginBottom: '4%',
    borderRadius: 10
  },
});