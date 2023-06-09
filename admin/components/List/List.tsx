import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, TextInput } from 'react-native'
import Currency from '../../../shared/models/Currency';
import styles from './List.styles';

export default function List({ navigation }) {
  const [filter, setFilter] = useState('');
  const [currencies, setCurrencies] = useState<Currency[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.freecurrencyapi.com/v1/latest?apikey=wVWrm6vITJvhImgdehIIF6Kb45iipgv4uDibzN8i');
      const data = await response.json();
      let json, result, key;
      json = data.data;
      result = [];
      for (key in json) {
        let str = {currencyCode:key, exchangeRate: json[key]}
        result.push(str);
      }
      setCurrencies(result);
    }
    fetchData();
  }, []);
  return (<View>
    <TextInput
      autoCapitalize="none"
      value={filter}
      onChangeText={(text: string) => setFilter(text)}
      placeholder="Suche"
      style={styles.search}
    />

<FlatList
      style={styles.list}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      data={currencies.filter(currency =>
        currency.currencyCode.toLowerCase().includes(filter.toLowerCase())
      )}
      keyExtractor={item => item.currencyCode.toString()}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text style={styles.headline}
            onPress={() => navigation.navigate('Währungsrechner - Detail', { currencyCode: item.currencyCode, exchangeRate: item.exchangeRate })}>{item.currencyCode} - {item.exchangeRate} ></Text>
        </View>
      )}
    ></FlatList>
  </View>
  );
}