import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import expoLanguageDetector from '../../plugins/expoLanguageDetector';
import { useTranslation } from 'react-i18next';
import { addResources } from '../../i18n';
import { en, tr } from '../../locales';

const ProfileModalButton = ({ text, isArrow, iconComponentName, iconName, isSurvey }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handlePressIn = () => {
    setIsFocused(true);
  };

  const handlePressOut = () => {
    setIsFocused(false);
  };

  const IconComponent = iconComponentName === 'Feather' ? Feather 
  : iconComponentName === 'MaterialCommunityIcons' ? MaterialCommunityIcons
  : iconComponentName === 'Octicons' ? Octicons
   : AntDesign;

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
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.container,
        isFocused && styles.focusedContainer,
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={styles.innerContainer}>
        <View style={styles.iconAndTextContainer}>
          <IconComponent name={iconName} size={24} color="black" />
          <Text style={styles.buttonText}>{text}</Text>
        </View>
        <View style={styles.isSurveyContainer}>
          {isSurvey && (
            <View style={styles.surveyContainer}>
            <View style={styles.surveyInnerContainer}>
              <Text style={styles.surveyText}>%0</Text>
            </View>
          </View>
          )}
        {isArrow && <AntDesign name="right" size={16} color="black" />}
        </View>
      </View>
        {isSurvey && (
          <View style={styles.progressBarContainer}>
              <View style={styles.progressBar} />
              <Text style={styles.progressBarText}>{t("profile.card.fillthesurvey")}</Text>
          </View>
        )}
    </TouchableOpacity>
  );
};

export default ProfileModalButton;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '5%',
    marginVertical: '1.3%',
    padding: '4%',
    backgroundColor: '#f6f7fb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    flexDirection: 'column',
  },
  focusedContainer: {
    borderColor: '#e81f89',
    borderWidth: 2,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 14
  },
  iconAndTextContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center'
  },
  isSurveyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  arrowContainer: {
    position: 'absolute',
    right: '10%',
  },
  buttonText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  surveyContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  surveyInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10
  },
  surveyText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e81f89'
  },
  progressBarContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: 3,
    marginHorizontal: '3%',
    marginVertical: '3%',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#dddde5',
    marginHorizontal: 3,
    marginBottom: '4%',
    borderRadius: 10
  },
  progressBarText: {
    fontSize: 10
  }
});