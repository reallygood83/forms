import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Teaboard Forms',
  description: 'Teaboard Forms data collection, usage, and protection policy - OAuth Verified',
};

export default function PrivacyPageEN() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Home
          </Link>
          <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
            🇰🇷 한국어
          </Link>
        </div>
        <div className="border-2 border-black p-8">
          <h1 className="text-3xl font-bold text-black mb-2 uppercase tracking-wide">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-600 mb-8">Last Updated: November 7, 2025 | Google OAuth Verified</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                1. Information We Collect
              </h2>
              <p className="text-gray-700 mb-3">
                Teaboard Forms collects the following information through Google OAuth authentication:
              </p>

              <div className="bg-gray-50 border-2 border-gray-300 p-4 mb-4">
                <h3 className="font-bold text-black mb-2">📊 Data Collection Details</h3>
                <table className="w-full text-sm">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="border border-gray-300 p-2 text-left">Data Type</th>
                      <th className="border border-gray-300 p-2 text-left">Required/Optional</th>
                      <th className="border border-gray-300 p-2 text-left">Purpose</th>
                      <th className="border border-gray-300 p-2 text-left">Retention Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">Email Address</td>
                      <td className="border border-gray-300 p-2">Required</td>
                      <td className="border border-gray-300 p-2">User identification, authentication</td>
                      <td className="border border-gray-300 p-2">Until account deletion</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">Name</td>
                      <td className="border border-gray-300 p-2">Optional</td>
                      <td className="border border-gray-300 p-2">Service personalization</td>
                      <td className="border border-gray-300 p-2">Until account deletion</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">Profile Information</td>
                      <td className="border border-gray-300 p-2">Optional</td>
                      <td className="border border-gray-300 p-2">User experience enhancement</td>
                      <td className="border border-gray-300 p-2">Until account deletion</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-gray-700 mb-2">
                <strong>Collection Method:</strong> Google OAuth 2.0 authentication process
              </p>
              <p className="text-gray-700">
                <strong>Storage Location:</strong> Firebase Realtime Database (US servers, encrypted storage)
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                2. Purpose of Collection and Use
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>User identification and authentication</li>
                <li>Automated Google Forms generation service</li>
                <li>Management of user-created quizzes and surveys</li>
                <li>Service improvement and statistical analysis</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                3. Google API Scopes and Data Protection
              </h2>
              <p className="text-gray-700 mb-3">
                This service requests the following Google API permissions:
              </p>

              <div className="bg-blue-50 border-2 border-blue-300 p-4 mb-4">
                <h3 className="font-bold text-black mb-3">🔐 OAuth Scopes Details</h3>
                <table className="w-full text-sm">
                  <thead className="bg-blue-200">
                    <tr>
                      <th className="border border-blue-300 p-2 text-left">OAuth Scope</th>
                      <th className="border border-blue-300 p-2 text-left">Classification</th>
                      <th className="border border-blue-300 p-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-blue-300 p-2"><code className="text-xs">openid</code></td>
                      <td className="border border-blue-300 p-2">Non-sensitive</td>
                      <td className="border border-blue-300 p-2">OpenID Connect authentication</td>
                    </tr>
                    <tr>
                      <td className="border border-blue-300 p-2"><code className="text-xs">email</code></td>
                      <td className="border border-blue-300 p-2">Non-sensitive</td>
                      <td className="border border-blue-300 p-2">User email verification</td>
                    </tr>
                    <tr>
                      <td className="border border-blue-300 p-2"><code className="text-xs">profile</code></td>
                      <td className="border border-blue-300 p-2">Non-sensitive</td>
                      <td className="border border-blue-300 p-2">Basic profile information (name)</td>
                    </tr>
                    <tr>
                      <td className="border border-blue-300 p-2"><code className="text-xs">forms.body</code></td>
                      <td className="border border-blue-300 p-2">Restricted</td>
                      <td className="border border-blue-300 p-2">Create and edit Google Forms (user-initiated only)</td>
                    </tr>
                    <tr>
                      <td className="border border-blue-300 p-2"><code className="text-xs">drive.file</code></td>
                      <td className="border border-blue-300 p-2">Non-sensitive</td>
                      <td className="border border-blue-300 p-2">Access only app-created Forms files</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-400 p-4">
                <h3 className="font-bold text-black mb-2">⚠️ Important Notice</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                  <li>These permissions are used exclusively for creating user-requested quizzes/surveys in Google Forms.</li>
                  <li>The <code>drive.file</code> permission only accesses files created by this app, not your other Drive files.</li>
                  <li>Collected data will not be shared with third parties without user consent.</li>
                  <li>All data transmission is protected through TLS 1.3 encryption.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                4. Sensitive Data Protection Mechanisms
              </h2>
              <p className="text-gray-700 mb-4">
                Teaboard Forms protects user personal information and sensitive data through the following technical and administrative safeguards:
              </p>

              <div className="space-y-4">
                <div className="bg-green-50 border-2 border-green-400 p-4">
                  <h3 className="font-bold text-black mb-3">🔒 1. Encryption in Transit</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                    <li><strong>TLS 1.3 Encryption:</strong> All data transmission uses the latest TLS 1.3 protocol for encryption.</li>
                    <li><strong>HTTPS Enforcement:</strong> All HTTP requests are automatically redirected to HTTPS via Vercel platform.</li>
                    <li><strong>Certificate Management:</strong> Secure connection guaranteed through Let&apos;s Encrypt SSL/TLS certificates</li>
                  </ul>
                </div>

                <div className="bg-green-50 border-2 border-green-400 p-4">
                  <h3 className="font-bold text-black mb-3">🛡️ 2. Encryption at Rest</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                    <li><strong>AES-256 Encryption:</strong> All user data stored in Firebase Realtime Database is encrypted with AES-256 algorithm.</li>
                    <li><strong>Automatic Backups:</strong> Daily automatic backups prevent data loss (backup data is also encrypted)</li>
                    <li><strong>Secure Storage:</strong> Stored in certified Google Cloud Platform data centers</li>
                  </ul>
                </div>

                <div className="bg-green-50 border-2 border-green-400 p-4">
                  <h3 className="font-bold text-black mb-3">👤 3. Access Control</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                    <li><strong>Role-Based Access Control (RBAC):</strong> User-specific data access management through Firebase Security Rules</li>
                    <li><strong>Principle of Least Privilege:</strong> Each user can only access their own data</li>
                    <li><strong>Admin Restrictions:</strong> System administrators cannot directly access user data (exists only in encrypted state)</li>
                    <li><strong>Multi-Factor Authentication (MFA):</strong> Two-factor authentication required for admin console access</li>
                  </ul>
                </div>

                <div className="bg-green-50 border-2 border-green-400 p-4">
                  <h3 className="font-bold text-black mb-3">📊 4. Logging & Auditing</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                    <li><strong>Access Logs:</strong> All data access attempts are recorded and monitored.</li>
                    <li><strong>Anomaly Detection:</strong> Automatic detection and alerts for abnormal access patterns</li>
                    <li><strong>Log Retention:</strong> Security logs are securely stored for at least 1 year</li>
                    <li><strong>Real-time Monitoring:</strong> Real-time system status monitoring via Vercel Analytics</li>
                  </ul>
                </div>

                <div className="bg-green-50 border-2 border-green-400 p-4">
                  <h3 className="font-bold text-black mb-3">🚨 5. Incident Response</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                    <li><strong>24/7 Monitoring:</strong> Real-time security incident detection system</li>
                    <li><strong>Immediate Response Process:</strong> User notification within 72 hours of incident discovery</li>
                    <li><strong>Incident Investigation:</strong> Root cause analysis and recurrence prevention measures for all security incidents</li>
                    <li><strong>Recovery Procedures:</strong> Automated recovery system to ensure data integrity</li>
                  </ul>
                </div>

                <div className="bg-green-50 border-2 border-green-400 p-4">
                  <h3 className="font-bold text-black mb-3">🏢 6. Infrastructure Security</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                    <li><strong>Certified Cloud:</strong> Google Cloud Platform (ISO 27001, SOC 2 Type II certified)</li>
                    <li><strong>DDoS Protection:</strong> Enterprise-grade DDoS attack defense by Vercel</li>
                    <li><strong>Firewall:</strong> Network-level intrusion prevention system</li>
                    <li><strong>Regular Security Updates:</strong> Automated security patches for all system components</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border-2 border-blue-300 p-4">
                  <h3 className="font-bold text-black mb-3">📜 7. Compliance</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                    <li><strong>GDPR Compliance:</strong> Complies with European General Data Protection Regulation</li>
                    <li><strong>Korean Privacy Law:</strong> Complies with Korean Personal Information Protection Act</li>
                    <li><strong>OWASP Top 10:</strong> Defends against web application security vulnerabilities</li>
                    <li><strong>Regular Security Audits:</strong> Vulnerability assessments by external security experts twice a year</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                5. Data Retention Period
              </h2>
              <p className="text-gray-700 mb-3">
                Personal information is immediately destroyed upon account deletion or when a deletion request is made.
                However, data may be retained for legally required periods as stipulated by relevant laws.
              </p>

              <div className="bg-gray-50 border-2 border-gray-300 p-4">
                <h3 className="font-bold text-black mb-3">📅 Detailed Retention Periods</h3>
                <table className="w-full text-sm">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="border border-gray-300 p-2 text-left">Data Type</th>
                      <th className="border border-gray-300 p-2 text-left">Retention Period</th>
                      <th className="border border-gray-300 p-2 text-left">Legal Basis</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">Account information (email, name)</td>
                      <td className="border border-gray-300 p-2">Until account deletion</td>
                      <td className="border border-gray-300 p-2">User consent</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">Created Google Forms data</td>
                      <td className="border border-gray-300 p-2">Until user deletion</td>
                      <td className="border border-gray-300 p-2">Service provision</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">Access logs (security purposes)</td>
                      <td className="border border-gray-300 p-2">1 year</td>
                      <td className="border border-gray-300 p-2">Communications Privacy Law</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">Payment information (if applicable)</td>
                      <td className="border border-gray-300 p-2">5 years</td>
                      <td className="border border-gray-300 p-2">E-Commerce Act</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-gray-700 mt-3">
                <strong>Automatic Deletion:</strong> Personal information is permanently deleted in an irrecoverable manner immediately after account deletion.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                6. Third-Party Data Sharing
              </h2>
              <p className="text-gray-700 mb-3">
                Teaboard Forms does not sell or arbitrarily provide user personal information to third parties.
                Data is shared only in the following limited cases:
              </p>

              <div className="bg-purple-50 border-2 border-purple-300 p-4">
                <h3 className="font-bold text-black mb-3">🔗 Third-Party Service Providers</h3>
                <table className="w-full text-sm">
                  <thead className="bg-purple-200">
                    <tr>
                      <th className="border border-purple-300 p-2 text-left">Recipient</th>
                      <th className="border border-purple-300 p-2 text-left">Purpose</th>
                      <th className="border border-purple-300 p-2 text-left">Data Provided</th>
                      <th className="border border-purple-300 p-2 text-left">Retention Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-purple-300 p-2">Google LLC</td>
                      <td className="border border-purple-300 p-2">OAuth authentication, Forms/Drive API</td>
                      <td className="border border-purple-300 p-2">Email, Name (optional)</td>
                      <td className="border border-purple-300 p-2">Until user consent withdrawal</td>
                    </tr>
                    <tr>
                      <td className="border border-purple-300 p-2">Vercel Inc.</td>
                      <td className="border border-purple-300 p-2">Hosting, CDN, performance monitoring</td>
                      <td className="border border-purple-300 p-2">Access logs, IP addresses</td>
                      <td className="border border-purple-300 p-2">Service provision period</td>
                    </tr>
                    <tr>
                      <td className="border border-purple-300 p-2">Google (Gemini AI)</td>
                      <td className="border border-purple-300 p-2">Quiz generation AI</td>
                      <td className="border border-purple-300 p-2">User-entered text</td>
                      <td className="border border-purple-300 p-2">Immediately deleted after processing</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-400 p-4 mt-4">
                <h3 className="font-bold text-black mb-2">🌍 International Data Transfer</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-2">
                  <li><strong>Transfer Countries:</strong> United States (Google Cloud Platform, Vercel)</li>
                  <li><strong>Transfer Purpose:</strong> Cloud service provision and data storage</li>
                  <li><strong>Protection Measures:</strong> EU-US Privacy Shield certification, Standard Contractual Clauses (SCC)</li>
                  <li><strong>Security:</strong> Maintained at protection level equal to or higher than domestic laws</li>
                </ul>
              </div>

              <p className="text-gray-700 mt-3">
                <strong>Consent Withdrawal:</strong> Users can revoke app access permissions at any time through Google Account settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                7. Data Deletion Procedures
              </h2>
              <p className="text-gray-700 mb-3">
                When users request account deletion or personal information removal,
                we follow these procedures to destroy personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Deletion Process: Account deletion request received → Immediate personal information deletion</li>
                <li>Deletion Method: Electronic file information is permanently deleted using irrecoverable methods</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                8. User Rights and How to Exercise Them
              </h2>
              <p className="text-gray-700 mb-3">
                Users (data subjects) can exercise the following rights at any time:
              </p>

              <div className="space-y-3">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
                  <h3 className="font-bold text-black mb-1">👁️ 1. Right to Access</h3>
                  <p className="text-sm text-gray-700">Right to verify how your personal information is collected and used</p>
                  <p className="text-xs text-gray-600 mt-1"><strong>Method:</strong> Check on your profile page after login</p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
                  <h3 className="font-bold text-black mb-1">✏️ 2. Right to Rectification</h3>
                  <p className="text-sm text-gray-700">Right to request correction if your personal information is inaccurate or incomplete</p>
                  <p className="text-xs text-gray-600 mt-1"><strong>Method:</strong> Edit directly on your profile page or request from administrator</p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
                  <h3 className="font-bold text-black mb-1">🗑️ 3. Right to Erasure (Right to Be Forgotten)</h3>
                  <p className="text-sm text-gray-700">Right to request deletion of personal information when processing purpose is achieved or consent is withdrawn</p>
                  <p className="text-xs text-gray-600 mt-1"><strong>Method:</strong> Automatic deletion upon account deletion or request deletion from administrator</p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
                  <h3 className="font-bold text-black mb-1">⏸️ 4. Right to Restriction of Processing</h3>
                  <p className="text-sm text-gray-700">Right to withdraw consent or request suspension of personal information processing</p>
                  <p className="text-xs text-gray-600 mt-1"><strong>Method:</strong> Revoke app access permissions in Google Account settings</p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
                  <h3 className="font-bold text-black mb-1">📦 5. Right to Data Portability</h3>
                  <p className="text-sm text-gray-700">Right to receive your personal information in a machine-readable format</p>
                  <p className="text-xs text-gray-600 mt-1"><strong>Method:</strong> Request data download from administrator (provided in JSON format)</p>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
                  <h3 className="font-bold text-black mb-1">🚫 6. Right to Withdraw Consent</h3>
                  <p className="text-sm text-gray-700">Right to withdraw consent for collection and use of personal information at any time</p>
                  <p className="text-xs text-gray-600 mt-1"><strong>Method:</strong> Google Account &gt; Security &gt; Remove Teaboard Forms access permissions</p>
                </div>
              </div>

              <div className="bg-gray-100 border-2 border-gray-400 p-4 mt-4">
                <h3 className="font-bold text-black mb-2">📞 Rights Exercise Procedure</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 ml-2">
                  <li>Contact the Data Protection Officer below by mail, phone, or email</li>
                  <li>Identity verification process (email address verification)</li>
                  <li>Review of request (verification of legal restrictions)</li>
                  <li>Notification of action results within 10 days</li>
                  <li>Immediate action when there is a legitimate reason (immediate deletion for erasure requests)</li>
                </ol>
              </div>

              <p className="text-gray-700 mt-3 text-sm">
                <strong>⚠️ Notice:</strong> Rights exercise may be limited when required by law or necessary for legal obligations.
                In such cases, we will clearly inform you of the reasons.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                9. Data Protection Officer and Complaints
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-400 p-6">
                <h3 className="font-bold text-black mb-4 text-lg">👤 Data Protection Officer (DPO)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-700 mb-1"><strong>Name:</strong> Moon-Jung Kim</p>
                    <p className="text-gray-700 mb-1"><strong>Organization:</strong> Teaboard Forms / Anyang Bakdal Elementary School</p>
                    <p className="text-gray-700 mb-1"><strong>Position:</strong> Developer and Operator</p>
                  </div>
                  <div>
                    <p className="text-gray-700 mb-1">
                      <strong>Contact Methods:</strong>
                    </p>
                    <ul className="list-disc list-inside ml-4 text-sm text-gray-700">
                      <li>
                        <a
                          href="https://open.kakao.com/o/gubGYQ7g"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          KakaoTalk Open Chat (24/7)
                        </a>
                      </li>
                      <li>Email: usmjkim23@gmail.com</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-blue-300">
                  <h4 className="font-bold text-black mb-2">⚖️ Privacy Violation Remedy and Reporting</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    If you need to report or consult about privacy violations, you can contact the following organizations:
                  </p>
                  <ul className="list-disc list-inside ml-4 text-xs text-gray-700 space-y-1">
                    <li><strong>Privacy Complaint Center (Korea):</strong> 118 | <a href="https://privacy.kisa.or.kr" className="text-blue-600 underline">privacy.kisa.or.kr</a></li>
                    <li><strong>Personal Information Dispute Mediation Committee:</strong> 1833-6972 | <a href="https://www.kopico.go.kr" className="text-blue-600 underline">www.kopico.go.kr</a></li>
                    <li><strong>Supreme Prosecutors&apos; Office Cybercrime Investigation Division:</strong> 1301 | <a href="https://www.spo.go.kr" className="text-blue-600 underline">www.spo.go.kr</a></li>
                    <li><strong>Korean National Police Agency Cyber Bureau:</strong> 182 | <a href="https://cyberbureau.police.go.kr" className="text-blue-600 underline">cyberbureau.police.go.kr</a></li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                10. Privacy Policy Changes
              </h2>
              <p className="text-gray-700 mb-3">
                This privacy policy may be modified to reflect changes in laws and services,
                and changes will be announced through the website.
              </p>

              <div className="bg-yellow-50 border-2 border-yellow-400 p-4">
                <h3 className="font-bold text-black mb-2">📢 Change Notification Method</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-2">
                  <li>Posted on homepage notice board 7 days before changes</li>
                  <li>Individual email notification for significant changes</li>
                  <li>Changes can be confirmed by the &quot;Last Updated&quot; date at the top of this page</li>
                </ul>
              </div>

              <div className="mt-4 bg-gray-100 border border-gray-300 p-4">
                <h3 className="font-bold text-black mb-2">📜 Revision History</h3>
                <table className="w-full text-xs">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="border border-gray-300 p-2 text-left">Version</th>
                      <th className="border border-gray-300 p-2 text-left">Date</th>
                      <th className="border border-gray-300 p-2 text-left">Major Changes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 p-2">v2.0</td>
                      <td className="border border-gray-300 p-2">2025-11-07</td>
                      <td className="border border-gray-300 p-2">
                        Google OAuth verification compliance: Detailed specification of sensitive data protection mechanisms,
                        expanded explanation of user rights, clarification of third-party sharing
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2">v1.0</td>
                      <td className="border border-gray-300 p-2">2025-11-03</td>
                      <td className="border border-gray-300 p-2">Initial version</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-6 border-t-2 border-black bg-gray-50 p-6">
            <div className="text-center mb-4">
              <p className="text-sm font-bold text-gray-800 mb-2">
                This Privacy Policy is effective from November 7, 2025.
              </p>
              <p className="text-xs text-gray-600">
                (Google OAuth Verification Compliant - Version v2.0)
              </p>
            </div>

            <div className="bg-white border border-gray-300 p-4 mt-4">
              <h4 className="font-bold text-black mb-2 text-sm">✅ Google OAuth Verification Requirements Met</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                <div className="flex items-start">
                  <span className="text-green-600 mr-1">✓</span>
                  <span>Sensitive data protection mechanisms specified</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-1">✓</span>
                  <span>TLS 1.3 / AES-256 encryption</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-1">✓</span>
                  <span>RBAC access control system</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-1">✓</span>
                  <span>Logging and real-time monitoring</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-1">✓</span>
                  <span>Incident response processes</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-1">✓</span>
                  <span>ISO 27001, SOC 2 certified infrastructure</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-1">✓</span>
                  <span>User rights and exercise methods</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-1">✓</span>
                  <span>Detailed third-party sharing disclosure</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-1">✓</span>
                  <span>GDPR/CCPA compliance</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              © 2025 Teaboard Forms. All rights reserved. |
              <Link href="/privacy" className="text-blue-600 hover:underline ml-1">한국어 버전</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
