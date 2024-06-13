import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Button from './Button';
import TypoGraphy from './TypoGraphy';

type Props = {
  onPress: () => void;
  text: any;
  visible: boolean;
};

const ToastShow = ({onPress, text, visible}: Props) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let timeout = null;
    if (visible) {
      setShow(true);
      timeout = setTimeout(() => {
        setShow(false);
      }, 10000);
    } else {
      setShow(false);
    }

    // return () => {
    //   if (timeout) {
    //     clearTimeout(timeout);
    //   }
    // };
  }, [visible]);
  console.log('Rendering ToastShow, show:', show);
  return (
    <View>
      {show && (
        <View style={styles.main}>
          <Button text="Undo" onPress={onPress} style={styles.btn} />
          <TypoGraphy style={{color: '#fff'}}>{text}</TypoGraphy>
        </View>
      )}
    </View>
  );
};

export default ToastShow;

const styles = StyleSheet.create({
  main: {
    height: 50,
    justifyContent: 'space-around',
    backgroundColor: '#545454',
    alignItems: 'center',
    borderRadius: 10,
    zIndex: 999,
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
  },
  btn: {
    width: 50,
    height: 30,
    borderRadius: 10,
  },
});
