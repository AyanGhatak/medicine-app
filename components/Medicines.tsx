import * as React from 'react';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Image } from 'react-native';
import { Button, Card, Text, Title } from 'react-native-paper';
import { View, } from '../components/Themed';


interface MedicinesProps {
    filter?: string
}

interface MedicineDetails {
    name: string;
    quantity: string;
    ratings: number;
    ratingCount: string;
    mrp: number;
    discountedPrice: number;
    image: string;
}

function findMatch(items: MedicineDetails[],input: string) {
  debugger
  if (input == '') {
    return items;
  }
  var reg = new RegExp(input, "i")
  return items.filter(function(term) {
	  if (term.name.match(reg)) {
  	  return term;
	  }
  });
}

export default function Medicines({ filter = "" }: MedicinesProps) {
  const [items, setItems] = useState<MedicineDetails[]>([])

  const fetchMedicines = async () => {
    const response = await fetch("http://192.168.225.120:8080/medicines/")
    const data = await response.json()
    setItems(data)
  }

  useEffect(() => { fetchMedicines() }, [])

  return (
    <ScrollView style={styles.container}>
        {findMatch(items, filter).map((details, id) => {
            return (
                <Card key={id} style={styles.cardContainer}>
                    <Card.Content>
                        <Title>{details.name}</Title>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                            <Image source={{ uri: details.image }} style={styles.img} />
                            <View style={{backgroundColor: '#fffbfe', flex: 1, paddingLeft: 10, paddingTop: 10}}>
                                <Text style={{textTransform: 'capitalize'}}>{details.quantity}</Text>
                                <Text>{details.ratings} for {details.ratingCount}</Text>
                                <Text>
                                    <Text>MRP </Text>
                                    <Text style={{textDecorationLine: 'line-through'}}>₹ {details.mrp}</Text>
                                    <Text style={{color: '#1aab2a', textTransform: 'uppercase', margin: 5}}>{(((details.mrp - details.discountedPrice) / details.mrp) * 100).toFixed(1)}% OFF</Text>
                                </Text>
                                <Text style={{fontSize: 18}}>₹ {details.discountedPrice}</Text>
                                <Button icon="cart" mode="text" onPress={() => console.log('Pressed')}> Add to Cart</Button>
                            </View>
                        </View>
                    </Card.Content>
                </Card>
            )
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        overflow: 'hidden',
    },
    cardContainer: {
        margin: 10,
        flexWrap: "wrap",
        flexDirection: "column",
        display: "flex",
        flex: 1,
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
        backgroundColor: 'pink',
        color: 'red'
    },
});
