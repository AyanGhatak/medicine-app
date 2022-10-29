import * as React from 'react';
import { View } from 'react-native';
import type { MedicineDetails } from './Medicines'
import { Button, Card, Text, Title } from 'react-native-paper';

interface Props {
    details: MedicineDetails
}

export function MedicineDetailsComponent({ details }: Props) {
    return (
        <View style={{backgroundColor: '#fffbfe', marginHorizontal: 20}}>
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
    )

}