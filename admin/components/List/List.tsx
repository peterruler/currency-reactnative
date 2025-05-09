import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Currency from '../../../shared/models/Currency';
import CurrencyCountryMap from '../../../shared/models/CurrencyMap';
import styles from './List.styles';

export default function List() {
  const [filter, setFilter] = useState('');
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://api.freecurrencyapi.com/v1/latest?apikey=wVWrm6vITJvhImgdehIIF6Kb45iipgv4uDibzN8i'
        );
        const data = await response.json();
        const json = data.data;
        const result: Currency[] = [];

        for (const key in json) {
          result.push({
            currencyCode: key,
            exchangeRate: json[key],
            label: CurrencyCountryMap.get(key),
          });
        }

        setCurrencies(result);
      } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <ImageBackground
      source={require('../../../img/money.jpg')}
      imageStyle={{ resizeMode: 'cover', opacity: 0.5, alignSelf: 'flex-end' }}
      style={styles.backdrop}
    >
      <TextInput
        autoCapitalize="none"
        value={filter}
        onChangeText={setFilter}
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
          keyExtractor={item => item.currencyCode}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Detail', {
                  result: currencies, // falls noch nicht enthalten
                  currencyCode: item.currencyCode,
                  exchangeRate: item.exchangeRate,
                  label: item.label, // ✅ richtig benannt
                })
              }
            >
              <View style={styles.listItem}>
                <Text style={styles.headline}>{item.label} →</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>
  );
}
