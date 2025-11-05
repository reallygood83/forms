/**
 * Google Forms API Utility
 *
 * 2026년 3월 31일부터 Forms API로 생성된 폼은 기본적으로 비공개 상태입니다.
 * 이 유틸리티는 폼을 생성한 후 자동으로 발행(publish) 처리합니다.
 *
 * @see https://developers.google.com/forms/api/guides/publishing
 */

import { google } from 'googleapis';
import type { forms_v1 } from 'googleapis';

type OAuth2Client = InstanceType<typeof google.auth.OAuth2>;

/**
 * Google Forms를 발행(publish) 상태로 설정합니다.
 * 2026년 3월 31일 이후 필수적으로 호출해야 합니다.
 *
 * @param formId - 발행할 Google Forms ID
 * @param oauth2Client - Google OAuth2 클라이언트
 * @throws {Error} 발행 실패 시 에러 발생
 */
export async function publishForm(
  formId: string,
  oauth2Client: OAuth2Client
): Promise<void> {
  const forms = google.forms({ version: 'v1', auth: oauth2Client });

  try {
    await forms.forms.setPublishSettings({
      formId: formId,
      requestBody: {
        publishSettings: {
          publishState: {
            isPublished: true,
            isAcceptingResponses: true,
          }
        }
      }
    });

    console.log(`✅ Form ${formId} successfully published`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`❌ Failed to publish form ${formId}:`, error);
    throw new Error(`Form publishing failed: ${errorMessage}`);
  }
}

/**
 * Google Forms를 생성하고 즉시 발행(publish) 처리합니다.
 * 2026년 3월 31일 이후를 대비한 통합 함수입니다.
 *
 * @param formSpec - Google Forms API 요청 스펙
 * @param oauth2Client - Google OAuth2 클라이언트
 * @returns 생성된 폼의 ID
 * @throws {Error} 생성 또는 발행 실패 시 에러 발생
 */
export async function createAndPublishForm(
  formSpec: { info: { title: string; documentTitle: string } },
  oauth2Client: OAuth2Client
): Promise<string> {
  const forms = google.forms({ version: 'v1', auth: oauth2Client });

  try {
    // 1단계: 폼 생성
    console.log('📝 Creating Google Form...');
    const createResponse = await forms.forms.create({
      requestBody: formSpec
    });

    const formId = createResponse.data.formId;
    if (!formId) {
      throw new Error('Form ID not returned from API');
    }

    console.log(`✅ Form created with ID: ${formId}`);

    // 2단계: 폼 발행 (2026.3.31+ 필수)
    console.log(`📤 Publishing form ${formId}...`);
    await publishForm(formId, oauth2Client);

    return formId;

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Form creation or publishing failed:', error);
    throw new Error(`Failed to create and publish form: ${errorMessage}`);
  }
}

/**
 * 기존 폼을 배치 업데이트하고 발행 상태를 확인합니다.
 *
 * @param formId - 업데이트할 폼 ID
 * @param updates - 배치 업데이트 요청 배열
 * @param oauth2Client - Google OAuth2 클라이언트
 * @returns 업데이트된 폼 정보
 */
export async function updateAndEnsurePublished(
  formId: string,
  updates: forms_v1.Schema$Request[],
  oauth2Client: OAuth2Client
): Promise<Record<string, unknown>> {
  const forms = google.forms({ version: 'v1', auth: oauth2Client });

  try {
    // 배치 업데이트 실행
    console.log(`🔄 Updating form ${formId}...`);
    const updateResponse = await forms.forms.batchUpdate({
      formId: formId,
      requestBody: {
        requests: updates,
      }
    });

    console.log(`✅ Form ${formId} updated successfully`);

    // 발행 상태 재확인 (안전장치)
    await publishForm(formId, oauth2Client);

    return updateResponse.data as Record<string, unknown>;

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`❌ Failed to update form ${formId}:`, error);
    throw new Error(`Form update failed: ${errorMessage}`);
  }
}
