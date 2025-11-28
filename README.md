# 🎯 TeaBoard Forms

AI 기반 구글 폼 자동 생성 플랫폼 - 퀴즈와 설문을 AI로 쉽고 빠르게 만들어보세요!

## ✨ 주요 기능

### 🤖 AI 기반 자동 생성
- **Gemini AI 통합**: Google Gemini API를 활용한 지능형 퀴즈/설문 생성
- **맞춤형 난이도**: 쉬움/보통/어려움 난이도 자동 조정
- **다양한 문항 유형**: 객관식, 단답형, 혼합형 자동 생성

### 📝 구글 폼 완벽 연동
- **원클릭 생성**: 생성된 퀴즈/설문이 구글 폼으로 자동 저장
- **즉시 공유**: 생성 즉시 링크로 공유 가능
- **자동 채점**: 퀴즈 모드에서 정답 및 해설 자동 설정

### 🔐 간편한 인증
- **구글 OAuth**: 구글 계정으로 간편 로그인
- **자동 권한 설정**: 로그인 시 필요한 모든 권한 자동 획득
- **토큰 자동 관리**: 액세스 토큰 자동 갱신

## 🚀 시작하기

### 필수 요구사항
- Node.js 18.17 이상
- npm, yarn, pnpm 중 하나
- Google Cloud 프로젝트 (OAuth 설정)
- Firebase 프로젝트 (인증 및 데이터베이스)

### 설치

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 환경 변수 설정

**중요**: `.env.example` 파일을 복사하여 `.env.local`을 생성하고 필요한 값을 입력하세요.

```bash
cp .env.example .env.local
```

필요한 환경 변수:
- Firebase Client SDK (브라우저용)
- Firebase Admin SDK (서버사이드용)
- Google OAuth 인증 정보
- NextAuth 설정

**로컬 개발 시 필수 단계**:
1. Firebase Console에서 프로젝트 생성
2. Firebase Admin SDK 서비스 계정 키 발급
3. `.env.local` 파일에 모든 환경 변수 입력
4. `npm run dev`로 개발 서버 실행

### 개발 서버 실행

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

[http://localhost:3000](http://localhost:3000)에서 애플리케이션을 확인할 수 있습니다.

## 🛠 기술 스택

### Frontend
- **Next.js 15**: React 기반 풀스택 프레임워크
- **React 18**: 최신 React 기능 활용
- **TypeScript**: 타입 안정성
- **Tailwind CSS**: 유틸리티 기반 스타일링
- **Radix UI**: 접근성 좋은 UI 컴포넌트

### Backend & Auth
- **NextAuth.js**: 구글 OAuth 인증
- **Google Forms API**: 구글 폼 생성 및 관리
- **Firebase Authentication**: 사용자 인증
- **Firebase Realtime Database**: 토큰 저장소

### AI & Automation
- **Google Gemini API**: AI 기반 퀴즈 생성
- **googleapis**: 구글 API 통합

## 📁 프로젝트 구조

```
teaboard-forms/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API 라우트
│   │   │   ├── forms/        # 구글 폼 생성 API
│   │   │   └── generate/     # AI 생성 API
│   │   ├── create/           # 퀴즈/설문 생성 페이지
│   │   └── dashboard/        # 대시보드
│   ├── components/           # React 컴포넌트
│   ├── lib/                  # 유틸리티 함수
│   │   ├── auth.ts          # NextAuth 설정
│   │   ├── firebase.ts      # Firebase 설정
│   │   ├── google-forms.ts  # 구글 폼 API
│   │   └── gemini.ts        # Gemini AI
│   └── types/               # TypeScript 타입
├── VERCEL_ENV_SETUP.md      # 환경 변수 가이드 (비공개)
└── package.json
```

## 🔒 보안

### 환경 변수 관리
- 모든 민감한 정보는 `.env.local`에 저장
- `.env.local` 파일은 Git에 커밋되지 않음
- `VERCEL_ENV_SETUP.md`에 상세한 설정 가이드 포함 (비공개)

### API 보안
- 모든 API 엔드포인트에서 세션 검증
- Firebase를 통한 안전한 토큰 저장
- 구글 OAuth 2.0 사용

## 📦 배포

### Vercel 배포

**⚠️ 주의**: `DEPLOYMENT_GUIDE.md` 파일은 보안상 GitHub에 업로드되지 않습니다. 로컬에만 보관하세요.

1. GitHub에 코드 푸시
2. Vercel에서 GitHub 저장소 연결
3. **`DEPLOYMENT_GUIDE.md` 가이드를 참조하여** Vercel 환경변수 설정
4. 자동 배포 시작

상세한 배포 가이드는 프로젝트 루트의 `DEPLOYMENT_GUIDE.md` 파일을 참조하세요.

## 🤝 기여

본 프로젝트는 독점 소프트웨어(Proprietary Software)입니다. 기여를 원하시면 먼저 저작권자에게 문의해주세요.

## 📄 라이센스 및 저작권

**⚠️ 중요: 본 소프트웨어는 독점 소프트웨어입니다**

```
Copyright (c) 2025 김문정 (Kim Moon Jung) - 안양 박달초등학교
All Rights Reserved.
```

본 소프트웨어의 복사, 수정, 배포, 재판매는 저작권자의 명시적인 서면 허가 없이 **엄격히 금지**됩니다.

### 허용 사항
- ✅ 공개 저장소에서 코드 열람
- ✅ 개인적 학습 목적으로 코드 연구
- ✅ 교육 목적으로 코드 참조

### 금지 사항
- ❌ 소프트웨어 복사 및 배포
- ❌ 소스 코드 수정 및 변경
- ❌ 상업적 이용 및 재판매
- ❌ 파생 저작물 생성
- ❌ 재라이센스 부여

자세한 라이센스 조항은 [LICENSE](LICENSE) 파일을 참조하세요.

### 연락처
라이센스 관련 문의 또는 사용 허가 요청:
- 📧 이메일: jpmjkim23@gmail.com
- 💬 카카오톡: https://open.kakao.com/o/gubGYQ7g
- 🔗 GitHub: https://github.com/reallygood83/forms4labs

## 👤 작성자

**김문정** (Kim Moon Jung)
안양 박달초등학교

---

**⚠️ 보안 주의사항**:
- `.env.local` 파일은 절대 GitHub에 커밋하지 마세요
- `DEPLOYMENT_GUIDE.md` 파일도 GitHub에 업로드되지 않습니다
- Firebase Admin SDK 서비스 계정 키(JSON 파일)는 절대 커밋하지 마세요
- 모든 민감한 정보는 Vercel 환경변수로만 관리하세요
