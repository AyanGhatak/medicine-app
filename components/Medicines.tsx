import * as React from 'react';
import { ScrollView, StyleSheet, Image } from 'react-native';
import { Button, Card, Text, Title } from 'react-native-paper';
import { View, } from '../components/Themed';
import MedicinesDetails from '../constants/medicinesList'


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

function getItems(filter: string) {
    return MedicinesDetails.filter(e => e.name.includes(filter))
}

export default function Medicines({ filter = "" }: MedicinesProps) {
  return (
    <ScrollView style={styles.container}>
        {getItems(filter).map((details, id) => {
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
        "flex-wrap": "wrap",
        "flex-direction": "row",
        overflow: 'hidden',
    },
    cardContainer: {
        margin: 10,
        "flex-wrap": "wrap",
        "flex-direction": "column",
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
