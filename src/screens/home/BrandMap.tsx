import { StyleSheet, Text, View, Linking, TouchableOpacity, ScrollView } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

const BrandMap = ({ route }) => {
  const map = useRef(null);
  const [userLocation, setUserLocation] = useState(null);

  const region = {
    latitude: route.params.latitude,
    longitude: route.params.longitude,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    } catch (error) {
      console.log('Konumu alırken bir hata oluştu:', error);
    }
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${route.params.phone}`);
  };

  return (
    <View style={styles.container}>
      {userLocation && (
        <MapView
          ref={map}
          mapType="standard"
          region={region}
          showsUserLocation={true}
          style={styles.map}
        >
          <Marker
            coordinate={{
              latitude: route.params.latitude,
              longitude: route.params.longitude,
            }}
            title={route.params.brandName}
            description={route.params.placeName}
            pinColor={'#00aeef'}
          />
          
        </MapView>
      )}
        <ScrollView showsVerticalScrollIndicator={false} style={styles.bottomSheet}>
          <View>
            <Text style={styles.placeNameText}>{route.params.placeName}</Text>
            <View style={styles.placeBottomLine}></View>
          </View>
          <View style={styles.adressBottom}>
            <MaterialIcons name="location-pin" size={16} color="white" />
            <Text style={styles.adressText}>{route.params.address}</Text>
          </View>
          <View style={styles.phoneBottom}>
          <MaterialIcons name="phone-enabled" size={16} color="white" />
          <TouchableOpacity onPress={handlePhonePress}>
            <Text style={styles.phoneText}>{route.params.phone}</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.workHoursBottom}>
            <MaterialIcons name="access-time" size={16} color="white" />
            <Text style={styles.workHoursText}>{route.params.workHours}</Text>
          </View>
            
        </ScrollView>
              
    </View>
  );
};

export default BrandMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  bottomSheet:{
    backgroundColor:"#00aeef",
    height:"25%",
    position: 'absolute',
    bottom: 0,
    width:"100%",
    color:"white",
    paddingVertical:10,
    paddingHorizontal:15,
    opacity:0.9,
  },
  placeNameText:{
    color:"white",
    fontWeight:"bold",
    fontSize:16,
    paddingBottom:10,
  },
  placeBottomLine:{
    height:1,
    width:"100%",
    backgroundColor:"white",
    opacity:0.5,
  },
  adressBottom:{
    flexDirection:"row",
    gap:10,
    paddingTop:15,
    paddingBottom:10,
  },
  adressText:{
    color:"white",
  },
  phoneBottom:{
    flexDirection:"row",
    gap:10,
    paddingVertical:10,
  },
  phoneText:{
    color:"white",
    textDecorationLine: 'underline',
  },
  workHoursBottom:{
    flexDirection:"row",
    gap:10,
    paddingVertical:10,
  },
  workHoursText:{
    color:"white",
  }

});