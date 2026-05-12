import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 1. 채팅방별 메시지 데이터 (ID를 키로 사용)
const MESSAGES_DATA = {
  '1': [
    { id: '1', sender: 'other', text: 'PR 확인 부탁드립니다.', time: '오후 4:30' },
    { id: '2', sender: 'me', text: '넵, 지금 바로 확인하겠습니다!', time: '오후 4:35' },
  ],
  '2': [
    { id: '1', sender: 'other', text: '오늘 스터디 취소인가요?', time: '오후 2:15' },
    { id: '2', sender: 'me', text: '아뇨, 예정대로 진행합니다.', time: '오후 2:20' },
  ],
  '3': [
    { id: '1', sender: 'other', text: '샤갈~!', time: '오전 10:28' },
  ],
  '4': [
    { id: '1', sender: 'other', text: '노마드 코더 다 들으셨어요?', time: '어제' },
  ],
};

// 2. 메시지 말풍선 컴포넌트 분리 (과제 요건)
const MessageBubble = ({ item }) => {
  const isMe = item.sender === 'me'; // 내 메시지인지 확인

  return (
    <View style={[styles.messageWrapper, isMe ? styles.messageWrapperMe : styles.messageWrapperOther]}>
      {/* 상대방일 경우 프로필 동그라미 표시 */}
      {!isMe && <View style={styles.profileCircle} />}
      {!isMe && (
        <View style={styles.bubbleRow}>
          <View style={[styles.bubble, styles.otherBubble]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      )}

      {/* 내 메시지 렌더링 (시간 -> 말풍선 순서) */}
      {isMe && (
        <View style={styles.bubbleRow}>
          <Text style={styles.timeText}>{item.time}</Text>
          <View style={[styles.bubble, styles.myBubble]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

// 3. 메인 채팅 상세 화면
export default function ChatDetailScreen({ route }) {
  const [inputText, setInputText] = useState('');
  const { id } = route.params; // ChatList에서 넘겨준 id 추출

  // 1. 메시지 목록을 상태(state)로 관리합니다. 초기값은 기존 더미 데이터에서 가져옵니다.
  const [messages, setMessages] = useState(MESSAGES_DATA[id] || []);

  // 2. 메시지 전송 함수
  const handleSend = () => {
    if (inputText.trim() === '') return; // 빈 메시지는 전송하지 않음

    const now = new Date();
    const ampm = now.getHours() >= 12 ? '오후' : '오전';
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${ampm} ${hours}:${minutes}`;

    const newMessage = {
      id: Date.now().toString(), // 고유한 ID 생성
      sender: 'me',
      text: inputText,
      time: timeString,
    };

    // 기존 메시지 목록에 새 메시지를 추가합니다.
    setMessages([...messages, newMessage]);
    setInputText(''); // 전송 후 입력창 비우기
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 키보드가 올라올 때 화면이 가려지지 않게 처리 */}
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        {/* 메시지 리스트 (FlatList 사용 요건) */}
        <FlatList
          data={messages}
          renderItem={({ item }) => <MessageBubble item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />

        {/* 하단 입력창 UI */}
        <View style={styles.inputContainer}>
          <View style={styles.inputIconCircle} />
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="메시지 입력"
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>전송</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b2c7d9', // 카카오톡 채팅방 기본 배경색
  },
  listContainer: {
    padding: 15,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  messageWrapperMe: {
    justifyContent: 'flex-end', // 내 메시지는 우측 정렬
  },
  messageWrapperOther: {
    justifyContent: 'flex-start', // 상대 메시지는 좌측 정렬
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  bubbleContainer: {
    maxWidth: '70%',
  },
  bubbleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end', // 시간과 말풍선 하단 정렬 맞추기
  },
  bubble: {
    padding: 10,
    borderRadius: 8,
  },
  myBubble: {
    backgroundColor: '#FEE500', // 카카오톡 노란색
    marginLeft: 5,
  },
  otherBubble: {
    backgroundColor: '#FFFFFF', // 흰색
    marginRight: 5,
  },
  messageText: {
    fontSize: 15,
    color: '#000',
  },
  timeText: {
    fontSize: 11,
    color: '#555',
    marginBottom: 2, // 말풍선 하단과 높이를 자연스럽게 맞춤
  },
  // 하단 입력창 스타일
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  inputIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#eee',
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 15,
  },
  sendButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FEE500',
    borderRadius: 5,
  },
  sendButtonText: {
    fontWeight: 'bold',
  },
});