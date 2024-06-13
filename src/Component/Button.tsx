import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {
    style?:object,
    text?:any,
    rest:object,
    onPress?:()=>void,
}

const Button = ({style,text,onPress,...rest}: Props) => {
  return (
    <Pressable onPress={onPress} style = {[styles.btn,style]} {...rest}>
      <Text style = {styles.text}>{text}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
    btn:{
        height:40,
        backgroundColor:'#6863f7',
        borderRadius:15,
        justifyContent:"center",
        alignItems:"center",
        marginVertical:15,
        elevation:5
    },
    text:{
        fontSize:10,
        fontWeight:'500',
        color:'#fff'
    }
})