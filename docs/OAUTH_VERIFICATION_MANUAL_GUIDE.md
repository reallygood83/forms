# 🚀 Google OAuth 검증 재개 - 사용자 수동 작업 가이드

**프로젝트**: Teaboard Forms
**목적**: "확인되지 않은 앱" 경고 및 100명 사용자 제한 해제
**예상 소요 시간**: 2-3시간
**작성일**: 2025-01-07

---

## 📋 작업 개요

Google로부터 "민감 데이터 보호 메커니즘 부재"로 검증 보류 통지를 받았습니다. 아래 단계를 따라 재검증을 완료하세요.

---

## ✅ 체크리스트

작업을 진행하면서 완료한 항목에 체크하세요:

- [ ] **1단계**: OAuth 동의화면 범위 확인 및 정리
- [ ] **2단계**: 개인정보처리방침 페이지 생성 및 배포
- [ ] **3단계**: 범위 근거 (Scope Justification) 작성
- [ ] **4단계**: 데모 비디오 YouTube 업로드 및 설명 작성
- [ ] **5단계**: 테스트 절차 문서 작성
- [ ] **6단계**: 도메인 소유권 확인
- [ ] **7단계**: OAuth 재검증 제출
- [ ] **8단계**: Google 검증팀에 메일 회신
- [ ] **9단계**: 검증 완료 확인

---

## 📝 1단계: OAuth 동의화면 범위 확인 및 정리

### 🎯 목표
- 코드에서 요청하는 OAuth 범위와 동의화면 등록 범위를 100% 일치시킵니다.

### 📍 작업 위치
**Google Cloud Console** → **API 및 서비스** → **OAuth 동의 화면**

### 🔧 작업 순서

#### 1.1 현재 등록된 범위 확인
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 프로젝트 **"teaboard-forms"** 선택
3. 좌측 메뉴: **API 및 서비스** → **OAuth 동의 화면** 클릭
4. **"앱 수정"** 버튼 클릭
5. **2단계: 범위** 섹션으로 이동
6. 현재 등록된 범위 확인:

**✅ 필수 범위 (이미 등록되어 있어야 함)**:
```
✓ openid
✓ .../auth/userinfo.email
✓ .../auth/userinfo.profile
✓ .../auth/forms.body
✓ .../auth/drive.file
```

#### 1.2 불필요한 범위 제거 (있을 경우)
- ❌ `.../auth/forms.responses.readonly` - **있으면 삭제** (코드에서 사용하지 않음)
- ❌ 기타 등록되었으나 위 5개 필수 범위가 아닌 것들 모두 삭제

#### 1.3 저장
- **"저장 후 계속"** 버튼 클릭

### 📸 증빙 자료
다음 스크린샷을 찍어서 저장하세요:
1. **범위 목록 전체 화면**
2. **저장 완료 확인 메시지**

---

## 📝 2단계: 개인정보처리방침 페이지 생성 및 배포

### 🎯 목표
- 민감 데이터 보호 메커니즘이 명시된 개인정보처리방침을 웹에 공개합니다.

### 📍 작업 위치
**Next.js 프로젝트** → **새 페이지 생성** → **Vercel 배포**

### 🔧 작업 순서

#### 2.1 개인정보처리방침 페이지 생성 (한국어)

**파일 위치**: `/src/app/privacy/page.tsx`

이미 프로젝트에 `/docs/privacy-policy-ko.md` 파일이 생성되어 있습니다. 이를 Next.js 페이지로 변환해야 합니다.

#### 2.2 개인정보처리방침 페이지 생성 (영어)

**파일 위치**: `/src/app/privacy/en/page.tsx`

동일하게 `/docs/privacy-policy-en.md` 파일을 영어 페이지로 변환합니다.

#### 2.3 Vercel 배포
```bash
# 터미널에서 실행
cd /Users/moon/Desktop/forms-new
git add .
git commit -m "feat: Add comprehensive Privacy Policy pages with data protection mechanisms for OAuth verification"
git push origin main
```

#### 2.4 배포 확인
- **한국어 URL**: https://forms.teaboard.link/privacy
- **영어 URL**: https://forms.teaboard.link/privacy/en

브라우저에서 접속하여 페이지가 정상적으로 표시되는지 확인하세요.

### 📸 증빙 자료
다음 스크린샷을 찍어서 저장하세요:
1. **한국어 개인정보처리방침 페이지 전체 화면**
2. **영어 개인정보처리방침 페이지 전체 화면**
3. **Vercel 배포 완료 화면**

---

## 📝 3단계: 범위 근거 (Scope Justification) 작성

### 🎯 목표
- Google에게 민감/제한 범위가 왜 필요한지 명확히 설명합니다.

### 📍 작업 위치
**Google Cloud Console** → **OAuth 동의 화면** → **범위 근거 추가**

### 🔧 작업 순서

#### 3.1 범위 근거 작성 페이지 이동
1. Google Cloud Console → OAuth 동의 화면
2. **"앱 수정"** 클릭
3. **2단계: 범위** 섹션
4. 각 민감/제한 범위 옆의 **"범위 근거 추가"** 버튼 클릭

#### 3.2 범위별 근거 작성

**A. `forms.body` 범위 근거**:

**한국어**:
```
이 앱은 교사가 AI를 활용하여 퀴즈와 설문조사를 자동으로 생성하고 Google Forms로 배포하는 교육용 도구입니다.

사용자를 대신하여 Google Forms를 생성, 수정, 삭제하기 위해 이 범위가 필요합니다.

모든 작업은 사용자의 명시적 동의 하에 수행되며, 사용자가 생성한 교육 콘텐츠만 접근합니다.
```

**영어**:
```
This app is an educational tool that enables teachers to automatically generate quizzes and surveys using AI and deploy them to Google Forms.

The forms.body scope is required to create, edit, and delete Google Forms on behalf of the user.

All operations are performed with explicit user consent and only access educational content created by the user.
```

**B. `drive.file` 범위 근거**:

**한국어**:
```
생성된 Google Forms를 사용자의 Google Drive에 저장하고 관리하기 위해 이 범위가 필요합니다.

앱은 사용자가 생성한 Forms 파일만 접근하며, 다른 Drive 파일에는 접근하지 않습니다.

사용자는 언제든지 Drive에서 생성된 Forms를 확인하고 삭제할 수 있습니다.
```

**영어**:
```
The drive.file scope is required to save and manage generated Google Forms in the user's Google Drive.

The app only accesses Forms files created by the user and does not access other Drive files.

Users can view and delete generated Forms from their Drive at any time.
```

#### 3.3 저장
- 모든 범위 근거 작성 완료 후 **"저장 후 계속"** 클릭

### 📸 증빙 자료
다음 스크린샷을 찍어서 저장하세요:
1. **forms.body 범위 근거 작성 완료 화면**
2. **drive.file 범위 근거 작성 완료 화면**

---

## 📝 4단계: 데모 비디오 YouTube 업로드 및 설명 작성

### 🎯 목표
- OAuth 범위가 실제로 어떻게 사용되는지 보여주는 영상을 제공합니다.

### 📍 작업 위치
**YouTube Studio** → **업로드**

### 🔧 작업 순서

#### 4.1 영상 편집 (선택사항)
이미 녹화한 영상이 있으므로 아래 내용이 포함되어 있는지 확인하세요:

**✅ 필수 포함 내용**:
1. **OAuth 로그인 화면** (0:00-0:30)
   - https://forms.teaboard.link 접속
   - "Google로 로그인" 버튼 클릭
   - OAuth 동의 화면 전체 표시
   - 요청 범위 목록 확인 가능

2. **퀴즈 생성 과정** (0:30-1:30)
   - 주제 입력
   - "퀴즈 생성" 버튼 클릭
   - AI 생성 진행 화면
   - 생성된 Google Forms 링크 표시

3. **Google Forms 확인** (1:30-2:00)
   - 생성된 Forms 링크 클릭
   - 실제 Forms 화면 표시

4. **Google Drive 확인** (2:00-2:30)
   - Google Drive 접속
   - "내 Drive" 에서 생성된 Forms 파일 확인

#### 4.2 YouTube 업로드

1. [YouTube Studio](https://studio.youtube.com) 접속
2. **"만들기"** → **"동영상 업로드"** 클릭
3. 녹화한 영상 파일 선택

**업로드 설정**:
- **제목**: `Teaboard Forms - OAuth Demo | AI 기반 퀴즈 자동 생성 데모`
- **설명**: 아래 제공된 한국어/영어 설명 복사하여 붙여넣기
- **공개 범위**: **"일부 공개"** 또는 **"비공개"** 선택
- **카테고리**: 교육
- **태그**: `#교육` `#AI` `#GoogleForms` `#EdTech`

**YouTube 영상 설명 (한국어)**:
```
🎓 Teaboard Forms - AI 기반 구글폼 자동 생성 도구

이 영상은 Google OAuth 인증을 위한 데모 영상입니다.

📌 앱 소개
Teaboard Forms는 교사들이 AI를 활용하여 퀴즈와 설문조사를 자동으로 생성하고 Google Forms로 즉시 배포할 수 있는 교육용 도구입니다.

🔑 OAuth 범위 사용 목적
1. forms.body: 사용자를 대신하여 Google Forms를 생성, 수정, 삭제
2. drive.file: 생성된 Google Forms를 사용자의 Google Drive에 저장 및 관리

✨ 주요 기능
- AI 기반 자동 퀴즈 생성 (Gemini AI 활용)
- Google Forms 즉시 배포
- 교육 수준별 맞춤 문제 생성
- 실시간 Google Drive 연동

🔒 개인정보 보호
모든 작업은 사용자의 명시적 동의 하에 수행되며, 사용자가 생성한 교육 콘텐츠만 접근합니다.

🌐 웹사이트: https://forms.teaboard.link
📧 문의: jpmjkim23@gmail.com

#교육 #AI #GoogleForms #퀴즈생성 #교육기술 #EdTech
```

**YouTube 영상 설명 (영어)**:
```
🎓 Teaboard Forms - AI-Powered Google Forms Auto-Generator

This video is a demonstration for Google OAuth verification.

📌 App Overview
Teaboard Forms is an educational tool that enables teachers to automatically generate quizzes and surveys using AI and deploy them instantly to Google Forms.

🔑 OAuth Scope Usage
1. forms.body: Create, edit, and delete Google Forms on behalf of the user
2. drive.file: Save and manage generated Google Forms in the user's Google Drive

✨ Key Features
- AI-powered automatic quiz generation (powered by Gemini AI)
- Instant Google Forms deployment
- Customized questions by education level
- Real-time Google Drive integration

🔒 Privacy Protection
All operations are performed with explicit user consent and only access educational content created by the user.

🌐 Website: https://forms.teaboard.link
📧 Contact: jpmjkim23@gmail.com

#Education #AI #GoogleForms #QuizGenerator #EdTech #TeachingTools
```

#### 4.3 업로드 완료 및 링크 복사

1. 업로드 완료 후 **"공유"** 버튼 클릭
2. **YouTube 링크 복사**
   - 예시: `https://www.youtube.com/watch?v=XXXXXXXXXXX`
3. 링크를 메모장에 임시 저장

### 📸 증빙 자료
다음 스크린샷을 찍어서 저장하세요:
1. **YouTube 업로드 완료 화면**
2. **영상 설명 전체 화면**
3. **YouTube 링크 복사 화면**

---

## 📝 5단계: 테스트 절차 문서 작성

### 🎯 목표
- Google 검증팀이 앱을 테스트할 수 있는 상세한 절차를 제공합니다.

### 📍 작업 위치
**프로젝트 폴더** → **docs/TEST_PROCEDURE.md**

### 🔧 작업 순서

이미 프로젝트에 `/docs/TEST_PROCEDURE.md` 파일이 생성되어 있습니다.

#### 5.1 테스트 계정 생성 (선택사항)

Google 검증팀이 사용할 테스트 계정을 제공하고 싶다면:

1. 새 Gmail 계정 생성
   - 예시: `teaboard-forms-test@gmail.com`
2. 비밀번호 설정
3. 테스트 계정 정보를 별도 문서에 기록

**주의**: 테스트 계정은 선택사항이며, Google 검증팀은 자체 테스트 계정을 사용할 수도 있습니다.

### 📸 증빙 자료
- 테스트 절차 문서 (`/docs/TEST_PROCEDURE.md`) 확인

---

## 📝 6단계: 도메인 소유권 확인

### 🎯 목표
- Google Search Console에서 도메인 소유권이 검증되었는지 확인합니다.

### 📍 작업 위치
**Google Search Console**

### 🔧 작업 순서

#### 6.1 Search Console 접속
1. [Google Search Console](https://search.google.com/search-console) 접속
2. **forms.teaboard.link** 속성 선택

#### 6.2 소유권 확인
- 좌측 메뉴: **설정** → **소유권 확인**
- **"확인됨"** 상태인지 확인

**만약 소유권이 확인되지 않았다면**:
1. **DNS 레코드 확인** 방법 선택
2. Vercel DNS 설정에 TXT 레코드 추가
3. **확인** 버튼 클릭

### 📸 증빙 자료
다음 스크린샷을 찍어서 저장하세요:
1. **도메인 소유권 확인 완료 화면**

---

## 📝 7단계: OAuth 재검증 제출

### 🎯 목표
- Google Cloud Console에서 업데이트된 정보를 제출합니다.

### 📍 작업 위치
**Google Cloud Console** → **OAuth 동의 화면**

### 🔧 작업 순서

#### 7.1 OAuth 동의 화면 최종 검토

1. Google Cloud Console → OAuth 동의 화면
2. **"앱 수정"** 클릭
3. 모든 섹션 검토:

**1단계: 앱 정보**
- ✅ 앱 이름: `Teaboard Forms`
- ✅ 사용자 지원 이메일: `jpmjkim23@gmail.com`
- ✅ 앱 로고: 업로드 완료
- ✅ 앱 도메인:
  - 홈페이지: `https://forms.teaboard.link`
  - 개인정보처리방침: `https://forms.teaboard.link/privacy`
  - 서비스 약관: `https://forms.teaboard.link/terms` (있다면)
- ✅ 승인된 도메인: `teaboard.link`

**2단계: 범위**
- ✅ 5개 범위 등록 확인:
  - `openid`
  - `.../auth/userinfo.email`
  - `.../auth/userinfo.profile`
  - `.../auth/forms.body`
  - `.../auth/drive.file`
- ✅ 범위 근거 모두 작성 완료

**3단계: 테스트 사용자** (선택사항)
- 테스트 계정 추가 (있다면)

#### 7.2 검증 센터로 이동

1. OAuth 동의 화면 페이지 하단
2. **"검증 준비"** 또는 **"인증 준비"** 버튼 클릭
3. 검증 센터 페이지로 이동

#### 7.3 필수 정보 입력

**A. 데모 동영상 링크**
- 4단계에서 복사한 YouTube 링크 붙여넣기
- 예시: `https://www.youtube.com/watch?v=XXXXXXXXXXX`

**B. 앱 사용 사례 설명**

**한국어**:
```
Teaboard Forms는 교사들이 AI(Google Gemini)를 활용하여 퀴즈와 설문조사를 자동으로 생성하고, Google Forms로 즉시 배포할 수 있도록 돕는 교육용 도구입니다.

주요 기능:
1. AI 기반 자동 문제 생성: 교사가 주제와 학년을 입력하면 Gemini AI가 자동으로 퀴즈 문제를 생성합니다.
2. Google Forms 자동 배포: 생성된 문제를 Google Forms로 자동 변환하여 학생들에게 즉시 배포합니다.
3. Google Drive 통합: 생성된 Forms는 교사의 Google Drive에 자동 저장되어 언제든지 수정 및 재사용할 수 있습니다.

OAuth 범위 사용 목적:
- forms.body: 사용자(교사)를 대신하여 Google Forms를 생성, 수정, 삭제하기 위해 필요합니다.
- drive.file: 생성된 Google Forms를 사용자의 Drive에 저장하고 관리하기 위해 필요합니다.

개인정보 보호:
- 모든 작업은 사용자의 명시적 동의 하에 수행됩니다.
- 앱은 사용자가 생성한 교육 콘텐츠만 접근하며, 다른 Drive 파일이나 개인정보에는 접근하지 않습니다.
- OAuth 토큰은 암호화되어 저장되며, 사용자 로그아웃 시 즉시 삭제됩니다.

자세한 개인정보처리방침: https://forms.teaboard.link/privacy
```

**영어**:
```
Teaboard Forms is an educational tool that helps teachers automatically generate quizzes and surveys using AI (Google Gemini) and instantly deploy them to Google Forms.

Key Features:
1. AI-powered Automatic Question Generation: Teachers input a topic and grade level, and Gemini AI automatically generates quiz questions.
2. Automatic Google Forms Deployment: Generated questions are automatically converted to Google Forms and instantly deployed to students.
3. Google Drive Integration: Created Forms are automatically saved to the teacher's Google Drive for easy editing and reuse.

OAuth Scope Usage:
- forms.body: Required to create, edit, and delete Google Forms on behalf of the user (teacher).
- drive.file: Required to save and manage generated Google Forms in the user's Drive.

Privacy Protection:
- All operations are performed with explicit user consent.
- The app only accesses educational content created by the user and does not access other Drive files or personal information.
- OAuth tokens are encrypted and stored securely, and are immediately deleted upon user logout.

Detailed Privacy Policy: https://forms.teaboard.link/privacy
```

**C. 테스트 절차 문서 링크**
- GitHub 링크 또는 Google Docs 링크
- 예시: `https://github.com/reallygood83/forms-new/blob/main/docs/TEST_PROCEDURE.md`

#### 7.4 제출

1. 모든 필수 정보 입력 완료 확인
2. **"저장 후 계속"** 클릭
3. 최종 페이지에서 **"검토 제출"** 또는 **"Submit"** 버튼 클릭
4. 제출 완료 확인 메시지 확인

### 📸 증빙 자료
다음 스크린샷을 찍어서 저장하세요:
1. **데모 동영상 링크 입력 화면**
2. **앱 사용 사례 설명 입력 화면**
3. **검토 제출 완료 확인 화면**

---

## 📝 8단계: Google 검증팀에 메일 회신

### 🎯 목표
- Google 검증팀에게 업데이트 완료를 알리고 재검토를 요청합니다.

### 📍 작업 위치
**이메일 클라이언트**

### 🔧 작업 순서

#### 8.1 Google로부터 받은 원본 메일 찾기

- 제목: "브랜딩/동의화면 검증 보류" 또는 이와 유사한 내용
- 발신자: Google OAuth 검증팀

#### 8.2 회신 메일 작성

**제목**: Re: [원본 메일 제목]

**본문 (한국어)**:
```
안녕하세요,

Project ID: teaboard-forms (774141744785)에 대한 OAuth 검증 보류 통지를 받았습니다.

지적하신 "민감 데이터 보호 메커니즘 부재" 문제를 해결하기 위해 다음 조치를 완료했습니다:

1. ✅ OAuth 범위 최소화: 불필요한 범위 제거, 필수 범위만 등록
   - openid, email, profile, forms.body, drive.file

2. ✅ 개인정보처리방침 업데이트 및 공개
   - 한국어: https://forms.teaboard.link/privacy
   - 영어: https://forms.teaboard.link/privacy/en
   - 민감 데이터 보호 메커니즘 상세 명시:
     * 전송 중 암호화 (TLS 1.3)
     * 저장 중 암호화 (AES-256)
     * 접근 통제 (RBAC)
     * 로그 및 감사
     * 비상 대응 절차

3. ✅ 범위 근거 (Scope Justification) 작성 완료
   - forms.body: Google Forms 생성/수정/삭제 목적 명시
   - drive.file: Drive 저장 목적 명시

4. ✅ 데모 비디오 제공
   - YouTube 링크: [4단계에서 복사한 YouTube 링크]
   - OAuth 동의 화면부터 Forms 생성까지 전 과정 시연

5. ✅ 테스트 절차 문서 제공
   - GitHub: https://github.com/reallygood83/forms-new/blob/main/docs/TEST_PROCEDURE.md

6. ✅ 도메인 소유권 확인 완료
   - Google Search Console에서 forms.teaboard.link 검증 완료

OAuth 동의 화면에서 재검증을 제출했습니다.
검토 후 승인해 주시면 감사하겠습니다.

추가 정보가 필요하시면 언제든지 연락 주십시오.

감사합니다.

김문정
이메일: jpmjkim23@gmail.com
웹사이트: https://forms.teaboard.link
```

**본문 (영어)**:
```
Hello,

I received an OAuth verification hold notice for Project ID: teaboard-forms (774141744785).

To address the "lack of sensitive data protection mechanisms" issue you mentioned, I have completed the following actions:

1. ✅ OAuth Scope Minimization: Removed unnecessary scopes, only essential scopes registered
   - openid, email, profile, forms.body, drive.file

2. ✅ Privacy Policy Updated and Published
   - Korean: https://forms.teaboard.link/privacy
   - English: https://forms.teaboard.link/privacy/en
   - Detailed sensitive data protection mechanisms specified:
     * Encryption in Transit (TLS 1.3)
     * Encryption at Rest (AES-256)
     * Access Control (RBAC)
     * Logging & Auditing
     * Incident Response Procedures

3. ✅ Scope Justification Completed
   - forms.body: Purpose for creating/editing/deleting Google Forms specified
   - drive.file: Purpose for Drive storage specified

4. ✅ Demo Video Provided
   - YouTube Link: [Paste YouTube link from Step 4]
   - Demonstrated entire process from OAuth consent screen to Forms creation

5. ✅ Test Procedure Documentation Provided
   - GitHub: https://github.com/reallygood83/forms-new/blob/main/docs/TEST_PROCEDURE.md

6. ✅ Domain Ownership Verified
   - forms.teaboard.link verified in Google Search Console

I have submitted the re-verification through the OAuth consent screen.
I would appreciate your approval after review.

Please feel free to contact me if you need any additional information.

Thank you.

Kim Moon-jeong
Email: jpmjkim23@gmail.com
Website: https://forms.teaboard.link
```

#### 8.3 메일 발송

- 회신 버튼 클릭
- 본문 붙여넣기
- YouTube 링크 확인
- **전송** 버튼 클릭

### 📸 증빙 자료
다음 스크린샷을 찍어서 저장하세요:
1. **회신 메일 전송 완료 화면**

---

## 📝 9단계: 검증 완료 확인

### 🎯 목표
- Google로부터 검증 승인을 받고 "확인되지 않은 앱" 경고가 사라졌는지 확인합니다.

### 📍 작업 위치
**Google Cloud Console** + **앱 테스트**

### 🔧 작업 순서

#### 9.1 검증 상태 모니터링

**검증 소요 시간**: 3-5 영업일 (최대 2주)

**모니터링 방법**:
1. **이메일 확인**: Google로부터 검증 결과 메일 수신
2. **Cloud Console 확인**:
   - Google Cloud Console → OAuth 동의 화면
   - 상태 확인: **"게시됨"** 또는 **"Verified"**

#### 9.2 검증 승인 후 테스트

**A. "확인되지 않은 앱" 경고 제거 확인**
1. **시크릿 창** 또는 **다른 브라우저**에서 테스트
2. https://forms.teaboard.link 접속
3. **"Google로 로그인"** 클릭
4. OAuth 동의 화면 확인:
   - ✅ **"확인되지 않은 앱"** 경고 **없음**
   - ✅ 앱 이름: **Teaboard Forms** 표시
   - ✅ 요청 권한 목록 표시

**B. 100명 사용자 제한 해제 확인**
1. Google Cloud Console → OAuth 동의 화면
2. 사용자 수 제한 표시 확인:
   - ❌ **"신규 사용자 100명 제한"** 문구 사라짐
   - ✅ 무제한 사용자 등록 가능

#### 9.3 최종 기능 테스트

**전체 플로우 테스트**:
1. 새 계정으로 로그인
2. 퀴즈 생성 테스트
3. Google Forms 생성 확인
4. Google Drive 저장 확인

모든 기능이 정상 작동하면 **검증 완료**입니다! 🎉

### 📸 증빙 자료
다음 스크린샷을 찍어서 저장하세요:
1. **검증 승인 이메일**
2. **OAuth 동의 화면 "게시됨" 상태**
3. **"확인되지 않은 앱" 경고 없는 로그인 화면**
4. **사용자 제한 해제 확인 화면**

---

## 🚨 문제 해결 (Troubleshooting)

### 문제 1: 범위 근거 작성 버튼이 안 보여요

**해결 방법**:
- 민감/제한 범위(`forms.body`, `drive.file`)만 근거 작성이 필요합니다.
- 기본 범위(`openid`, `email`, `profile`)는 근거 작성 불필요합니다.
- 범위 목록에서 **⚠️ 경고 아이콘**이 있는 범위만 근거를 작성하세요.

### 문제 2: YouTube 영상을 비공개로 업로드했는데 Google이 볼 수 있나요?

**해결 방법**:
- **"일부 공개"** 설정을 권장합니다.
- **"비공개"**로 설정하면 Google 검증팀이 볼 수 없습니다.
- **"일부 공개"**는 링크를 아는 사람만 시청 가능하므로 안전합니다.

### 문제 3: 개인정보처리방침 페이지가 404 에러가 나요

**해결 방법**:
1. Vercel 배포가 완료되었는지 확인:
   - https://vercel.com/dashboard → 프로젝트 선택 → Deployments 확인
2. 배포 상태가 **"Ready"**인지 확인
3. 브라우저 캐시 삭제 후 재접속

### 문제 4: 검증 제출 후 며칠이 지났는데 아무 연락이 없어요

**해결 방법**:
- **정상**: 검증은 3-5 영업일 소요, 최대 2주까지 걸릴 수 있습니다.
- **1주일 후**: Google Cloud Console에서 검증 상태 확인
- **2주일 후**: 검증팀에 재문의 메일 발송

### 문제 5: 검증이 거부되었어요

**해결 방법**:
1. 거부 사유 이메일 확인
2. 부족한 부분 보완
3. 재제출

---

## 📞 도움말 및 지원

### 추가 질문이 있으시면:
- **이메일**: jpmjkim23@gmail.com
- **GitHub Issues**: https://github.com/reallygood83/forms-new/issues

### 참고 자료:
- [Google OAuth 정책](https://developers.google.com/identity/protocols/oauth2)
- [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy)
- [OAuth 동의 화면 구성 가이드](https://support.google.com/cloud/answer/10311615)

---

## ✅ 최종 체크리스트

모든 작업을 완료하셨나요? 다시 한번 확인해보세요:

- [ ] OAuth 동의화면 범위 정리 (5개만 등록)
- [ ] 개인정보처리방침 페이지 배포 (한국어 + 영어)
- [ ] 범위 근거 작성 (`forms.body`, `drive.file`)
- [ ] 데모 비디오 YouTube 업로드 및 설명 작성
- [ ] 테스트 절차 문서 확인
- [ ] 도메인 소유권 확인 (Google Search Console)
- [ ] OAuth 재검증 제출
- [ ] Google 검증팀에 메일 회신
- [ ] 모든 스크린샷 저장 (총 15개 이상)

**모두 완료하셨다면 Google의 검증 승인을 기다리면 됩니다!** 🎉

---

**작성일**: 2025년 1월 7일
**예상 완료 기간**: 2-3시간 (작업) + 3-5 영업일 (Google 검토)
**최종 목표**: "확인되지 않은 앱" 경고 제거 + 100명 사용자 제한 해제
