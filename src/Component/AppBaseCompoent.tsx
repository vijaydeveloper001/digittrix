import {StyleSheet, Text, View} from 'react-native';
import React, {Children} from 'react';
import RenderImage from './RenderImage';
import {images} from '../assets/images';
import TypoGraphy from './TypoGraphy';

type Props = {
  children: any;
  header: string;
  back?: boolean;
  navigation: any;
};

const AppBaseCompoent = ({children, header, back, navigation}: Props) => {
  return (
    <View style={styles.main}>
      <View style={styles.headerCon}>
        {back && (
          <RenderImage
            image={images.back}
            tintColor="#fff"
            onPress={() => navigation.goBack()}
          />
        )}
        <TypoGraphy style =  {{flex:back?0:1,textAlign:"center",color:'#fff'}}>{header}</TypoGraphy>
        <RenderImage
          image={images.close}
          tintColor="#fff"
          onPress={() => navigation.navigate('Cart')}
        />
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
    alignItems:"center"
  },
});
