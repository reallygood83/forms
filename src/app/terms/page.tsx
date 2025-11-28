export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="border-2 border-black p-8">
          <h1 className="text-3xl font-bold text-black mb-2 uppercase tracking-wide">
            서비스 이용약관
          </h1>
          <p className="text-sm text-gray-600 mb-8">최종 업데이트: 2025년 11월 3일</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                제1조 (목적)
              </h2>
              <p className="text-gray-700">
                본 약관은 Teaboard Forms(이하 &quot;서비스&quot;)가 제공하는
                AI 기반 Google Forms 자동 생성 서비스의 이용과 관련하여
                서비스 제공자와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                제2조 (정의)
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  <strong>&quot;서비스&quot;</strong>란 Teaboard Forms가 제공하는
                  AI 기반 퀴즈 및 설문 자동 생성 및 Google Forms 연동 서비스를 말합니다.
                </li>
                <li>
                  <strong>&quot;이용자&quot;</strong>란 본 약관에 따라 서비스를 이용하는 회원 및 비회원을 말합니다.
                </li>
                <li>
                  <strong>&quot;회원&quot;</strong>란 Google 계정으로 로그인하여 서비스를 이용하는 자를 말합니다.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                제3조 (약관의 효력 및 변경)
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li>본 약관은 서비스 화면에 게시하거나 기타의 방법으로 공지함으로써 효력이 발생합니다.</li>
                <li>
                  서비스는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있으며,
                  변경된 약관은 제1항과 같은 방법으로 공지합니다.
                </li>
                <li>
                  이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                제4조 (서비스의 제공)
              </h2>
              <p className="text-gray-700 mb-3">서비스는 다음과 같은 기능을 제공합니다:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>AI 기반 퀴즈 자동 생성</li>
                <li>AI 기반 설문조사 자동 생성</li>
                <li>Google Forms로 자동 내보내기</li>
                <li>생성된 폼의 관리 및 수정</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                제5조 (Google API 사용)
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  서비스는 Google Forms 생성을 위해 Google API를 사용합니다.
                </li>
                <li>
                  이용자는 서비스 이용 시 Google 계정 연동 및 필요한 권한 제공에 동의해야 합니다.
                </li>
                <li>
                  서비스는 이용자의 Google 계정 정보를 서비스 제공 목적으로만 사용하며,
                  제3자에게 제공하지 않습니다.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                제6조 (이용자의 의무)
              </h2>
              <p className="text-gray-700 mb-3">이용자는 다음 행위를 하여서는 안 됩니다:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>타인의 개인정보를 도용하거나 부정하게 사용하는 행위</li>
                <li>서비스의 정상적인 운영을 방해하는 행위</li>
                <li>공공질서 및 미풍양속에 위배되는 내용의 퀴즈/설문 생성</li>
                <li>저작권 등 타인의 권리를 침해하는 콘텐츠 생성</li>
                <li>서비스를 상업적 목적으로 무단 이용하는 행위</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                제7조 (저작권 및 지적재산권)
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  서비스가 제공하는 모든 콘텐츠(디자인, 로고, 소프트웨어 등)에 대한
                  저작권 및 지적재산권은 Teaboard Forms에 있습니다.
                </li>
                <li>
                  이용자가 생성한 퀴즈 및 설문의 저작권은 이용자에게 있으며,
                  서비스는 이를 서비스 개선 목적으로만 사용할 수 있습니다.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                제8조 (면책 조항)
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  서비스는 AI 기술을 사용하여 콘텐츠를 생성하며,
                  생성된 내용의 정확성과 적절성에 대해 보장하지 않습니다.
                </li>
                <li>
                  이용자는 AI가 생성한 콘텐츠를 사용하기 전 반드시 검토하고 수정해야 하며,
                  이로 인해 발생하는 문제에 대한 책임은 이용자에게 있습니다.
                </li>
                <li>
                  서비스는 천재지변, 시스템 장애, Google API 장애 등
                  불가항력적인 사유로 인한 서비스 중단에 대해 책임지지 않습니다.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                제9조 (서비스의 변경 및 중단)
              </h2>
              <p className="text-gray-700">
                서비스는 운영상 또는 기술상의 필요에 따라 제공하고 있는 서비스의 전부 또는 일부를
                변경하거나 중단할 수 있으며, 이 경우 사전에 공지합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                제10조 (분쟁 해결)
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                <li>
                  본 약관에 명시되지 않은 사항은 관련 법령 및 상관례에 따릅니다.
                </li>
                <li>
                  서비스 이용과 관련하여 발생한 분쟁에 대해서는 대한민국 법률을 적용합니다.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                제11조 (문의 및 연락처)
              </h2>
              <div className="bg-gray-50 border-2 border-black p-6">
                <p className="text-gray-700">
                  <strong>서비스 제공자:</strong> Teaboard Forms
                </p>
                <p className="text-gray-700">
                  <strong>책임자:</strong> 김문정 (Moon-Jung Kim)
                </p>
                <p className="text-gray-700">
                  <strong>이메일:</strong> usmjkim23@gmail.com
                </p>
                <p className="text-gray-700">
                  <strong>카카오톡 문의:</strong>{' '}
                  <a
                    href="https://open.kakao.com/o/gubGYQ7g"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    개발자 연락하기
                  </a>
                </p>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-6 border-t-2 border-black">
            <p className="text-sm text-gray-600 text-center">
              본 약관은 2025년 11월 3일부터 적용됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
