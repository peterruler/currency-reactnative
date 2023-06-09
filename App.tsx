import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import List from './admin/components/List/List';
import Detail from './admin/components/Detail/Detail'

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Währungsrechner - Liste" component={List} />
        <Stack.Screen name="Währungsrechner - Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
