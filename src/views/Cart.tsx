import {FlatList, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
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
  const state = useSelector((state: any) => state?.cartdata?.data);
  const [deleteitems, setdeleteitem] = useState<any>([]);
  const [undoBolean, setundoBolean] = useState<boolean>(false);
  const dispatch = useDispatch();
  const removeDuplicates = (array: any) => {
    const seen = new Set();
    return array?.filter((item: any) => {
      const value = item['id'];
      if (seen.has(value)) {
        return false;
      }
      seen.add(value);
      return true;
    });
  };
  const deleteItem = (id: any) => {
    try {
      setdeleteitem([]);
      let newDeleteItems: any = [...deleteitems, id];
      let remove = removeDuplicates(newDeleteItems);
      setdeleteitem(remove);
      let filterArray = state?.filter((item: any) => item.id !== id?.id);
      console.log(filterArray);

      setundoBolean(true);
      dispatch(userCart(filterArray));
    } catch (e) {
      console.log(e);
      setundoBolean(false);
    }
    setTimeout(() => {
      setundoBolean(false);
      setdeleteitem([]);
    }, 10000);
  };

  const increase = (ite: {id: number; quan: number}) => {
    const updatedState = state.map((item: any) =>
      item.id === ite.id ? {...item, quan: item.quan + 1} : item,
    );
    dispatch(userCart(updatedState));
  };

  const decrese = (ite: {id: number; quan: number}) => {
    let updatedState = state.map((item: any) =>
      item.id === ite.id
        ? {...item, quan: item.quan > 0 ? item.quan - 1 : 0}
        : item,
    );
    updatedState = updatedState?.filter((item: any) => item.quan !== 0);
    dispatch(userCart(updatedState));
  };

  const undo = () => {
    try {
      let dummy: any = [...state, ...deleteitems];
      let remove: any = removeDuplicates(dummy);
      dispatch(userCart([...remove]));
      setundoBolean(false);
      setdeleteitem([]);
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
      {state?.length > 0 ? (
        <FlatList
          data={state}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TypoGraphy style={styles.noItem}>No item Added</TypoGraphy>
        </View>
      )}
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
  noItem: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
});
