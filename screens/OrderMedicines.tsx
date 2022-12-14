import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import Medicines from '../components/Medicines';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export interface AddToCartProps {
  addToCart: (productId: string, quantity: number) => void
}

export default function OrderMedicinesScreen({ navigation, addToCart }: RootTabScreenProps<'OrderMedicines'> & AddToCartProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query: string) => setSearchQuery(query);
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Filter..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchBar}
      />
      <Medicines filter={searchQuery} addToCart={addToCart}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  searchBar: {
    margin: 20,
    alignSelf: 'stretch',
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
});
