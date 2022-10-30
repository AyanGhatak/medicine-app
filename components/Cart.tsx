import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, View, StyleSheet, Image } from "react-native";
import { Text } from 'react-native-paper';

interface CartItemDetails {
  id: string;
  productId: string;
  quantity: string;
  name: string;
  price: number;
  image: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItemDetails[]>([]);

  const fetchCartItems = async () => {
    const response = await fetch("http://192.168.225.120:8080/cart/1")
    const cartItems = await response.json()
    setCartItems(cartItems)
  }

  useEffect(() => { fetchCartItems() }, [])
  const screenHeight = Dimensions.get('window').height

  return (
    <View style={{height: screenHeight}}>
      <Text variant="titleLarge" style={{paddingHorizontal: 20}}>Items:</Text>
      <ScrollView style={styles.container}>
          {cartItems.map((details, id) => {
              return (
                  <View style={{display: 'flex', flexDirection: 'row', backgroundColor:'red', alignItems: 'center', margin: 10, width: '100%'}} key={id}>
                      <Image source={{ uri: details.image }} style={styles.img} />
                      <Text>hello </Text>
                  </View>
              )
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      display: "flex",
  },
  cardContainer: {
      margin: 10,
      flexWrap: "wrap",
      flexDirection: "column",
      display: "flex",
      flex: 1,
      height: 40
  },
  img: {
      width: 150,
      height: 122,
      resizeMode: 'stretch',
  },
  para: {
  },
  container1: {
      display: 'flex',
      'flex-direction': 'row',
      flex: 1,
      color: 'red'
  },
});