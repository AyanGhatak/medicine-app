import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, View, StyleSheet, Image } from "react-native";
import { Button, Text, TextInput } from 'react-native-paper';
import { CartDetails } from "./CartDetails";

export interface CartItemDetails {
  id: string;
  productId: string;
  quantity: string;
  name: string;
  price: number;
  image: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItemDetails[]>([]);
  const [addresses, setAddresses] = useState<string>("");
  const [total, setTotal] = useState<number>(0)

  const fetchCartItems = async () => {
    const response = await fetch("http://192.168.225.120:8080/cart/1")
    const cartItems = await response.json()
    setCartItems(cartItems)
  }

  useEffect(() => {
    const totalPrice = cartItems.reduce((sum, item) => {
      sum += item.price;
      return sum;
    }, 0);
    setTotal(totalPrice);
  }, [cartItems])

  useEffect(() => { fetchCartItems() }, [])
  const screenHeight = Dimensions.get('window').height

  return (
    <View style={{height: screenHeight}}>
      <ScrollView style={styles.container}>
        <Text variant="titleLarge" style={{paddingHorizontal: 20}}>Items:</Text>
          {cartItems.map((details, id) => {
              return (
                  <View style={{display: 'flex', flexDirection: 'row', backgroundColor:'#fffbfe', alignItems: 'center', margin: 10, width: '100%'}} key={id}>
                      <Image source={{ uri: details.image }} style={styles.img} />
                      <CartDetails details={details}/>
                  </View>
              )
          })}

          <Text style={{marginHorizontal: 10}} variant="titleMedium">Total to be paid: {total}</Text>
          <TextInput
            style={{height: 100, marginVertical: 5, marginHorizontal: 10}}
            label="Shipping address"
            value={addresses}
            mode={'outlined'}
            placeholder={'Enter the shipping addresses'}
            multiline
            dense
            onChangeText={text => setAddresses(text)}
          />

          <Button style={{margin: 10}} mode="contained" onPress={() => console.log('Pressed')}>
              <FontAwesome
                name="shopping-cart"
                size={25}
                style={{ marginRight: 15 }}
              />
              Place the order!
          </Button>
            
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