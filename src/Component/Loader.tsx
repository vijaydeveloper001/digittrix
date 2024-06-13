import React from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Dimensions,
  Text,
  Modal,
} from 'react-native';

const Loader = ({Loading=false}) => {
  return (
    // <View style={styles.loaderContainer}>
      <Modal visible = {Loading} transparent>
        <View style={styles.LoaderCon}>
        <View style={styles.LoaderConIn}>
          <ActivityIndicator size="large" color={'#5353'} />
          </View>
        </View>
      </Modal>
    //  </View>
  );
};

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    zIndex: 1,
  },

  LoaderCon: {
    flex:1,zIndex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  LoaderConIn:{
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
  }
});

export default Loader;
