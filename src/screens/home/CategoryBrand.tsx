import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native'
import MySearchBar from '../../components/MySearchBar'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryBrand, selectCategoryBrands } from '../../slices/categoryBrandSlice'
import MySearchBarButton from '../../components/MySearchBarButton'

const CategoryBrand = ( { navigation } ) => {
  const categoryBrands = useSelector(selectCategoryBrands);
  const dispatch = useDispatch();

  useEffect(() => {
   //@ts-ignore
     dispatch(getCategoryBrand())
  }, []);

  const handleMap = (item) => {
   navigation.navigate('HomeRoutes', {
      screen: 'BrandMapStackScreen',
      params: {
        address: item.address,
        brandName: item.brandName,
        latitude: item.latitude,
        longitude: item.longitude,
        phone: item.phone,
        placeName: item.placeName,
        workHours: item.workHours
      }
    });
    
 }
 

  const renderBrand = ({ item }) => (
    <TouchableOpacity onPress={() => handleMap(item)} key={item.id}>
        <Image
            source={{ uri: item.url }}
            style={styles.image}
        />
    </TouchableOpacity>
);


 return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <MySearchBarButton searchBarTitle="Arama Yap" />
        <View style={styles.brandAndCountText}>
          <Text style={styles.brandText}>Markalar</Text>
          <Text>{categoryBrands.length} Marka</Text>
        </View>
        <FlatList
            style={{ marginBottom: 72 }}
            data={categoryBrands}
            renderItem={renderBrand}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
 )
}

export default CategoryBrand

const windowWidth = Dimensions.get('window').width;
const imageWidth = (windowWidth - 36) / 3;

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#ffffff',
 },
 searchBar: {
    justifyContent: "center", 
    alignItems: "center", 
    marginVertical: 10
 },
 brandAndCountText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '93%',
    paddingVertical: 20
 },
 brandText: {
    fontWeight: 'bold',
    fontSize: 18,
 },
 image: {
  width: imageWidth,
  height: imageWidth,
  marginHorizontal: 6,
  marginVertical: 6,
  resizeMode: 'contain'
},
})