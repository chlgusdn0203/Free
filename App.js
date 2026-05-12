import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from './screens/LoginScreen'; 
import ChatListScreen from './screens/ChatListScreen'; 
import ChatDetailScreen from './screens/ChatDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ChatList" 
          component={ChatListScreen} 
          options={{ 
            title: '채팅',
            headerLeft: null, 
          }} 
        />
        <Stack.Screen 
          name="ChatDetail" 
          component={ChatDetailScreen} 
          options={({ route }) => ({
            title: route.params.name, // 이전 화면에서 전달받은 이름으로 제목 설정
            headerBackTitleVisible: false, // 뒤로가기 글자 숨김 (화살표만 표시)
          })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}