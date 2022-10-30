import * as React from 'react';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Image, Dimensions } from 'react-native';
import { Button, Card, Text, Title } from 'react-native-paper';
import { View, } from '../components/Themed';
import MedicinesList from '../constants/medicinesList'
import { MedicineDetailsComponent } from './MedicineDetails';


interface MedicinesProps {
    filter?: string
}

export interface MedicineDetails {
    id: string;
    name: string;
    quantity: string;
    ratings: number;
    ratingCount: string;
    mrp: number;
    discountedPrice: number;
    image: string;
}

function findMatch(items: MedicineDetails[],input: string) {
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
  const [cartItems, setCartItems] = useState<String[]>([])

  const fetchMedicines = async () => {
    const response = await fetch("http://192.168.225.120:8080/medicines/")
    const data = await response.json()
    setItems(data)
    // Comment the above if you want to mock the response.
    // setItems(MedicinesList)
  }

  useEffect(() => { fetchMedicines() }, [])
  const screenHeight = Dimensions.get('window').height

  return (
    <View style={{height: screenHeight}}>
      <ScrollView style={styles.container}>
          {findMatch(items, filter).map((details, id) => {
              return (
                  <View style={{display: 'flex', flexDirection: 'row', backgroundColor:'#fffbfe', alignItems: 'center', margin: 10, width: '100%'}} key={id}>
                      <Image source={{ uri: details.image }} style={styles.img} />
                      <MedicineDetailsComponent details={details}/>
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
