import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DUMMY_CHATS = [
  { id: '1', name: '김보성 (리뷰어)', lastMessage: 'PR 확인 부탁드립니다.', time: '오후 4:30' },
  { id: '2', name: '표재원', lastMessage: '오늘 스터디 취소인가요?', time: '오후 2:15' },
  { id: '3', name: '최현우', lastMessage: '샤갈~!', time: '오전 10:28' },
  { id: '4', name: '이가원', lastMessage: '노마드 코더 다 들으셨어요?', time: '어제' },
];

// ⭐️ onPress 프롭스를 추가로 받습니다.
const ChatItem = ({ item, onPress }) => (
  <TouchableOpacity style={styles.chatItem} onPress={onPress}>
    <View style={styles.profileCircle} />
    <View style={styles.textContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
    </View>
    <Text style={styles.time}>{item.time}</Text>
  </TouchableOpacity>
);

// ⭐️ navigation 프롭스를 받아와서 이동 함수를 연결합니다.
export default function ChatListScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DUMMY_CHATS}
        renderItem={({ item }) => (
          <ChatItem 
            item={item} 
            onPress={() => navigation.navigate('ChatDetail', { id: item.id, name: item.name })} // ⭐️ ID와 이름 함께 전달
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  chatItem: { flexDirection: 'row', padding: 15, alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  profileCircle: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#ccc', marginRight: 15 },
  textContainer: { flex: 1, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: '#000' },
  lastMessage: { fontSize: 14, color: '#888' },
  time: { fontSize: 12, color: '#aaa' },
});