import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import CurrencyCountryMap from '../../../shared/models/CurrencyMap';
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
  const [val, setVal] = useState<number | null>();
  const [valResult, setValResult] = useState<number | null>();
  const [dir, setDir] = useState();
  
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
      if(dir) {
        setValResult(val / currency.exchangeRate);
      } else {
        setValResult(currency.exchangeRate * val);
      }
    }
  }

  const switchDirection = () => {
    setDir(!dir);
    setVal(null);
    setValResult(null);
  }
  
  return (
    <ScrollView style={styles.container}>
       <Button
        onPress={switchDirection}
        title="umschalten"
      ></Button>
      {dir && 
      <Text style={styles.text}>{CurrencyCountryMap.get(currency.currencyCode)} in US Dollar mit Kurs {currency.exchangeRate.toString()}</Text>
      }
      {!dir && 
      <Text style={styles.text}> US Dollar in {CurrencyCountryMap.get(currency.currencyCode)} mit Kurs {currency.exchangeRate.toString()}</Text>
      }
      <Input
        label="Betrag"
        containerStyle={{ width, marginTop, marginLeft }}
        onChangeText={
          newVal => setVal(newVal)}
      />
      {dir && 
      <Text style={styles.text}>{val ? 'Resultat:' : ''} {valResult ? valResult : ''} {val ? 'US $' : ''}</Text>
      }
    {!dir && 
      <Text style={styles.text}>{val ? 'Resultat:' : ''} {valResult ? valResult : ''} {val ? currency.currencyCode : ''}</Text>
      }
    </ScrollView>
  );
};
