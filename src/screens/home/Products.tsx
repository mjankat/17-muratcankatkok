import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../services/firebase';
import { Octicons, AntDesign } from '@expo/vector-icons';
import ProductCards from '../../components/ProductCards';
import ModalButton from '../../components/ModalButton';
import { getFilteredProducts, getProducts, getProductsByHighestPrice, getProductsByLatestCreate, getProductsByLowestPrice } from '../../services/api';
import { addResources } from '../../../i18n';
import { en, tr } from '../../../locales';
import expoLanguageDetector from '../../../plugins/expoLanguageDetector';
import { useTranslation } from 'react-i18next';

const Products = ({ products }) => {
  const [imageUrl, setimageUrl] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalFilterOpen, setFilterModalOpen] = useState(false)
  const [myProducts, setMyProducts] = useState([]);

  const uniqueBrandNames = [...new Set(products.map(product => product.brandName))];

  const language = expoLanguageDetector.detect();

    const { t } = useTranslation();
  
  useEffect(() => {
    const storageRef = ref(storage, 'icons/filter.png');

    getDownloadURL(storageRef)
      .then((url) => {
        setimageUrl(url);
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

  useEffect(() => {
    setMyProducts(products);
  }, [products]);

  const handleSort = (order) => {
    switch (order) {
      case 'lowest':
        setModalOpen(false);
        return getProductsByLowestPrice().then((lowestPrice) => {
          setMyProducts(lowestPrice);
        });
      case 'highest':
        setModalOpen(false);
        return getProductsByHighestPrice().then((highestPrice) => {
          setMyProducts(highestPrice);
        });
      case 'newest':
        
        setModalOpen(false);
        return getProductsByLatestCreate().then((latest) => {
          setMyProducts(latest);
        });
        case 'default':
        setModalOpen(false);
        return getProducts().then((products) => {
          setMyProducts(products);
        });
      default:
        return myProducts;
    }
    
  };

  const handleBrandFilter = (brand) => {
    setFilterModalOpen(false);
    return getFilteredProducts(brand).then((products) => {
      setMyProducts(products);
    });
  };
  const clearBrandFilter = () => {
    setFilterModalOpen(false);
    return getProducts().then((products) => {
      setMyProducts(products);
    });
  };

  return (
    <ScrollView contentContainerStyle={{ alignContent:'center' }} showsVerticalScrollIndicator={false} style={styles.container}>
      
      <Modal visible={modalOpen} animationType='slide'>
        <View>
          <AntDesign 
            name="close" 
            size={24} 
            color="black"
            style={styles.modalToggle}
            onPress={() => setModalOpen(false)}
            />
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>Sırala</Text>
            </View>
            <ModalButton text={'Önerilen Sıralama'} isArrow={false} onPress={() => handleSort('default')} />
            <ModalButton text={'En Düşük Fiyat'} isArrow={false} onPress={() => handleSort('lowest')} />
            <ModalButton text={'En Yüksek Fiyat'} isArrow={false} onPress={() => handleSort('highest')} />
            <ModalButton text={'En Yeniler'} isArrow={false} onPress={() => handleSort('newest')} />
          
        </View>
      </Modal>

      <Modal visible={modalFilterOpen} animationType='slide'>
        <View>
          <AntDesign 
            name="close" 
            size={24} 
            color="black"
            style={styles.modalToggle}
            onPress={() => setFilterModalOpen(false)}
            />
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>Filtrele</Text>
              <TouchableOpacity
              onPress={() => clearBrandFilter()}>
                <Text style={{ color: 'darkgray' }}>Temizle</Text>
              </TouchableOpacity>
            </View>
            {uniqueBrandNames.map((brandName, index) => (
              <ModalButton
                key={index}
                text={brandName}
                isArrow={true}
                onPress={() => handleBrandFilter(brandName)}
              />
            ))}
        </View>
      </Modal>
      
      <View style={styles.productsAndCountText}>
        <Text style={styles.productsText}>{myProducts.length} {t("product")}</Text>
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.sort} onPress={() => setModalOpen(true)}>
            <Text>{t("sort")}</Text>
            <Octicons name="sort-desc" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filter} onPress={() => setFilterModalOpen(true)} >
            <Text>{t("filter")}</Text>
            <Image
              style={styles.image}
              source={{ uri: imageUrl || 'https://firebasestorage.googleapis.com/v0/b/sedatkurtuldu-6c2a7.appspot.com/o/icons%2Ffilter.png?alt=media&token=0822b28b-86a6-4965-bae3-4a391c3fbf0c' }}
            />
          </TouchableOpacity>
          
        </View>
      </View>
      <View style= {styles.cardDirection}>
        {myProducts.map((product) => (
              <ProductCards
                key={product.id}
                {...product}
              />
          ))}
        </View>
    </ScrollView>
  )
}

export default Products

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  productsAndCountText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '93%',
    paddingVertical: 20,
  },
  productsText: {
    marginHorizontal: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24
  },
  filter: {
    flexDirection: 'row',
    gap: 8
  },
  sort: {
    flexDirection: 'row',
    gap: 8
  },
  image: {
    width: 25,
    height: 25,
  },
  cardDirection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalToggle:{
    alignSelf:"flex-end",
    marginHorizontal: '4%',
    marginTop: '4%'
  },
  modalTitleContainer: {
    marginTop: '10%',
    marginBottom: '8%',
    marginHorizontal: '3%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  modalTitle:{
    fontWeight: 'bold',
    fontSize: 28
  }
})