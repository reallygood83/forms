# Google OAuth 설정 가이드

## Error 400 (Bad Request) 해결방법

### 1. Google Cloud Console 설정

1. https://console.cloud.google.com/ 접속
2. **APIs & Services** → **Credentials** 이동
3. OAuth 2.0 Client ID 선택

### 2. Authorized Redirect URIs 추가

**반드시 추가해야 할 URI:**
```
https://forms.teaboard.link/api/auth/callback/google
```

**로컬 개발용 (선택사항):**
```
http://localhost:3000/api/auth/callback/google
```

### 3. OAuth Consent Screen 확인

- **Application name**: forms4labs (또는 원하는 이름)
- **Authorized domains**: teaboard.link
- **Scopes**:
  - openid
  - email
  - profile
  - https://www.googleapis.com/auth/forms.body
  - https://www.googleapis.com/auth/drive.file

### 4. 환경변수 확인 (Vercel)

✅ 이미 설정됨:
- `GOOGLE_CLIENT_ID`: (Vercel 환경변수에 설정됨)
- `GOOGLE_CLIENT_SECRET`: (Vercel 환경변수에 설정됨)
- `NEXTAUTH_URL`: https://forms.teaboard.link
- `NEXTAUTH_SECRET`: (암호화됨)

### 5. 설정 후 테스트

1. Google Cloud Console에서 설정 저장
2. https://forms.teaboard.link 접속
3. "Google로 로그인" 버튼 클릭
4. Google 로그인 화면 정상 표시 확인

### 문제 해결

만약 여전히 Error 400이 발생하면:
1. Google Cloud Console에서 redirect URI가 **정확히** `https://forms.teaboard.link/api/auth/callback/google`인지 확인
2. 브라우저 캐시 삭제
3. 시크릿 모드로 다시 시도

### 현재 상태

- ❌ Google Cloud Console redirect URI 미설정 → **지금 바로 설정 필요**
- ✅ NextAuth 설정 완료
- ✅ 환경변수 모두 설정됨
- ✅ Vercel 배포 완료
