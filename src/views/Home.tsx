import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useFetch} from '../api/useFetch';
import RenderImage from '../Component/RenderImage';
import TypoGraphy from '../Component/TypoGraphy';
import {images} from '../assets/images';
import {useDispatch, useSelector} from 'react-redux';
import {storedata} from '../redux/reducers/reducersdata';
import Button from '../Component/Button';
import {userCart} from '../redux/reducers/cartreducers';
import AppBaseCompoent from '../Component/AppBaseCompoent';
import Loader from '../Component/Loader';

type Props = {
  navigation: any;
};

const Home = ({navigation}: Props) => {
  return (
    <AppBaseCompoent
      back={false}
      header="Home"
      children={content()}
      navigation={navigation}
    />
  );
};

const content = () => {
  const [data, setdata] = useState<object>([]);
  const [page, setpage] = useState(1);
  const [loader, setloader] = useState<boolean>(false);
  const store = useSelector((state: any) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      setloader(true);
      try {
        let response = await useFetch(
          `https://reqres.in/api/users?page=${page}`,
          'GET',
        );
        console.log(response);

        let updatedData = response.data.map((item: any) => ({
          ...item,
          quan: 1,
        }));

        if (page > 1) {
          setdata((prev: any) => [...prev, ...updatedData]);
          setloader(false);
        } else {
          setdata(updatedData);
          setloader(false);
        }
        dispatch(storedata(updatedData));
        setloader(false);
      } catch (e) {
        console.log(e);
        setloader(false);
      }
    };

    fetchData();
  }, [page]);

  const storeItem = ({item}: any) => {
    if (!store?.cartdata?.data?.includes(item)) {
      dispatch(userCart([...store?.cartdata?.data, item]));
    }
  };

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.itemCon}>
        <RenderImage image={item.avatar} style={styles.image} />
        <View style={styles.textCon}>
          <TypoGraphy style={styles.textConItem}>
            {item?.first_name + item?.last_name}
          </TypoGraphy>
          <TypoGraphy style={styles.emailText}>{item?.email}</TypoGraphy>
        </View>
        <View style={styles.btnStyle}>
          <Button
            text={'Add cart'}
            style={styles.btn}
            onPress={() => storeItem({item})}
          />
        </View>
      </View>
    );
  };

  const handleEndReached = () => {
    if (page !== 2) {
      setpage(prev => prev + 1);
    }
  };

  return (
    <View style={styles.main}>
      <Loader Loading={loader} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: object, index: number) => index}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Home;

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
    marginTop: 0,
  },
  btnStyle: {
    height: '90%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
