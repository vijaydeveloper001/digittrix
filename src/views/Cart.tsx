import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

type Props = {}

const Cart = (props: Props) => {
  return (
    <View style = {styles.main}>
      <Text>Cart</Text>
    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
    main:{
        flex:1,
        backgroundColor:'#000'
    }
})