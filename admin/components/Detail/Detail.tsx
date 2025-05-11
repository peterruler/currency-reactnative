import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Currency from '../../../shared/models/Currency';
import styles from './Detail.styles';
import Dropdown from '../Dropdown/Dropdown';
export default function Form({ route, navigation }) {
  const width = 250;
  const marginTop = 20;
  const marginLeft = -10;

  const [currency, setCurrencies] = useState<Currency>({
    currencyCode: '',
    exchangeRate: '',
  });

  const [val, setVal] = useState<number | ''>();
  const [valResult, setValResult] = useState<number | ''>();
  const [dir, setDir] = useState();
  const [selected, setSelected] = useState({ label: '', value: 0 });

  const input = React.createRef();

  /* 2. Get the param */
  const { result, currencyCode, exchangeRate, label } = route.params;

  useEffect(() => {
    async function fetchData() {
      const data = {
        result: result,
        currencyCode: currencyCode,
        exchangeRate: exchangeRate,
        label: label,
      };
      setCurrencies(data);
    }
    fetchData();
  }, [currencyCode, exchangeRate, label, result]);

  let data = [];
  useEffect(() => {
    for (let key in result) {
      let obj = {
        label: `${result[key].label} - ${result[key].currencyCode}`,
        value: result[key].exchangeRate,
      };
      data.push(obj);
    }
  });

  useEffect(() => {
    calculate();
  });

  const calculate = () => {
    if (typeof val !== 'undefined') {
      if (dir) {
        setValResult((currency.exchangeRate * val) / selected.value);
      } else {
        setValResult((val / currency.exchangeRate) * selected.value);
      }
    }
  };
  const switchDirection = () => {
    setDir(dir => !dir);
    calculate();
    setVal('');
    setValResult(0);
    input.current.clear();
  };

  const round = (value, step) => {
    step || (step = 1.0);
    var inv = 1.0 / step;
    return Math.round(value * inv) / inv;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Dropdown
        label="Bitte erst Wärung wählen"
        data={data}
        onSelect={setSelected}
      />

      {dir && (
        <Text style={styles.text}>
          {selected.label.split('-')[0]} in {currency.label}
        </Text>
      )}
      {!dir && (
        <Text style={styles.text}>
          {currency.label} in {selected.label.split('-')[0]}
        </Text>
      )}

      <Input
        label="Betrag"
        ref={input}
        onChangeText={(newVal) => setVal(newVal)}
        containerStyle={{ width, marginTop, marginLeft }}
        placeholder="Betrag eingeben"
      />

      {dir && (
        <Text style={styles.text}>
          {val ? 'Resultat:' : ''} {valResult ? round(valResult, 0.01) : ''}{' '}
          {val ? currency.currencyCode : ''}
        </Text>
      )}
      {!dir && (
        <Text style={styles.text}>
          {val ? 'Resultat:' : ''} {valResult ? round(valResult, 0.01) : ''}{' '}
          {val ? selected.label.split('-')[1] : ''}
        </Text>
      )}

      <Button
        onPress={switchDirection}
        title="Richtung umschalten und Eingabe löschen"></Button>
    </SafeAreaView>
  );
}
