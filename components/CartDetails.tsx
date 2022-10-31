import React from "react";
import { View } from "react-native";
import { Text } from 'react-native-paper';
import type { CartItemDetails } from "./Cart";

interface Props {
    details: CartItemDetails;
}

export function CartDetails({ details }: Props) {
    return (
        <View style={{display: 'flex', marginHorizontal: 5}}>
            <Text variant="titleMedium">{details.name}</Text>
            <Text>Quantities ordered: {details.quantity}</Text>
            <Text>Offered Price: {details.price}</Text>
            <Text variant="titleSmall">Total: {details.price * +details.quantity}</Text>
        </View>
    )
}