import { google } from 'googleapis';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

// Google Forms API 클라이언트 초기화 (서비스 계정 방식)
export async function getFormsClient() {
  // 먼저 서비스 계정으로 시도
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        type: 'service_account',
        project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
        client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/forms.body',
        'https://www.googleapis.com/auth/forms.responses.readonly',
        'https://www.googleapis.com/auth/drive.file'
      ],
    });

    return google.forms({ version: 'v1', auth });
  } catch (serviceAccountError) {
    console.log('서비스 계정 인증 실패, OAuth로 시도:', serviceAccountError);
    
    // 서비스 계정 실패 시 기존 OAuth 방식으로 fallback
    const session = await getServerSession(authOptions);
    
    if (!session?.accessToken) {
      throw new Error('인증이 필요합니다. 서비스 계정과 OAuth 모두 실패했습니다.');
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({
      access_token: session.accessToken,
    });

    return google.forms({ version: 'v1', auth });
  }
}

// 새 폼 생성
export async function createForm(title: string, description?: string) {
  const forms = await getFormsClient();
  
  const formData = {
    info: {
      title,
      description: description || '',
    },
  };

  const response = await forms.forms.create({
    requestBody: formData,
  });

  return response.data;
}

// 폼을 퀴즈로 변환
export async function convertToQuiz(formId: string) {
  const forms = await getFormsClient();
  
  const requests = [
    {
      updateSettings: {
        settings: {
          quizSettings: {
            isQuiz: true,
          },
        },
        updateMask: 'quizSettings.isQuiz',
      },
    },
  ];

  const response = await forms.forms.batchUpdate({
    formId,
    requestBody: { requests },
  });

  return response.data;
}

// 객관식 질문 추가
export async function addMultipleChoiceQuestion(
  formId: string,
  questionText: string,
  options: string[],
  correctAnswerIndex?: number,
  points?: number
) {
  const forms = await getFormsClient();
  
  const choiceOptions = options.map((option) => ({
    value: option,
  }));

  const question: Record<string, unknown> = {
    required: false,
    choiceQuestion: {
      type: 'RADIO',
      options: choiceOptions,
    },
  };

  // 퀴즈인 경우 정답 설정
  if (correctAnswerIndex !== undefined && points !== undefined) {
    question.grading = {
      pointValue: points,
      correctAnswers: {
        answers: [
          {
            value: options[correctAnswerIndex],
          },
        ],
      },
    };
  }

  const requests = [
    {
      createItem: {
        item: {
          title: questionText,
          questionItem: {
            question,
          },
        },
        location: {
          index: 0,
        },
      },
    },
  ];

  const response = await forms.forms.batchUpdate({
    formId,
    requestBody: { requests },
  });

  return response.data;
}

// 주관식 질문 추가
export async function addTextQuestion(
  formId: string,
  questionText: string,
  isRequired: boolean = false,
  points?: number
) {
  const forms = await getFormsClient();

  const question: Record<string, unknown> = {
    required: isRequired,
    textQuestion: {},
  };

  // 퀴즈인 경우 점수 설정
  if (points !== undefined) {
    question.grading = {
      pointValue: points,
    };
  }

  const requests = [
    {
      createItem: {
        item: {
          title: questionText,
          questionItem: {
            question,
          },
        },
        location: {
          index: 0,
        },
      },
    },
  ];

  const response = await forms.forms.batchUpdate({
    formId,
    requestBody: { requests },
  });

  return response.data;
}

// 폼 설정 업데이트 (제한시간 등)
export async function updateFormSettings(
  formId: string,
  settings: {
    collectEmail?: boolean;
    limitOneResponsePerUser?: boolean;
    shuffleQuestions?: boolean;
  }
) {
  const forms = await getFormsClient();

  const requests = [
    {
      updateSettings: {
        settings: settings as Record<string, unknown>,
        updateMask: Object.keys(settings).join(','),
      },
    },
  ];

  const response = await forms.forms.batchUpdate({
    formId,
    requestBody: { requests },
  });

  return response.data;
}

// 폼 정보 조회
export async function getForm(formId: string) {
  const forms = await getFormsClient();
  
  const response = await forms.forms.get({
    formId,
  });

  return response.data;
}

// 폼 응답 조회
export async function getFormResponses(formId: string) {
  const forms = await getFormsClient();
  
  const response = await forms.forms.responses.list({
    formId,
  });

  return response.data;
}

// 폼 URL 생성
export function getFormUrl(formId: string) {
  return `https://docs.google.com/forms/d/${formId}/viewform`;
}

// 폼 편집 URL 생성
export function getFormEditUrl(formId: string) {
  return `https://docs.google.com/forms/d/${formId}/edit`;
}