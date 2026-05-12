import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// 폴더 위치가 바뀌었으니 styles.js를 불러오는 경로를 '../styles'로 맞춰줍니다.
import { loginStyles as styles } from '../styles'; 

const { width } = Dimensions.get('window');

// props로 { navigation }을 받아옵니다.
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 로그인 버튼을 누르면 ChatList 화면으로 교체(replace)합니다.
    navigation.replace('ChatList'); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoCircle} />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="이메일 또는 전화번호"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="비밀번호"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* onPress에 handleLogin 함수 연결 */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>

      <View style={styles.bottomMenuContainer}>
        <Text style={styles.bottomMenuText}>새로운 카카오계정 만들기</Text>
      </View>
    </SafeAreaView>
  );
}