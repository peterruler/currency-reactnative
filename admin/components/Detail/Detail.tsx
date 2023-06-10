import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import CurrencyCountryMap from '../../../shared/models/CurrencyMap';
import Currency from '../../../shared/models/Currency';
import styles from './Detail.styles';

export default function Form ({ route, navigation }) {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    text: {
      fontSize: 25,
      fontWeight: '500',
    },
  });

  const width = 250;
  const marginTop = 20;
  const marginLeft = -10;

  const [currency, setCurrencies] = useState<Currency>({
    currencyCode: '',
    exchangeRate: ''
  });
  const [val, setVal] = useState();
  const [valResult, setValResult] = useState();
  
  /* 2. Get the param */
  const { currencyCode, exchangeRate} = route.params; // currencyCode: item.currencyCode, exchangeRate: item.exchangeRate 

  const goBack = () => {
    navigation.navigate('Währungsrechner - Liste');
  }

  useEffect(() => {
    async function fetchData() {
      const data = {currencyCode: currencyCode, exchangeRate: exchangeRate}
      setCurrencies(data);
    }
    fetchData();
  }, [currencyCode]);

  useEffect(() => {
    calculate();
  }, [val]);

  const calculate = () => {
    if(typeof val !== 'undefined') {
      setValResult(currency.exchangeRate * val);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>{CurrencyCountryMap.get(currency.currencyCode)} in US Dollar mit Kurs {currency.exchangeRate.toString()}</Text>
      <Input
        label="Betrag"
        containerStyle={{ width, marginTop, marginLeft }}
        defaultValue={val}
        onChangeText={
          newVal => setVal(newVal)}
      />
      <Text style={styles.text}>{val ? 'Resultat:' : ''} {valResult} {val ? 'US $' : ''}</Text>
      <Button
        onPress={calculate}
        title="umrechnen"
      ></Button>
    </ScrollView>
  );
};
