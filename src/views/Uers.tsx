import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RenderImage from '../Component/RenderImage';
import TypoGraphy from '../Component/TypoGraphy';
import Button from '../Component/Button';
import {images} from '../assets/images';

type Props = {
  navigation: any;
};

const Uers = ({navigation}: Props) => {
  const renderItem = ({item}: any) => {
    return (
      <Pressable
        style={styles.itemCon}
        onPress={() => navigation.navigate('Chat', {user: item?.user,uid:item?.uid})}>
        <RenderImage image={images.cart} style={styles.image} tintColor="red" />
        <View style={styles.textCon}>
          <TypoGraphy style={styles.textConItem}>{item?.name}</TypoGraphy>
          <TypoGraphy style={styles.emailText}>{item?.email}</TypoGraphy>
        </View>
        {/* <View style={styles.btnStyle}>
              <Button
                text={'Add cart'}
                style={styles.btn}
                onPress={() => console.log('sdfsdfds')}
              />
            </View> */}
      </Pressable>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <FlatList
        data={[
          {user: '-LWIlxwIETK5UR3O5GkR', name: 'Umer',uid:'LWIlxwIETK5UR3O5GkR'},
          {user: 'LWIlxwIETK5UR3O5GkR', name: 'Vijay',uid:'-LWIlxwIETK5UR3O5GkR'},
        ]}
        renderItem={renderItem}
        // keyExtractor={(item: object, index: number) => index}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Uers;

const styles = StyleSheet.create({
  itemCon: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    backgroundColor: '#545454',
    marginBottom: 70,
    borderRadius: 10,
    padding: 5,
  },
  image: {
    width: 100,
    height: '90%',
    borderRadius: 10,
  },
  textCon: {
    height: '80%',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    flex: 1,
  },
  closeImage: {
    // position: 'absolute',
    right: 0,
    // top: -30,
  },
  textConItem: {
    color: '#fff',
    fontSize: 20,
  },
  emailText: {
    color: '#fff',
    fontSize: 15,
  },
  btn: {
    paddingHorizontal: 10,
    marginBottom: 0,
    borderRadius: 10,
    marginTop: 0,
  },
  btnStyle: {
    height: '90%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
