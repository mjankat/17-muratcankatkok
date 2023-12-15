import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Entypo } from '@expo/vector-icons';
import expoLanguageDetector from '../../plugins/expoLanguageDetector';
import { useTranslation } from 'react-i18next';
import { addResources } from '../../i18n';
import { en, tr } from '../../locales';

const MyWalletCard = () => {
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
        <View style={styles.cardContainer}>
        <View style={styles.leftOfCard}>
          <Text style={styles.leftCardText}>{t("totalcoins")}</Text>
          <Text style={styles.secondLeftCardText}>3.650,00</Text>
          <View style={styles.textBorder}></View>
          <View style={styles.leftCardBottom}>
            <View style={styles.leftCardBottomInline}>
              <Text style={styles.leftCardBottomText1}>0.00</Text>
              <Text style={styles.leftCardBottomText2}>{t("coins")}</Text>
            </View>
            <View style={styles.leftCardBottomInline}>
              <Text style={styles.leftCardBottomText3}>3.650,00</Text>
              <Text style={styles.leftCardBottomText4}>{t("giftcoins")}</Text>
            </View>
            <View style={styles.leftCardBottomInline}>
              <Text style={styles.leftCardBottomText5}>0.00</Text>
              <Text style={styles.leftCardBottomText6}>{t("fuelcoins")}</Text>
            </View>
          </View>
        </View>
        <View style={styles.rightOfCard}>
        <View style={styles.circle}>
          <Text style={styles.rightCardText1}>3.650,00</Text>
          <Text style={styles.rightCardText2}>{t("coins")}</Text>
        </View>
        <TouchableOpacity>
          <Entypo name="dots-three-horizontal" size={20} color="black" />
        </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default MyWalletCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        alignItems: 'center'
      },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        height: 220,
        borderRadius: 14,
        width: "90%",
        marginTop: 28,
        paddingHorizontal: 32,
        paddingVertical: 18,
        borderColor: '#C1C1C1',
      },
      textBorder: {
        borderWidth: 1, 
        width: '84%',
        borderColor: '#C1C1C1',
        backgroundColor: '#C1C1C1',
        marginVertical: 12
      },
      leftOfCard: {
        flex: 1,
      },
      leftCardText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#C1C1C1'
      },
      secondLeftCardText: {
        fontSize: 28,
        paddingVertical: 12,
        fontWeight: 'bold',
        color: 'black'
      },
      leftCardBottom: {
        flexDirection: 'column',
        marginTop: 4,
      },
      leftCardBottomInline: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
      },
      leftCardBottomText1: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#e81f89',
      },
      leftCardBottomText2: {
        fontSize: 14,
        color: '#C1C1C1',
      },
      leftCardBottomText3: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#089ad8',
      },
      leftCardBottomText4: {
        fontSize: 14,
        color: '#C1C1C1',
      },
      leftCardBottomText5: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#36b347',
      },
      leftCardBottomText6: {
        fontSize: 14,
        color: '#C1C1C1',
      },
      circle: {
        width: 80,
        height: 80,
        borderWidth: 7,
        borderRadius: 50,
        borderColor: '#109dd9',
        justifyContent: 'center',
        alignItems:'center',
      },
      rightOfCard: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'space-between'
      },
      rightCardText1: {
        fontSize: 12,
        fontWeight:'bold',
        color: 'black',
      },
      rightCardText2: {
        fontSize: 10,
        fontWeight:'bold',
        color: '#C1C1C1',
      }
})