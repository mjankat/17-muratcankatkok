import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';

const ModalButton = ({ text, isArrow, onPress }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handlePressIn = () => {
    setIsFocused(true);
  };

  const handlePressOut = () => {
    setIsFocused(false);
  };

  return (
    <TouchableOpacity 
    onPress={onPress}
    activeOpacity={1} 
      style={[
        styles.container,
        isFocused && styles.focusedContainer,
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Text style={styles.buttonText}>{text}</Text>
      {isArrow && (
        <AntDesign name="right" size={16} color="black" />
      )}
    </TouchableOpacity>
  );
}

export default ModalButton;

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  focusedContainer: {
    borderColor: '#e81f89',
    borderWidth: 2,
  },
  arrowContainer: {
    position: 'absolute',
    right: '10%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});