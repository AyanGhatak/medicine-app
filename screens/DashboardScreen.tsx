import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { CartItemDetails } from '../components/Cart';
import { Image, View } from "react-native";
import { RootTabScreenProps } from '../types';
import {Button, Text} from 'react-native-paper';
import { CartDetails } from '../components/CartDetails';
import { AddToCartProps } from './OrderMedicines';

/**
 * 
 * [
    {
        "details": [
            {
                "id": 1,
                "orderId": 1,
                "productId": 1,
                "quantity": 1,
                "price": 445.0,
                "name": "Tata 1mg Women's Multivitamin, Zinc, Vitamin C, Calcium, Vitamin D, and Iron  Immunity Booster Tablet",
                "image": "https://onemg.gumlet.io/images/c_fit,q_auto,w_150,f_auto,h_150/qh1au45w8u7cfvf3lg3i/tata-1mg-women-s-multivitamin-zinc-vitamin-c-calcium-vitamin-d-and-iron-immunity-booster-tablet.jpg"
            }
        ],
        "info": {
            "id": 1,
            "userId": 1,
            "orderAt": 1667218792450,
            "address": "Kolkata"
        }
    }
]
 * @returns 
 */

interface Order {
  info: {
    id: number;
    userId: number;
    orderAt: number;
    address: string;
  },
  details: CartItemDetails[]
}

export default function DashboardScreen({ navigation, addToCart }: RootTabScreenProps<'Dashboard'> & AddToCartProps) {
  const [orders, setOrders] = useState<Order[]>([]);

  async function fetchOrders() {
    const response = await fetch("http://192.168.225.120:8080/orders/1");
    const data = await response.json()
    setOrders(data)
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {
        orders.length > 0 ? 
          <Text variant="headlineMedium" style={{paddingHorizontal: 20}}>Previously Ordered Items</Text> : 
          <Text variant="headlineMedium" style={{padding: 30}}>No Previously Ordered Items to show here!</Text>
      }
      {
        orders.map((order, id) => {
          const info = order.info;
          const details = order.details
          return (
              <View style={{display: 'flex', backgroundColor:'#fffbfe', margin: 10, width: '100%'}} key={id}>
                <Text variant="titleMedium" style={{paddingHorizontal: 20}}>OrderAt: {new Date(info.orderAt).toLocaleString('en-US')}</Text>
                <Text variant="titleMedium" style={{paddingHorizontal: 20}} >Shipping Address: {info.address}</Text>
                <Text variant="titleLarge" style={{paddingHorizontal: 20}}>Products:</Text>
                {
                  details.map((detail, id) => {
                    return (
                      <View style={{display: 'flex', flexDirection: 'row', backgroundColor:'#fffbfe', alignItems: 'center', margin: 10, width: '100%'}} key={id}>
                          <Image source={{ uri: detail.image }} style={styles.img} />
                          <CartDetails details={detail}/>
                      </View>
                    )
                  })
                }
                <Button icon="cart" mode="text" style={{ margin: 10}} onPress={() => {
                  details.map(detail => addToCart(detail.id, +detail.quantity))
                }}> Refill</Button>
              </View>
          )})
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  img: {
    width: 150,
    height: 122,
    resizeMode: 'stretch',
},
});
