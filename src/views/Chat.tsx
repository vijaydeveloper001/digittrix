import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {
  addDoc,
  collection,
  Firestore,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import {dbbase} from '../utils/Secrets';
import {create} from 'ol/transform';
import TypoGraphy from '../Component/TypoGraphy';
const auth = Firestore;
type Props = {
  route: any;
};

const Chat = ({route}: Props) => {
  const [messages, setMessages] = useState<any>([]);
  //   const uid = 'LWIlxwIETK5UR3O5GkR';
  //   const user = '-LWIlxwIETK5UR3O5GkR';
  const {user, uid} = route.params;
  console.log(user);

  useEffect(() => {
    let chat: any = [];
    const getchChat = async () => {
      let get = await collection(
        dbbase,
        'userMessages',
        uid + user,
        'messages',
      );
      let q = await query(get);
      let snap = await getDocs(q);
      snap.forEach(data => {
        chat.push({
          ...data.data(),
          user:{_id:data?.data()?.sendby},
          createdAt:data?.data()?.createdAt?.toDate()
        });
      });
      setMessages(chat);
    };
    getchChat();
  }, []);

  const onSend = useCallback(async (messages: any = []) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages),
    );
    console.log(messages);
    let user1 = await collection(
      dbbase,
      'userMessages',
      uid + user,
      'messages',
    );

    await addDoc(user1, {
      ...messages[0],
      createdAt: new Date(),
      sendby:uid,
      sendto:user,
     
    });
    let user2 = await collection(
      dbbase,
      'userMessages',
      user + uid,
      'messages',
    );

    await addDoc(user2, {
      ...messages[0],
      createdAt: new Date(),
      sendby:uid,
      sendto:user,
    });
  }, []);

  const displayName = {
    name: [[{first: 'vijay'}], [{second: 'kumar'}]],
  };


//   console.log(displayName?.name[1][0].second);

  return (
    <View style={{flex: 1, backgroundColor: '#545454'}}>
      <View style={{height: 50, backgroundColor: 'red'}}>
        <TypoGraphy style={{color: '#fff', fontSize: 20, margin: 10}}>
          {displayName?.name[0][0].first + ' ' + displayName?.name[1][0].second}
        </TypoGraphy>
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: uid,
        }}
      />
    </View>
  );
};
export default Chat;

const styles = StyleSheet.create({});
