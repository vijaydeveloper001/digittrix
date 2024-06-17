import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Route from './src/navigation/Route'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import { initializeApp } from 'firebase/app'
import firebase from 'firebase/compat/app'
import { Secret } from './src/utils/Secrets'
type Props = {}

const App = (props: Props) => {
  

  useEffect(()=>{
    if (firebase.apps.length>1){
      let app = initializeApp(Secret)
      console.log(app)
    }else {
      // let app = initializeApp(Secret)
      // console.log(app)
      console.log('exits apps')
    }
  },[])


  return (
    <Provider store={store}>
    <NavigationContainer>
      <Route/>
    </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})