import { FlatList, StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory, selectCategories } from '../../slices/categoryHomeSlice';
const CategoryHome = () => {

    const categories = useSelector(selectCategories);
    const dispatch = useDispatch();

    useEffect(() => {
        //@ts-ignore
       dispatch(getCategory())
    }, []);

    const renderCategory = ({ item }) => (
        <TouchableOpacity key={item.id}>
            <Image
                source={{ uri: item.url }}
                style={styles.image}
            />
        </TouchableOpacity>
    );

    return (
        <FlatList
            style={styles.container}
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
        />
    )
}

export default CategoryHome

const windowWidth = Dimensions.get('window').width;
const imageWidth = (windowWidth - 24) / 2;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
    },
    image: {
        width: imageWidth,
        height: imageWidth,
        marginHorizontal: 6,
        marginVertical: -15,
        resizeMode: 'contain'
    },
})
