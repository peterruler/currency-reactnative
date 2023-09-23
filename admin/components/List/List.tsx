import React, { useState, useEffect } from "react";
import { FlatList, Text, View, TextInput, ImageBackground } from 'react-native'
import Currency from '../../../shared/models/Currency';
import CurrencyCountryMap from '../../../shared/models/CurrencyMap';
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
        let obj = { currencyCode: key, exchangeRate: json[key], label: CurrencyCountryMap.get(key) }
        result.push(obj);
      }
      setCurrencies(result);
    }
    fetchData();
  }, []);
  
  return (
    <ImageBackground
    source={require('../../../img/money.jpg')}
    imageStyle={{ resizeMode: 'cover', opacity:0.5, alignSelf: "flex-end" }}
    style={styles.backdrop}>
    <TextInput
      autoCapitalize="none"
      value={filter}
      onChangeText={(text: string) => setFilter(text)}
      placeholder="Suche"
      style={styles.search}
    />
  <View style={styles.overlay}>
    <FlatList
      style={styles.list}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      data={currencies.filter(currency =>
        currency.label.toLowerCase().includes(filter.toLowerCase())
      )}
      keyExtractor={item => item.currencyCode.toString()}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Text style={styles.headline}
            onPress={() => navigation.navigate('Währungsrechner - Detail', { result: currencies, currencyCode: item.currencyCode, exchangeRate: item.exchangeRate, label: item.label })}>{item.label} →</Text>
        </View>
      )}
    ></FlatList>
  </View>
  </ImageBackground>
  );
}