export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="border-2 border-black p-8">
          <h1 className="text-3xl font-bold text-black mb-2 uppercase tracking-wide">
            개인정보처리방침
          </h1>
          <p className="text-sm text-gray-600 mb-8">최종 업데이트: 2025년 11월 3일</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                1. 수집하는 개인정보 항목
              </h2>
              <p className="text-gray-700 mb-3">
                Teaboard Forms는 Google OAuth 인증을 통해 다음의 정보를 수집합니다:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>이메일 주소 (필수)</li>
                <li>이름 (선택)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                2. 개인정보의 수집 및 이용 목적
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>회원 식별 및 인증</li>
                <li>Google Forms 자동 생성 서비스 제공</li>
                <li>사용자가 생성한 퀴즈/설문 관리</li>
                <li>서비스 개선 및 통계 분석</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                3. Google API 사용 범위
              </h2>
              <p className="text-gray-700 mb-3">
                본 서비스는 다음의 Google API 권한을 요청합니다:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  <strong>openid, email, profile:</strong> 기본 사용자 정보 (이메일, 이름)
                </li>
                <li>
                  <strong>https://www.googleapis.com/auth/forms.body:</strong> Google Forms 생성 및 수정
                </li>
                <li>
                  <strong>https://www.googleapis.com/auth/drive.file:</strong> 사용자가 생성한 Forms 파일 저장
                </li>
              </ul>
              <p className="text-gray-700 mt-3">
                위 권한은 사용자가 요청한 퀴즈/설문을 Google Forms로 생성하기 위해서만 사용되며,
                다른 목적으로는 절대 사용되지 않습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                4. 개인정보의 보유 및 이용 기간
              </h2>
              <p className="text-gray-700">
                회원 탈퇴 시 또는 개인정보 삭제 요청 시 즉시 파기됩니다.
                단, 관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                5. 개인정보의 제3자 제공
              </h2>
              <p className="text-gray-700">
                Teaboard Forms는 사용자의 개인정보를 제3자에게 제공하지 않습니다.
                단, Google Forms 생성을 위해 Google API를 사용하며,
                이는 사용자의 명시적 동의 하에 이루어집니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                6. 개인정보의 파기 절차 및 방법
              </h2>
              <p className="text-gray-700 mb-3">
                사용자가 회원 탈퇴를 요청하거나 개인정보 삭제를 요청하는 경우,
                다음의 절차로 개인정보를 파기합니다:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>파기 절차: 회원 탈퇴 요청 접수 → 즉시 개인정보 삭제</li>
                <li>파기 방법: 전자적 파일 형태의 정보는 복구 불가능한 방법으로 영구 삭제</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                7. 사용자의 권리와 행사 방법
              </h2>
              <p className="text-gray-700 mb-3">
                사용자는 언제든지 다음의 권리를 행사할 수 있습니다:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>개인정보 열람 요구</li>
                <li>개인정보 정정 요구</li>
                <li>개인정보 삭제 요구</li>
                <li>개인정보 처리 정지 요구</li>
              </ul>
              <p className="text-gray-700 mt-3">
                권리 행사는 아래 연락처로 요청하실 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                8. 개인정보 보호책임자
              </h2>
              <div className="bg-gray-50 border-2 border-black p-6">
                <p className="text-gray-700">
                  <strong>성명:</strong> 김문정 (Moon-Jung Kim)
                </p>
                <p className="text-gray-700">
                  <strong>소속:</strong> Teaboard Forms
                </p>
                <p className="text-gray-700">
                  <strong>연락처:</strong>{' '}
                  <a
                    href="https://open.kakao.com/o/gubGYQ7g"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    카카오톡 문의하기
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                9. 개인정보처리방침 변경
              </h2>
              <p className="text-gray-700">
                본 개인정보처리방침은 법령 및 서비스 변경사항을 반영하기 위해
                수정될 수 있으며, 변경 시 웹사이트를 통해 공지합니다.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-6 border-t-2 border-black">
            <p className="text-sm text-gray-600 text-center">
              본 개인정보처리방침은 2025년 11월 3일부터 적용됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
