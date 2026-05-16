import { StyleSheet } from 'react-native';
export const loginStyles = StyleSheet.create({  container: {
    flex: 1,
    backgroundColor: '#FFEB33', // 카카오 노란색
    alignItems: 'center',
    paddingHorizontal: 20, // 양옆 여백
  },
  // 로고 동그라미
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 35, // 동그랗게
    backgroundColor: '#3C1E1E', // 카카오 초콜릿색
    marginTop: 150, // 상단 여백
    marginBottom: 50, // 하단 여백
  },
  // 입력창 컨테이너
  inputContainer: {
    width: '100%',
    marginBottom: 10,
  },
  // 공통 입력창 스타일
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'white', // 흰색 배경
    paddingHorizontal: 15, // 내부 여백
    fontSize: 16,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#D3D3D3', // 연한 회색 테두리
  },
  // 비밀번호 입력창만 위쪽 테두리 제거 (이메일 창과 합쳐져 보이게)
  passwordInput: {
    borderTopWidth: 0,
  },
  // 로그인 버튼
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#3C1E1E', // 초콜릿색
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#FFEB33', // 노란색 글자
    fontSize: 16,
    fontWeight: 'bold',
  },
  // 하단 메뉴
  bottomMenuContainer: {
    marginTop: 30,
  },
  bottomMenuText: {
    color: '#3C1E1E',
    fontSize: 14,
  },
});