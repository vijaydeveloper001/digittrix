import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useFetch } from '../api/useFetch'
import RenderImage from '../Component/RenderImage'
import TypoGraphy from '../Component/TypoGraphy'
import { images } from '../assets/images'

type Props = {}

const Home = (props: Props) => {
  const [data, setdata] = useState<object>([])
  useEffect(()=>{
    const fetchData = async()=>{
        try{
            let response =await useFetch('https://reqres.in/api/users?page=1','GET')
            console.log(response)
            setdata(response?.data)
        }catch(e){
            console.log(e)
        }
    }
    fetchData()
  },[])

  const renderItem = ({item}:any) =>{
    console.log(item)
    return (
      <View style = {styles.itemCon}>
        <RenderImage image={item.avatar} style={styles.image}/>
        <View style={styles.textCon}>
          <TypoGraphy style={styles.textConItem}>{item?.first_name+item?.last_name}</TypoGraphy>
          <TypoGraphy style={styles.emailText}>{item?.email}</TypoGraphy>
        </View>
       
          <RenderImage image={images.close} style={styles.closeImage} tintColor = {'#fff'}/>
      
      </View>
    )
  }
  return (
    <View style = {styles.main}>
      <FlatList data={data} renderItem={renderItem}/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  main:{
    flex:1,
    backgroundColor:'#000',
  },
  itemCon:{
    flexDirection:"row",
    alignItems:"center",
    height:100,
    backgroundColor:'#545454',
    marginTop:10,
    borderRadius:10,
    padding:5,
    marginHorizontal:10
  },
  image:{
    width:100,
    height:'90%',
    borderRadius:10
  },
  textCon:{
    height:"80%",
    justifyContent:"space-around",
    paddingHorizontal:10,
    flex:1,
  },
  closeImage:{
    position:"absolute",
    right:0,
    top:-30
  },
  textConItem:{
    color:'#fff',
    fontSize:20
  },
  emailText:{
    color:'#fff',
    fontSize:15
  }
})