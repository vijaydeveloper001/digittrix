import {Pressable, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RenderImage from './RenderImage';
import {images} from '../assets/images';
import TypoGraphy from './TypoGraphy';
import {useSelector} from 'react-redux';

type Props = {
  children: any;
  header: string;
  back?: boolean;
  navigation: any;
};

const AppBaseCompoent = ({children, header, back, navigation}: Props) => {
  const state = useSelector((state: any) => state?.cartdata?.data);
  return (
    <View style={styles.main}>
      <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />
      <View style={styles.headerCon}>
        {back && (
          <RenderImage
            image={images.back}
            tintColor="#fff"
            onPress={() => navigation.goBack()}
          />
        )}
        <TypoGraphy
          style={{flex: back ? 0 : 1, textAlign: 'center', color: '#fff'}}>
          {header}
        </TypoGraphy>
        <Pressable onPress={() => navigation.navigate('Cart')}>
          <RenderImage
            image={images.cart}
            tintColor="#fff"
            onPress={() => navigation.navigate('Cart')}
          />
          <View style={styles.itemCon}>
            <TypoGraphy style={{color: '#fff', fontSize: 12}}>
              {state?.length}
            </TypoGraphy>
          </View>
        </Pressable>
      </View>
      {children}
    </View>
  );
};

export default AppBaseCompoent;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 10,
  },
  headerCon: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemCon: {
    width: 15,
    height: 15,
    borderRadius: 999,
    position: 'absolute',
    bottom: -10,
    right: 0,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
