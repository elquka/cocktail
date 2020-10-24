import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import index_products from './src/views/products/index_products'
import view_products from './src/views/products/view_products'


const Stack = createStackNavigator();



export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#1583ad' } }}>
        <>
          <Stack.Screen name="Random drinks 0.1" component={index_products} options={{headerShown: false}} />
          <Stack.Screen name="view_products" component={view_products} options={{headerShown: false}}/>
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

