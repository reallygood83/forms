# 🔧 Vercel 404 에러 해결 가이드

## 📊 Root Cause Analysis

### 문제 증상
- Vercel 배포 후 `404: NOT_FOUND` 에러 발생
- 환경변수는 16개 모두 입력되어 있음
- 로컬 빌드는 정상 작동

### Root Cause (근본 원인)
**Firebase Admin SDK Private Key의 multiline 처리 오류**

Vercel 환경변수 입력 시 `FIREBASE_ADMIN_PRIVATE_KEY`의 개행 문자(`\n`)가 제대로 파싱되지 않아 Firebase Admin SDK 초기화 실패 → 서버사이드 렌더링 실패 → 404 에러

---

## ✅ 해결 방법

### 1단계: Firebase Admin Private Key 올바른 입력 방법

#### ⚠️ 잘못된 방법 (Vercel에서 작동하지 않음)
```
"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC8PGoRvtK9TQtw\novRlSNPI79jWiGQ3ADUKWkgkYXUymYk0dIcqJF3IurXt/sM9SRLIy8Sf1VAGgo5V\n...\n-----END PRIVATE KEY-----\n"
```

#### ✅ 올바른 방법 (Vercel 전용)

**Option 1: 실제 개행 문자 사용 (권장)**

Vercel Dashboard에서 환경변수 입력 시:
1. Value 필드에 **큰따옴표 없이** 다음과 같이 입력:
```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC8PGoRvtK9TQtw
ovRlSNPI79jWiGQ3ADUKWkgkYXUymYk0dIcqJF3IurXt/sM9SRLIy8Sf1VAGgo5V
mtmcL9B4vvGzjb/G5ztJGn8LF58DHAxnoSZwfyxz9JeQnn1p4V2MiqwnLFf4ly/b
5rgRmBC5V2BVlgmki2O+lbwH561978uoxfLSvs9+zBMtlYe9TX8+nNjPE2CVeOvg
S8Mao4tT38zeGudMl7m57rCLY/rdS1hDg7nPo8TUeQdA4DDOGxU2wrM0qY1okiwD
aQh5uk8JqHd9nYIcSK0EmVLabHbAdDh4QAaawsWgDIqHt4cAQDQZG/prX7qBeq/3
OFTGCdj1AgMBAAECggEAIzx77o52DJGbjp4yebNEUdz0DlTBzbnwM9vqnUTRF4O+
N1+I3c6o76Zj4AVMrvA63/Ok/vaDYHSYCFZQXfhlYfT8ccwbFjS62FhpZ74oOgDK
Iav88hocTCiBJsVEXMmfJWvgBgU7AoHqp5Ns6X45wzgkBGFttKuTJF4LML+hrm0e
tENQTpeOAfcb72kunuBmXCTxGha67CfDBKY2MTaQHSm560chVUTHJIIdAmqihYhj
2aA+gNtqPZQG7YyEtEp/N9sh0/PY8epl6vO9HNdB1v5XizBgj+ZTsu7bgDVGIINf
ym5L9y/DTEdYGCOpUoTIxOylNrXWnN3rj6Zzt+ixgQKBgQDohnqDRP1C5wOGfowk
szgae0TvU9WGcvVYAhcyKsjItS4SobtILBLsEPi2q3y1+03ncv4GBXgtVkC0qni+
sf4dLKcqV8OCxu7YmpzldqjEXUgZCxWDjPT4CR2O/+DV5sqp4UFH63naPNODHpzZ
NHCrLG8LUU/gfZR/7lmFOm8NeQKBgQDPPUvst75yxOq7dRXyxajGPmQ9TgE7e6/A
A72lkNnQe0PRVfoG3vOO8qNPVgUMSYO2uDsUAbiBr9Y8WhFCLn44gxa94oofi52n
RImG6ZpKsGERNNlhzIh3xe0mHc4wISoCfakOMyv8v5FqP7Vmd8v15k1mj0W+v3F9
IJ335SiUXQKBgQDATwhgLNyxSlJ2F49cgwTxkeXPcix0x/r10LTSfuQUaxQxwKUd
6aW0q8ynd2jrMW6a71X8MOXVyTI2uY6nWJpsEpQmxvMh49mCN01v0hV+Yg/Q9oPS
iu/He/KAZEvVXM1cdroA+1WKEyhzlwvt8BsG1vb4C0Xeyr3YmI5dS5ixMQKBgGZ/
rLOx1XIyTt7UdDyU4nralP11PUrMTAquTvg6gmCI9uvsmDMZxmDnRTqSEwEWwxx2
VlH43+bUryM+cNbI5AjTXUYha6tahGkcjuC5XWSfhALcnr+uR7jlnfuCNl67qGl+
+URaruDdZvCj/fZmPeyrMZEOP7KuQVVf8oGPR9jJAoGAI4SmRoc9ZoVl82XHRPwO
dZfN+hKnk3BRoX5fHSFN6GcQMSGhIo2h3tl228T76Q7uG/h8q5owBhmcp1jB/PUw
n4iXKf4EcjEITA9bx1XyPuVXk0zBgIgniI4m52kdjKH1ayS/iceymUP3SPlONYKK
v9mbMK7kLbAlwAZ+iLYzyYU=
-----END PRIVATE KEY-----
```

2. **중요**: 각 줄이 실제로 개행되어야 합니다 (Enter 키로 줄바꿈)
3. 큰따옴표(`"`)를 **절대 포함하지 마세요**

**Option 2: Base64 인코딩 사용**

Private key를 Base64로 인코딩하여 한 줄로 만들기:
```bash
# 로컬에서 실행
echo "-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC8PGoRvtK9TQtw
...
-----END PRIVATE KEY-----" | base64
```

그 다음 서버 코드에서 디코딩:
```typescript
const privateKey = Buffer.from(process.env.FIREBASE_ADMIN_PRIVATE_KEY_BASE64 || '', 'base64').toString('utf-8');
```

---

### 2단계: Vercel 환경변수 재설정

1. **Vercel Dashboard 접속**: https://vercel.com/dashboard
2. **프로젝트 선택**: forms4labs
3. **Settings → Environment Variables**
4. **`FIREBASE_ADMIN_PRIVATE_KEY` 삭제 후 재입력**
   - Option 1 방식 사용 (실제 개행 문자)
   - 큰따옴표 없이 입력
   - 각 줄이 실제로 Enter 키로 개행되어야 함

---

### 3단계: 재배포 트리거

환경변수 변경 후:
1. **Deployments 탭**으로 이동
2. **최신 배포**의 `...` 메뉴 클릭
3. **Redeploy** 선택
4. **Use existing Build Cache 체크 해제**
5. **Redeploy** 클릭

---

## 🔍 검증 방법

### Vercel 빌드 로그 확인
1. Deployments → 최신 배포 클릭
2. **Building** 단계 로그 확인
3. 에러 메시지 검색:
   - `Firebase Admin SDK initialization failed`
   - `Invalid PEM formatted message`
   - `error:0909006C:PEM routines`

### 정상 작동 확인
- https://forms.teaboard.link 접속
- 홈페이지가 정상적으로 로드됨
- Google 로그인 기능 테스트
- 퀴즈/설문 생성 페이지 접속

---

## 📝 추가 디버깅 팁

### Firebase Admin SDK 초기화 확인
`src/lib/firebase-admin.ts` 파일에서:
```typescript
console.log('FIREBASE_ADMIN_PRIVATE_KEY length:', process.env.FIREBASE_ADMIN_PRIVATE_KEY?.length);
console.log('FIREBASE_ADMIN_PRIVATE_KEY starts with:', process.env.FIREBASE_ADMIN_PRIVATE_KEY?.substring(0, 50));
```

### 환경변수 존재 여부 확인
```typescript
console.log('Required env vars:', {
  hasPrivateKey: !!process.env.FIREBASE_ADMIN_PRIVATE_KEY,
  hasClientEmail: !!process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  hasProjectId: !!process.env.FIREBASE_ADMIN_PROJECT_ID,
});
```

---

## 🎯 최종 체크리스트

- [ ] `FIREBASE_ADMIN_PRIVATE_KEY` 환경변수를 실제 개행 문자로 재입력
- [ ] 큰따옴표(`"`) 없이 입력했는지 확인
- [ ] 각 줄이 Enter 키로 개행되어 있는지 확인
- [ ] Vercel에서 재배포 (Build Cache 비활성화)
- [ ] 빌드 로그에서 Firebase 관련 에러 없는지 확인
- [ ] https://forms.teaboard.link 정상 작동 확인

---

**작성일**: 2025-11-03
**프로젝트**: forms4labs
**도메인**: https://forms.teaboard.link
