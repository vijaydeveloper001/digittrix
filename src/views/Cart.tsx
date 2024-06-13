import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import RenderImage from '../Component/RenderImage';
import TypoGraphy from '../Component/TypoGraphy';
import Button from '../Component/Button';
import {useDispatch, useSelector} from 'react-redux';
import {images} from '../assets/images';
import AppBaseCompoent from '../Component/AppBaseCompoent';
import {userCart} from '../redux/reducers/cartreducers';
import ToastShow from '../Component/ToastShow';

type Props = {
  navigation: any;
};

const Cart = ({navigation}: Props) => {
  return (
    <AppBaseCompoent
      header="Cart"
      back={true}
      children={content()}
      navigation={navigation}
    />
  );
};

const content = () => {
  const state = useSelector(state => state?.cartdata?.data);
  const [deleteitems, setdeleteitem] = useState<object>({});
  const [undoBolean, setundoBolean] = useState<boolean>(false);
  const dispatch = useDispatch();
  const deleteItem = (id: any) => {
    try {
      setdeleteitem(id);
      let filterArray = state?.filter((item: any) => item.id !== id?.id);
      console.log(filterArray);
      setundoBolean(true);

      dispatch(userCart(filterArray));
    } catch (e) {
      console.log(e);
      setundoBolean(false);
    }
  };

  const increase = (ite: {id: number; quan: number}) => {
    const updatedState = state.map((item: any) =>
      item.id === ite.id ? {...item, quan: item.quan + 1} : item,
    );
    dispatch(userCart(updatedState));
  };

  const decrese = (ite: {id: number; quan: number}) => {
    const updatedState = state.map((item: any) =>
      item.id === ite.id ? {...item, quan: item.quan - 1} : item,
    );

    dispatch(userCart(updatedState));
  };

  const undo = () => {
    try {
      dispatch(userCart([...state, {...deleteitems}]));
      setundoBolean(false);
    } catch (e) {
      console.log(e);
      setundoBolean(false);
    }
  };

  const renderItem = ({item}: any) => {
    // console.log(item)
    return (
      <View style={styles.itemCon}>
        <RenderImage image={item.avatar} style={styles.image} />
        <View style={styles.textCon}>
          <TypoGraphy style={styles.textConItem}>
            {item?.first_name + item?.last_name}
          </TypoGraphy>
          <TypoGraphy style={styles.emailText} numberOfLines={1}>
            {item?.email}
          </TypoGraphy>
          <TypoGraphy style={styles.emailText}>{item?.quan}</TypoGraphy>
        </View>
        <View style={styles.btnStyle}>
          <RenderImage
            image={images.close}
            style={styles.closeImage}
            tintColor={'#fff'}
            onPress={() => deleteItem(item)}
          />
          <View style={styles.quanCon}>
            <Button
              text="-"
              style={styles.increaseBtn}
              onPress={() => decrese(item)}
            />
            <TypoGraphy style={{...styles.emailText, marginHorizontal: 10}}>
              {item?.quan}
            </TypoGraphy>
            <Button
              text="+"
              style={styles.increaseBtn}
              onPress={() => increase(item)}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.main}>
      <FlatList
        data={state}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
      />
      <ToastShow
        visible={undoBolean}
        text={'you can deleted your item only 10 seoncd inside undo'}
        onPress={() => undo()}
      />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#000',
  },
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
  },
  btnStyle: {
    height: '90%',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  quanCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  increaseBtn: {
    width: 30,
    height: 30,

    borderRadius: 5,
  },
});
