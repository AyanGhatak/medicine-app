import * as React from 'react';
import { View } from 'react-native';
import type { MedicineDetails } from './Medicines'
import { Button, Text, TextInput } from 'react-native-paper';
import type { AddToCartProps } from '../screens/OrderMedicines';

interface Props extends AddToCartProps {
    details: MedicineDetails
}

export function MedicineDetailsComponent({ details, addToCart }: Props) {
    const [quantity, setQuantity] = React.useState("1");
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
            <TextInput
                style={{height: 32, marginVertical: 5}}
                label="Quantity"
                value={quantity}
                mode={'outlined'}
                dense
                onChangeText={text => setQuantity(text.replace(/[^0-9]/g, ''))}
            />
            <Button icon="cart" mode="text" onPress={() => {
                    addToCart(details.id, +quantity)
                    setQuantity("1");
                }}> Add to Cart</Button>
        </View>
    )
}