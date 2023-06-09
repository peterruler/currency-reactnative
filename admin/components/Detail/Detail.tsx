import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Currency from '../../../shared/models/Currency';
import styles from './Detail.styles';

export default function Form ({ route, navigation }) {
  const width = 250;
  const marginTop = 20;
  const marginLeft = -10;

  const [currency, setCurrencies] = useState<Currency>({
    currencyCode: '',
    exchangeRate: ''
  });

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


  async function back() {
    goBack();
  }

  const createChangeHandler = name => text =>
  setCurrencies(prevCurrency=> ({
      ...prevCurrency,
      [name]: name !== name ? parseFloat(text) : text,
    }));

  return (
    <ScrollView>
      <Input
        label="Code"
        placeholder="Code"
        value={currency.currencyCode}
        containerStyle={{ width, marginTop, marginLeft }}
        onChangeText={createChangeHandler('currencyCode')}
      />
      <Input
        label="Rate"
        placeholder="Rate"
        containerStyle={{ width, marginTop, marginLeft }}
        value={currency.exchangeRate.toString()}
        onChangeText={createChangeHandler('exchangeRate')}
      />
      
      <Button
        onPress={back}
        title="Zurück"
      ></Button>
    </ScrollView>
  );
};
