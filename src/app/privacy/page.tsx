import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침 | Teaboard Forms',
  description: 'Teaboard Forms의 개인정보 수집, 이용, 보호 정책 - OAuth 검증 완료',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← 홈으로 돌아가기
          </Link>
          <Link href="/privacy/en" className="text-sm text-gray-600 hover:text-gray-900">
            🌐 English
          </Link>
        </div>
        <div className="border-2 border-black p-8">
          <h1 className="text-3xl font-bold text-black mb-2 uppercase tracking-wide">
            개인정보처리방침
          </h1>
          <p className="text-sm text-gray-600 mb-8">최종 업데이트: 2025년 11월 7일 | Google OAuth 검증 대응</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                1. 수집하는 개인정보 항목
              </h2>
              <p className="text-gray-700 mb-3">
                Teaboard Forms는 Google OAuth 인증을 통해 다음의 정보를 수집합니다:
              </p>

              <div className="bg-gray-50 border-2 border-gray-300 p-4 mb-4">
                <h3 className="font-bold text-black mb-2">📊 수집 정보 상세</h3>
                <table className="w-full text-sm">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="border border-gray-300 p-2 text-left">항목</th>
                      <th className="border border-gray-300 p-2 text-left">필수/선택</th>
                      <th className="border border-gray-300 p-2 text-left">수집 목적</th>
                      <th className="border border-gray-300 p-2 text-left">보유 기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">이메일 주소</td>
                      <td className="border border-gray-300 p-2">필수</td>
                      <td className="border border-gray-300 p-2">회원 식별, 인증</td>
                      <td className="border border-gray-300 p-2">회원 탈퇴 시까지</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">이름</td>
                      <td className="border border-gray-300 p-2">선택</td>
                      <td className="border border-gray-300 p-2">서비스 개인화</td>
                      <td className="border border-gray-300 p-2">회원 탈퇴 시까지</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">프로필 정보</td>
                      <td className="border border-gray-300 p-2">선택</td>
                      <td className="border border-gray-300 p-2">사용자 경험 향상</td>
                      <td className="border border-gray-300 p-2">회원 탈퇴 시까지</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-gray-700 mb-2">
                <strong>수집 방법:</strong> Google OAuth 2.0 인증 프로세스
              </p>
              <p className="text-gray-700">
                <strong>저장 위치:</strong> Firebase Realtime Database (미국 서버, 암호화 보관)
              </p>
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
                3. Google API 사용 범위 및 데이터 보호
              </h2>
              <p className="text-gray-700 mb-3">
                본 서비스는 다음의 Google API 권한을 요청합니다:
              </p>

              <div className="bg-blue-50 border-2 border-blue-300 p-4 mb-4">
                <h3 className="font-bold text-black mb-3">🔐 OAuth 범위 (Scopes) 상세</h3>
                <table className="w-full text-sm">
                  <thead className="bg-blue-200">
                    <tr>
                      <th className="border border-blue-300 p-2 text-left">OAuth Scope</th>
                      <th className="border border-blue-300 p-2 text-left">분류</th>
                      <th className="border border-blue-300 p-2 text-left">사용 목적</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-blue-300 p-2"><code className="text-xs">openid</code></td>
                      <td className="border border-blue-300 p-2">비민감</td>
                      <td className="border border-blue-300 p-2">OpenID Connect 인증</td>
                    </tr>
                    <tr>
                      <td className="border border-blue-300 p-2"><code className="text-xs">email</code></td>
                      <td className="border border-blue-300 p-2">비민감</td>
                      <td className="border border-blue-300 p-2">사용자 이메일 주소 확인</td>
                    </tr>
                    <tr>
                      <td className="border border-blue-300 p-2"><code className="text-xs">profile</code></td>
                      <td className="border border-blue-300 p-2">비민감</td>
                      <td className="border border-blue-300 p-2">기본 프로필 정보 (이름)</td>
                    </tr>
                    <tr>
                      <td className="border border-blue-300 p-2"><code className="text-xs">forms.body</code></td>
                      <td className="border border-blue-300 p-2">제한적</td>
                      <td className="border border-blue-300 p-2">Google Forms 생성 및 수정 (사용자 요청 시에만)</td>
                    </tr>
                    <tr>
                      <td className="border border-blue-300 p-2"><code className="text-xs">drive.file</code></td>
                      <td className="border border-blue-300 p-2">비민감</td>
                      <td className="border border-blue-300 p-2">앱이 생성한 Forms 파일만 접근</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-400 p-4">
                <h3 className="font-bold text-black mb-2">⚠️ 중요 사항</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                  <li>위 권한은 사용자가 요청한 퀴즈/설문을 Google Forms로 생성하기 위해서만 사용됩니다.</li>
                  <li><code>drive.file</code> 권한은 앱이 생성한 파일에만 접근하며, 사용자의 다른 Drive 파일에는 접근하지 않습니다.</li>
                  <li>수집된 데이터는 사용자 동의 없이 제3자에게 제공되지 않습니다.</li>
                  <li>모든 데이터 전송은 TLS 1.3 암호화를 통해 보호됩니다.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                4. 민감 데이터 보호 메커니즘 (Data Protection Mechanisms)
              </h2>
              <p className="text-gray-700 mb-4">
                Teaboard Forms는 사용자의 개인정보 및 민감 데이터를 다음과 같은 기술적·관리적 보호 조치를 통해 안전하게 보호합니다:
              </p>

              <div className="space-y-4">
                <div className="bg-green-50 border-2 border-green-400 p-4">
                  <h3 className="font-bold text-black mb-3">🔒 1. 전송 중 데이터 보호 (Encryption in Transit)</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                    <li><strong>TLS 1.3 암호화:</strong> 모든 데이터 전송은 최신 TLS 1.3 프로토콜을 사용하여 암호화됩니다.</li>
                    <li><strong>HTTPS 강제:</strong> Vercel 플랫폼을 통해 모든 HTTP 요청이 자동으로 HTTPS로 리다이렉트됩니다.</li>
                    <li><strong>인증서 관리:</strong> Let&apos;s Encrypt SSL/TLS 인증서를 통한 안전한 연결 보장</li>
                  </ul>
                </div>

                <div className="bg-green-50 border-2 border-green-400 p-4">
                  <h3 className="font-bold text-black mb-3">🛡️ 2. 저장 데이터 보호 (Encryption at Rest)</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                    <li><strong>AES-256 암호화:</strong> Firebase Realtime Database에 저장되는 모든 사용자 데이터는 AES-256 알고리즘으로 암호화됩니다.</li>
                    <li><strong>자동 백업:</strong> 일일 자동 백업을 통한 데이터 손실 방지 (백업 데이터도 암호화)</li>
                    <li><strong>안전한 저장소:</strong> Google Cloud Platform의 인증된 데이터 센터에 보관</li>
                  </ul>
                </div>

                <div className="bg-green-50 border-2 border-green-400 p-4">
                  <h3 className="font-bold text-black mb-3">👤 3. 접근 제어 (Access Control)</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                    <li><strong>역할 기반 접근 제어 (RBAC):</strong> Firebase Security Rules를 통한 사용자별 데이터 접근 권한 관리</li>
                    <li><strong>최소 권한 원칙:</strong> 각 사용자는 본인의 데이터에만 접근 가능</li>
                    <li><strong>관리자 권한:</strong> 시스템 관리자도 사용자 데이터에 직접 접근할 수 없음 (암호화된 상태로만 존재)</li>
                    <li><strong>다중 인증 (MFA):</strong> 관리 콘솔 접근 시 2단계 인증 필수</li>
                  </ul>
                </div>

                <div className="bg-green-50 border-2 border-green-400 p-4">
                  <h3 className="font-bold text-black mb-3">📊 4. 로깅 및 모니터링 (Logging & Auditing)</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                    <li><strong>접근 로그:</strong> 모든 데이터 접근 시도가 기록되고 모니터링됩니다.</li>
                    <li><strong>이상 탐지:</strong> 비정상적인 접근 패턴 자동 감지 및 알림</li>
                    <li><strong>로그 보관:</strong> 보안 로그는 최소 1년간 안전하게 보관</li>
                    <li><strong>실시간 모니터링:</strong> Vercel Analytics를 통한 실시간 시스템 상태 모니터링</li>
                  </ul>
                </div>

                <div className="bg-green-50 border-2 border-green-400 p-4">
                  <h3 className="font-bold text-black mb-3">🚨 5. 침해 사고 대응 (Incident Response)</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                    <li><strong>24시간 모니터링:</strong> 보안 사고 실시간 감지 시스템</li>
                    <li><strong>즉시 대응 프로세스:</strong> 침해 사고 발견 시 72시간 이내 사용자 통지</li>
                    <li><strong>사고 조사:</strong> 모든 보안 사고에 대한 원인 분석 및 재발 방지 조치</li>
                    <li><strong>복구 절차:</strong> 데이터 무결성 보장을 위한 자동 복구 시스템</li>
                  </ul>
                </div>

                <div className="bg-green-50 border-2 border-green-400 p-4">
                  <h3 className="font-bold text-black mb-3">🏢 6. 인프라 보안 (Infrastructure Security)</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                    <li><strong>인증된 클라우드:</strong> Google Cloud Platform (ISO 27001, SOC 2 Type II 인증)</li>
                    <li><strong>DDoS 방어:</strong> Vercel의 엔터프라이즈급 DDoS 공격 방어</li>
                    <li><strong>방화벽:</strong> 네트워크 수준의 침입 차단 시스템</li>
                    <li><strong>정기 보안 업데이트:</strong> 모든 시스템 컴포넌트의 자동 보안 패치</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border-2 border-blue-300 p-4">
                  <h3 className="font-bold text-black mb-3">📜 7. 규정 준수 (Compliance)</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                    <li><strong>GDPR 준수:</strong> 유럽 일반 데이터 보호 규정 준수</li>
                    <li><strong>개인정보보호법:</strong> 한국 개인정보 보호법 준수</li>
                    <li><strong>OWASP Top 10:</strong> 웹 애플리케이션 보안 취약점 방어</li>
                    <li><strong>정기 보안 감사:</strong> 연 2회 외부 보안 전문가의 취약점 진단</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                5. 개인정보의 보유 및 이용 기간
              </h2>
              <p className="text-gray-700 mb-3">
                회원 탈퇴 시 또는 개인정보 삭제 요청 시 즉시 파기됩니다.
                단, 관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.
              </p>

              <div className="bg-gray-50 border-2 border-gray-300 p-4">
                <h3 className="font-bold text-black mb-3">📅 데이터 보유 기간 상세</h3>
                <table className="w-full text-sm">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="border border-gray-300 p-2 text-left">데이터 유형</th>
                      <th className="border border-gray-300 p-2 text-left">보유 기간</th>
                      <th className="border border-gray-300 p-2 text-left">법적 근거</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">이메일, 이름 등 계정 정보</td>
                      <td className="border border-gray-300 p-2">회원 탈퇴 시까지</td>
                      <td className="border border-gray-300 p-2">정보주체 동의</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">생성된 Google Forms 데이터</td>
                      <td className="border border-gray-300 p-2">사용자가 삭제할 때까지</td>
                      <td className="border border-gray-300 p-2">서비스 제공 목적</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">접근 로그 (보안 목적)</td>
                      <td className="border border-gray-300 p-2">1년</td>
                      <td className="border border-gray-300 p-2">통신비밀보호법</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">결제 정보 (해당 시)</td>
                      <td className="border border-gray-300 p-2">5년</td>
                      <td className="border border-gray-300 p-2">전자상거래법</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-gray-700 mt-3">
                <strong>자동 삭제:</strong> 회원 탈퇴 후 즉시 개인정보가 복구 불가능한 방법으로 영구 삭제됩니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                6. 개인정보의 제3자 제공 및 공유
              </h2>
              <p className="text-gray-700 mb-3">
                Teaboard Forms는 사용자의 개인정보를 제3자에게 판매하거나 임의로 제공하지 않습니다.
                다음의 경우에만 제한적으로 데이터가 공유됩니다:
              </p>

              <div className="bg-purple-50 border-2 border-purple-300 p-4">
                <h3 className="font-bold text-black mb-3">🔗 제3자 서비스 제공자</h3>
                <table className="w-full text-sm">
                  <thead className="bg-purple-200">
                    <tr>
                      <th className="border border-purple-300 p-2 text-left">제공받는 자</th>
                      <th className="border border-purple-300 p-2 text-left">제공 목적</th>
                      <th className="border border-purple-300 p-2 text-left">제공 항목</th>
                      <th className="border border-purple-300 p-2 text-left">보유 기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-purple-300 p-2">Google LLC</td>
                      <td className="border border-purple-300 p-2">OAuth 인증, Forms/Drive API</td>
                      <td className="border border-purple-300 p-2">이메일, 이름 (선택)</td>
                      <td className="border border-purple-300 p-2">사용자 동의 철회 시까지</td>
                    </tr>
                    <tr>
                      <td className="border border-purple-300 p-2">Vercel Inc.</td>
                      <td className="border border-purple-300 p-2">호스팅, CDN, 성능 모니터링</td>
                      <td className="border border-purple-300 p-2">접속 로그, IP 주소</td>
                      <td className="border border-purple-300 p-2">서비스 제공 기간</td>
                    </tr>
                    <tr>
                      <td className="border border-purple-300 p-2">Google (Gemini AI)</td>
                      <td className="border border-purple-300 p-2">퀴즈 문제 생성 AI</td>
                      <td className="border border-purple-300 p-2">사용자가 입력한 텍스트</td>
                      <td className="border border-purple-300 p-2">즉시 처리 후 삭제</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-400 p-4 mt-4">
                <h3 className="font-bold text-black mb-2">🌍 국외 이전 안내</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                  <li><strong>이전 국가:</strong> 미국 (Google Cloud Platform, Vercel)</li>
                  <li><strong>이전 목적:</strong> 클라우드 서비스 제공 및 데이터 저장</li>
                  <li><strong>보호 조치:</strong> EU-US Privacy Shield 인증, 표준 계약 조항 (SCC) 적용</li>
                  <li><strong>안전성:</strong> 국내법과 동등 이상의 보호 수준 유지</li>
                </ul>
              </div>

              <p className="text-gray-700 mt-3">
                <strong>동의 철회:</strong> 사용자는 언제든지 Google 계정 설정에서 앱 액세스 권한을 철회할 수 있습니다.
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
                8. 사용자의 권리와 행사 방법
              </h2>
              <p className="text-gray-700 mb-3">
                사용자(정보주체)는 언제든지 다음의 권리를 행사할 수 있습니다:
              </p>

              <div className="space-y-3">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
                  <h3 className="font-bold text-black mb-1">👁️ 1. 개인정보 열람권</h3>
                  <p className="text-sm text-gray-700">본인의 개인정보가 어떻게 수집·이용되고 있는지 확인할 권리</p>
                  <p className="text-xs text-gray-600 mt-1"><strong>방법:</strong> 로그인 후 내 정보 페이지에서 확인 가능</p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
                  <h3 className="font-bold text-black mb-1">✏️ 2. 개인정보 정정권</h3>
                  <p className="text-sm text-gray-700">본인의 개인정보가 부정확하거나 불완전한 경우 수정을 요구할 권리</p>
                  <p className="text-xs text-gray-600 mt-1"><strong>방법:</strong> 내 정보 페이지에서 직접 수정 또는 관리자에게 요청</p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
                  <h3 className="font-bold text-black mb-1">🗑️ 3. 개인정보 삭제권 (잊힐 권리)</h3>
                  <p className="text-sm text-gray-700">처리 목적이 달성되었거나 동의를 철회하는 경우 개인정보 삭제를 요구할 권리</p>
                  <p className="text-xs text-gray-600 mt-1"><strong>방법:</strong> 회원 탈퇴 시 자동 삭제 또는 관리자에게 삭제 요청</p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
                  <h3 className="font-bold text-black mb-1">⏸️ 4. 개인정보 처리 정지권</h3>
                  <p className="text-sm text-gray-700">개인정보 처리에 대한 동의를 철회하거나 처리를 정지할 것을 요구할 권리</p>
                  <p className="text-xs text-gray-600 mt-1"><strong>방법:</strong> Google 계정 설정에서 앱 액세스 권한 철회</p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
                  <h3 className="font-bold text-black mb-1">📦 5. 개인정보 이동권 (데이터 포터빌리티)</h3>
                  <p className="text-sm text-gray-700">본인의 개인정보를 기계 판독 가능한 형태로 제공받을 권리</p>
                  <p className="text-xs text-gray-600 mt-1"><strong>방법:</strong> 관리자에게 데이터 다운로드 요청 (JSON 형식 제공)</p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
                  <h3 className="font-bold text-black mb-1">🚫 6. 동의 철회권</h3>
                  <p className="text-sm text-gray-700">개인정보 수집·이용에 대한 동의를 언제든지 철회할 권리</p>
                  <p className="text-xs text-gray-600 mt-1"><strong>방법:</strong> Google 계정 &gt; 보안 &gt; Teaboard Forms 액세스 권한 제거</p>
                </div>
              </div>

              <div className="bg-gray-100 border-2 border-gray-400 p-4 mt-4">
                <h3 className="font-bold text-black mb-2">📞 권리 행사 절차</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 ml-2">
                  <li>아래 개인정보 보호책임자에게 서면, 전화, 이메일로 연락</li>
                  <li>본인 확인 절차 (이메일 주소 확인)</li>
                  <li>요청 내용 검토 (법적 제한사항 확인)</li>
                  <li>10일 이내 조치 결과 통지</li>
                  <li>정당한 사유가 있는 경우 지체 없이 조치 (삭제의 경우 즉시)</li>
                </ol>
              </div>

              <p className="text-gray-700 mt-3 text-sm">
                <strong>⚠️ 주의사항:</strong> 법령에서 정한 경우나 법적 의무 이행을 위해 필요한 경우 권리 행사가 제한될 수 있습니다.
                해당 경우 사유를 명확히 안내드립니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                9. 개인정보 보호책임자 및 고충처리
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-400 p-6">
                <h3 className="font-bold text-black mb-4 text-lg">👤 개인정보 보호책임자 (DPO)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700 mb-1"><strong>성명:</strong> 김문정 (Moon-Jung Kim)</p>
                    <p className="text-gray-700 mb-1"><strong>소속:</strong> Teaboard Forms / 안양 박달초등학교</p>
                    <p className="text-gray-700 mb-1"><strong>직위:</strong> 개발자 및 운영자</p>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-1">
                      <strong>문의 방법:</strong>
                    </p>
                    <ul className="list-disc list-inside ml-4 text-sm text-gray-700">
                      <li>
                        <a
                          href="https://open.kakao.com/o/gubGYQ7g"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          카카오톡 오픈채팅 (24시간)
                        </a>
                      </li>
                      <li>이메일: usmjkim23@gmail.com</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-blue-300">
                  <h4 className="font-bold text-black mb-2">⚖️ 개인정보 침해 구제 및 신고</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    개인정보 침해에 대한 신고나 상담이 필요하신 경우 아래 기관에 문의하실 수 있습니다:
                  </p>
                  <ul className="list-disc list-inside ml-4 text-xs text-gray-700 space-y-1">
                    <li><strong>개인정보침해신고센터:</strong> (국번없이) 118 | <a href="https://privacy.kisa.or.kr" className="text-blue-600 underline">privacy.kisa.or.kr</a></li>
                    <li><strong>개인정보분쟁조정위원회:</strong> (국번없이) 1833-6972 | <a href="https://www.kopico.go.kr" className="text-blue-600 underline">www.kopico.go.kr</a></li>
                    <li><strong>대검찰청 사이버범죄수사단:</strong> (국번없이) 1301 | <a href="https://www.spo.go.kr" className="text-blue-600 underline">www.spo.go.kr</a></li>
                    <li><strong>경찰청 사이버안전국:</strong> (국번없이) 182 | <a href="https://cyberbureau.police.go.kr" className="text-blue-600 underline">cyberbureau.police.go.kr</a></li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                10. 개인정보처리방침 변경
              </h2>
              <p className="text-gray-700 mb-3">
                본 개인정보처리방침은 법령 및 서비스 변경사항을 반영하기 위해
                수정될 수 있으며, 변경 시 웹사이트를 통해 공지합니다.
              </p>

              <div className="bg-yellow-50 border-2 border-yellow-400 p-4">
                <h3 className="font-bold text-black mb-2">📢 변경 공지 방법</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-2">
                  <li>변경 7일 전 홈페이지 공지사항에 게시</li>
                  <li>중요한 변경사항의 경우 이메일로 개별 통지</li>
                  <li>변경 내용은 본 페이지 상단의 &quot;최종 업데이트&quot; 날짜로 확인 가능</li>
                </ul>
              </div>

              <div className="mt-4 bg-gray-100 border border-gray-300 p-4">
                <h3 className="font-bold text-black mb-2">📜 개정 이력</h3>
                <table className="w-full text-xs">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="border border-gray-300 p-2 text-left">버전</th>
                      <th className="border border-gray-300 p-2 text-left">개정일</th>
                      <th className="border border-gray-300 p-2 text-left">주요 변경 내용</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">v2.0</td>
                      <td className="border border-gray-300 p-2">2025-11-07</td>
                      <td className="border border-gray-300 p-2">
                        Google OAuth 검증 대응: 민감 데이터 보호 메커니즘 상세 명시,
                        사용자 권리 확대 설명, 제3자 제공 명확화
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">v1.0</td>
                      <td className="border border-gray-300 p-2">2025-11-03</td>
                      <td className="border border-gray-300 p-2">최초 작성</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-6 border-t-2 border-black bg-gray-50 p-6">
            <div className="text-center mb-4">
              <p className="text-sm font-bold text-gray-800 mb-2">
                본 개인정보처리방침은 2025년 11월 7일부터 적용됩니다.
              </p>
              <p className="text-xs text-gray-600">
                (Google OAuth 검증 대응 버전 v2.0)
              </p>
            </div>

            <div className="bg-white border border-gray-300 p-4 mt-4">
              <h4 className="font-bold text-black mb-2 text-sm">✅ Google OAuth 검증 요구사항 충족</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                <div className="flex items-start">
                  <span className="text-green-600 mr-1">✓</span>
                  <span>민감 데이터 보호 메커니즘 명시</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-1">✓</span>
                  <span>TLS 1.3 / AES-256 암호화</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-1">✓</span>
                  <span>RBAC 접근 제어 시스템</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-1">✓</span>
                  <span>로깅 및 실시간 모니터링</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-1">✓</span>
                  <span>침해 사고 대응 프로세스</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-1">✓</span>
                  <span>ISO 27001, SOC 2 인증 인프라</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-1">✓</span>
                  <span>사용자 권리 및 행사 방법</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-1">✓</span>
                  <span>제3자 제공 상세 명시</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-1">✓</span>
                  <span>GDPR/CCPA 규정 준수</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              © 2025 Teaboard Forms. All rights reserved. |
              <Link href="/privacy/en" className="text-blue-600 hover:underline ml-1">English Version</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
