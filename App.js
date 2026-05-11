import React, { useState } from 'react'; // React와 상태 관리를 위한 useState
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { loginStyles as styles } from './styles';

const { width } = Dimensions.get('window'); // 화면의 너비를 가져와서 반응형으로 만듭니다.

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. 카카오톡 로고*/}
      <View style={styles.logoCircle} />

      {/* 2. 입력란들 */}
      <View style={styles.inputContainer}>
        {/* 이메일 입력창 */}
        <TextInput
          style={styles.input}
          placeholder="이메일 또는 전화번호"
          keyboardType="email-address" // 이메일 입력용 키보드
          value={email}
          onChangeText={setEmail} // 입력한 값을 email State에 저장
        />
        {/* 비밀번호 입력창 */}
        <TextInput
          style={[styles.input, styles.passwordInput]} // 여러 스타일 적용
          placeholder="비밀번호"
          secureTextEntry={true} // 비밀번호 가리기
          value={password}
          onChangeText={setPassword} // 입력한 값을 password State에 저장
        />
      </View>

      {/* 3. 로그인 버튼 */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      {/* 4. 하단 메뉴들 */}
      <View style={styles.bottomMenuContainer}>
        <Text style={styles.bottomMenuText}>새로운 카카오계정 만들기</Text>
      </View>
    </SafeAreaView>
  );
}