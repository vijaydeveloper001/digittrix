import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../views/Home'
import Cart from '../views/Cart'
const Stack = createNativeStackNavigator()
type Props = {}

const Route = (props: Props) => {
  return (
    <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} options={{headerShown:false}} />
        <Stack.Screen name='Cart' component={Cart} options={{headerShown:false}} />
    </Stack.Navigator>
  )
}

export default Route

const styles = StyleSheet.create({})