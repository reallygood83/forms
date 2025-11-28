'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Sparkles, FileText, HelpCircle, ExternalLink, CheckCircle } from 'lucide-react';
import GeminiKeyInput from '@/components/GeminiKeyInput';
import type { FormSpec } from '@/lib/form-spec';

export default function CreatePage() {
  const { data: session, status } = useSession();
  const [isGenerating, setIsGenerating] = useState(false);
  const [creatingForm, setCreatingForm] = useState(false);
  const [formType, setFormType] = useState<'quiz' | 'survey'>('quiz');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [creationResult, setCreationResult] = useState<{
    formId: string;
    formUrl: string;
    responderUrl: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [needsReauth, setNeedsReauth] = useState(false);

  // Load existing API key on mount
  useEffect(() => {
    async function loadApiKey() {
      if (!session?.user?.email) return;

      try {
        const res = await fetch("/api/secrets/get");
        const json = await res.json();

        if (res.ok && json.exists && json.key) {
          setGeminiApiKey(json.key);
        }
      } catch (e) {
        console.error("Failed to load API key:", e);
      }
    }

    loadApiKey();
  }, [session]);

  // 퀴즈 상태
  const [quizData, setQuizData] = useState({
    title: '',
    text: '',
    grade: '초등학교 3학년',
    count: 5,
    questionType: 'mixed',
    difficulty: 'medium',
    timeLimit: false,
    timeLimitMinutes: 10,
    collectPersonalInfo: false
  });

  // 문항 수 커스텀 입력 상태 (퀴즈용)
  const [useCustomCount, setUseCustomCount] = useState(false);
  const [customCount, setCustomCount] = useState('');

  // 설문 문항 수 커스텀 입력 상태
  const [useCustomSurveyCount, setUseCustomSurveyCount] = useState(false);
  const [customSurveyCount, setCustomSurveyCount] = useState('');

  // 설문 상태
  const [surveyData, setSurveyData] = useState({
    title: '',
    purpose: '',
    audience: '',
    numQuestions: 5,
    questionType: 'ai_recommended',
    originalText: '',
    collectName: false,
    collectPhone: false,
    collectEmail: false
  });

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const handleGenerate = async () => {
    setErrorMessage(null);
    setCreationResult(null);
    setStatusMessage('폼 초안을 생성하는 중입니다...');
    setIsGenerating(true);

    const payload =
      formType === 'quiz'
        ? {
            formType: 'quiz',
            geminiApiKey: geminiApiKey || undefined,
            ...quizData,
          }
        : {
            formType: 'survey',
            geminiApiKey: geminiApiKey || undefined,
            ...surveyData,
          };

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || '폼 스펙 생성에 실패했습니다.');
      }

      const spec = result.formSpec as FormSpec | undefined;
      if (!spec) {
        throw new Error('폼 스펙 생성에 실패했습니다.');
      }

      setStatusMessage('Google Forms로 내보내는 중입니다...');
      setCreatingForm(true);

      const createResponse = await fetch('/api/forms/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spec),
      });
      const created = await createResponse.json();
      if (!createResponse.ok) {
        // Google OAuth 토큰 오류 감지
        if (created.error && created.error.includes('Google 인증 토큰')) {
          setNeedsReauth(true);
        }
        throw new Error(created.error || 'Google Forms 생성에 실패했습니다.');
      }

      setCreationResult({
        formId: created.formId,
        formUrl: created.formUrl,
        responderUrl: created.responderUrl,
      });
      setStatusMessage(null);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : '생성 중 오류가 발생했습니다.';
      setErrorMessage(message);
    } finally {
      setIsGenerating(false);
      setCreatingForm(false);
      setStatusMessage(null);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header - 모바일 최적화 */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">TeaBoard</div>
              <div className="text-lg sm:text-xl font-semibold text-gray-800">Forms</div>
            </div>
            <div className="text-xs sm:text-sm text-gray-500 hidden sm:block">
              AI 기반 퀴즈/설문 생성
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-5xl">
        {/* 헤더 - 모바일 최적화 */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            TeaBoard Forms
          </h1>
          <p className="text-base sm:text-lg text-gray-600 px-4 sm:px-0">
            AI로 퀴즈나 설문을 자동 생성하고 Google Forms로 만들어보세요
          </p>
        </div>

        {/* Gemini API 키 입력 */}
        <div className="mb-6">
          <GeminiKeyInput onKeySet={setGeminiApiKey} />
        </div>

        {/* 폼 타입 선택 - Chanel 스타일 */}
        <Card className="mb-6 border-2 border-black shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
          <CardHeader className="pb-4 border-b-2 border-black">
            <CardTitle className="flex items-center gap-2 text-black text-lg sm:text-xl font-bold uppercase tracking-wide">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-black" />
              폼 유형 선택
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-gray-700 mt-2">
              만들고 싶은 폼의 유형을 선택하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={formType} onValueChange={(value) => setFormType(value as 'quiz' | 'survey')}>
              <TabsList className="grid w-full grid-cols-2 bg-white border-2 border-black p-0 rounded-none h-auto">
                <TabsTrigger
                  value="quiz"
                  className="flex items-center justify-center gap-2 border-r-2 border-black data-[state=active]:bg-black data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-black rounded-none transition-all duration-200 py-3 sm:py-4 font-semibold"
                >
                  <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base uppercase tracking-wide">퀴즈</span>
                </TabsTrigger>
                <TabsTrigger
                  value="survey"
                  className="flex items-center justify-center gap-2 data-[state=active]:bg-black data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-black rounded-none transition-all duration-200 py-3 sm:py-4 font-semibold"
                >
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="text-sm sm:text-base uppercase tracking-wide">설문</span>
                </TabsTrigger>
              </TabsList>

              {/* 퀴즈 생성 - 모바일 최적화 */}
              <TabsContent value="quiz" className="space-y-4 sm:space-y-5 mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="quiz-title" className="text-sm sm:text-base font-medium text-gray-700">
                      퀴즈 제목 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="quiz-title"
                      placeholder="예: 3학년 수학 단원평가"
                      value={quizData.title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuizData({...quizData, title: e.target.value})}
                      className="h-10 sm:h-11 text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade" className="text-sm sm:text-base font-medium text-gray-700">
                      대상 학년
                    </Label>
                    <Select value={quizData.grade} onValueChange={(value) => setQuizData({...quizData, grade: value})}>
                      <SelectTrigger className="h-10 sm:h-11 text-sm sm:text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-[280px] sm:max-h-[340px]">
                        <SelectItem value="초등학교 1학년">초등학교 1학년</SelectItem>
                        <SelectItem value="초등학교 2학년">초등학교 2학년</SelectItem>
                        <SelectItem value="초등학교 3학년">초등학교 3학년</SelectItem>
                        <SelectItem value="초등학교 4학년">초등학교 4학년</SelectItem>
                        <SelectItem value="초등학교 5학년">초등학교 5학년</SelectItem>
                        <SelectItem value="초등학교 6학년">초등학교 6학년</SelectItem>
                        <SelectItem value="중학교 1학년">중학교 1학년</SelectItem>
                        <SelectItem value="중학교 2학년">중학교 2학년</SelectItem>
                        <SelectItem value="중학교 3학년">중학교 3학년</SelectItem>
                        <SelectItem value="고등학교 1학년">고등학교 1학년</SelectItem>
                        <SelectItem value="고등학교 2학년">고등학교 2학년</SelectItem>
                        <SelectItem value="고등학교 3학년">고등학교 3학년</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quiz-text" className="text-sm sm:text-base font-medium text-gray-700">
                    원본 텍스트 <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="quiz-text"
                    placeholder="퀴즈를 만들 원본 텍스트나 내용을 입력하세요..."
                    className="min-h-[120px] sm:min-h-[140px] text-sm sm:text-base resize-none"
                    value={quizData.text}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuizData({...quizData, text: e.target.value})}
                  />
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    교과서 내용이나 학습 자료를 붙여넣으세요
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="question-count" className="text-sm sm:text-base font-medium text-gray-700">
                      문항 수
                    </Label>
                    {!useCustomCount ? (
                      <Select
                        value={quizData.count.toString()}
                        onValueChange={(value) => {
                          if (value === 'custom') {
                            setUseCustomCount(true);
                            setCustomCount('');
                          } else {
                            setQuizData({...quizData, count: parseInt(value)});
                          }
                        }}
                      >
                        <SelectTrigger className="h-10 sm:h-11 text-sm sm:text-base">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-[280px] sm:max-h-[340px]">
                          <SelectItem value="3">3문항</SelectItem>
                          <SelectItem value="5">5문항</SelectItem>
                          <SelectItem value="10">10문항</SelectItem>
                          <SelectItem value="15">15문항</SelectItem>
                          <SelectItem value="20">20문항</SelectItem>
                          <SelectItem value="custom">직접 입력</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          min="1"
                          max="30"
                          placeholder="문항 수 입력"
                          value={customCount}
                          onChange={(e) => {
                            const value = e.target.value;
                            setCustomCount(value);
                            const num = parseInt(value);
                            if (num >= 1 && num <= 30) {
                              setQuizData({...quizData, count: num});
                            }
                          }}
                          className="h-10 sm:h-11 text-sm sm:text-base flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setUseCustomCount(false);
                            setCustomCount('');
                            setQuizData({...quizData, count: 5});
                          }}
                          className="h-10 sm:h-11 text-xs sm:text-sm"
                        >
                          취소
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="question-type" className="text-sm sm:text-base font-medium text-gray-700">
                      문항 유형
                    </Label>
                    <Select value={quizData.questionType} onValueChange={(value) => setQuizData({...quizData, questionType: value})}>
                      <SelectTrigger className="h-10 sm:h-11 text-sm sm:text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-[280px] sm:max-h-[340px]">
                        <SelectItem value="mixed">혼합형</SelectItem>
                        <SelectItem value="multiple_choice">객관식만</SelectItem>
                        <SelectItem value="short_answer">단답형만</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty" className="text-sm sm:text-base font-medium text-gray-700">
                      난이도
                    </Label>
                    <Select value={quizData.difficulty} onValueChange={(value) => setQuizData({...quizData, difficulty: value})}>
                      <SelectTrigger className="h-10 sm:h-11 text-sm sm:text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-[280px] sm:max-h-[340px]">
                        <SelectItem value="easy">쉬움 ⭐</SelectItem>
                        <SelectItem value="medium">보통 ⭐⭐</SelectItem>
                        <SelectItem value="hard">어려움 ⭐⭐⭐</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="time-limit"
                      checked={quizData.timeLimit}
                      onCheckedChange={(checked: boolean) => setQuizData({...quizData, timeLimit: !!checked})}
                      className="h-5 w-5"
                    />
                    <Label htmlFor="time-limit" className="text-sm sm:text-base font-medium text-gray-700 cursor-pointer">
                      시간 제한 설정
                    </Label>
                  </div>
                  {quizData.timeLimit && (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        className="w-20 h-9 text-sm sm:text-base"
                        value={quizData.timeLimitMinutes}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuizData({...quizData, timeLimitMinutes: parseInt(e.target.value)})}
                        min="1"
                        max="120"
                      />
                      <span className="text-sm sm:text-base text-gray-600">분</span>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="collect-personal-info"
                      checked={quizData.collectPersonalInfo}
                      onCheckedChange={(checked: boolean) => setQuizData({...quizData, collectPersonalInfo: !!checked})}
                      className="h-5 w-5"
                    />
                    <Label htmlFor="collect-personal-info" className="text-sm sm:text-base font-medium text-gray-700 cursor-pointer">
                      학생 정보 수집 (학년, 반, 번호, 이름)
                    </Label>
                  </div>
                  {quizData.collectPersonalInfo && (
                    <p className="mt-2 text-xs sm:text-sm text-gray-600">
                      퀴즈 시작 전에 학년, 반, 번호, 이름 입력 필드가 추가됩니다.
                    </p>
                  )}
                </div>
              </TabsContent>

              {/* 설문 생성 - 모바일 최적화 */}
              <TabsContent value="survey" className="space-y-4 sm:space-y-5 mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="survey-title" className="text-sm sm:text-base font-medium text-gray-700">
                      설문 제목 <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="survey-title"
                      placeholder="예: 고객 만족도 조사"
                      value={surveyData.title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSurveyData({...surveyData, title: e.target.value})}
                      className="h-10 sm:h-11 text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="survey-questions" className="text-sm sm:text-base font-medium text-gray-700">
                      질문 수
                    </Label>
                    {!useCustomSurveyCount ? (
                      <Select
                        value={surveyData.numQuestions.toString()}
                        onValueChange={(value) => {
                          if (value === 'custom') {
                            setUseCustomSurveyCount(true);
                            setCustomSurveyCount('');
                          } else {
                            setSurveyData({...surveyData, numQuestions: parseInt(value)});
                          }
                        }}
                      >
                        <SelectTrigger className="h-10 sm:h-11 text-sm sm:text-base">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="max-h-[280px] sm:max-h-[340px]">
                          <SelectItem value="3">3문항</SelectItem>
                          <SelectItem value="5">5문항</SelectItem>
                          <SelectItem value="10">10문항</SelectItem>
                          <SelectItem value="15">15문항</SelectItem>
                          <SelectItem value="20">20문항</SelectItem>
                          <SelectItem value="custom">직접 입력</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          min="1"
                          max="50"
                          placeholder="질문 수 입력"
                          value={customSurveyCount}
                          onChange={(e) => {
                            const value = e.target.value;
                            setCustomSurveyCount(value);
                            const num = parseInt(value);
                            if (num >= 1 && num <= 50) {
                              setSurveyData({...surveyData, numQuestions: num});
                            }
                          }}
                          className="h-10 sm:h-11 text-sm sm:text-base flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setUseCustomSurveyCount(false);
                            setCustomSurveyCount('');
                            setSurveyData({...surveyData, numQuestions: 5});
                          }}
                          className="h-10 sm:h-11 text-xs sm:text-sm"
                        >
                          취소
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="survey-question-type" className="text-sm sm:text-base font-medium text-gray-700">
                      문항 유형
                    </Label>
                    <Select value={surveyData.questionType} onValueChange={(value) => setSurveyData({...surveyData, questionType: value})}>
                      <SelectTrigger className="h-10 sm:h-11 text-sm sm:text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="max-h-[280px] sm:max-h-[340px]">
                        <SelectItem value="ai_recommended">AI 추천 (기본값)</SelectItem>
                        <SelectItem value="multiple_choice">객관식</SelectItem>
                        <SelectItem value="checkbox">체크박스</SelectItem>
                        <SelectItem value="dropdown">드롭다운</SelectItem>
                        <SelectItem value="short_answer">단답형</SelectItem>
                        <SelectItem value="paragraph">장문형</SelectItem>
                        <SelectItem value="linear_scale">선형 배율</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="survey-purpose" className="text-sm sm:text-base font-medium text-gray-700">
                    설문 목적 <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="survey-purpose"
                    placeholder="예: 서비스 개선을 위한 고객 의견 수렴"
                    value={surveyData.purpose}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSurveyData({...surveyData, purpose: e.target.value})}
                    className="min-h-[80px] sm:min-h-[90px] text-sm sm:text-base resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="survey-audience" className="text-sm sm:text-base font-medium text-gray-700">
                    대상 응답자 <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="survey-audience"
                    placeholder="예: 20-30대 직장인, 학부모 등"
                    value={surveyData.audience}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSurveyData({...surveyData, audience: e.target.value})}
                    className="min-h-[80px] sm:min-h-[90px] text-sm sm:text-base resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="survey-text" className="text-sm sm:text-base font-medium text-gray-700">
                    참고 텍스트 (선택사항)
                  </Label>
                  <Textarea
                    id="survey-text"
                    placeholder="설문 작성에 참고할 내용이나 배경 정보를 입력하세요..."
                    className="min-h-[100px] sm:min-h-[120px] text-sm sm:text-base resize-none"
                    value={surveyData.originalText}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSurveyData({...surveyData, originalText: e.target.value})}
                  />
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    관련 자료나 배경 정보가 있으면 더 정확한 설문이 생성됩니다
                  </p>
                </div>

                <div className="space-y-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Label className="text-sm sm:text-base font-medium text-gray-700">
                    개인정보 수집 (선택)
                  </Label>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="collect-name"
                        checked={surveyData.collectName}
                        onCheckedChange={(checked: boolean) => setSurveyData({...surveyData, collectName: !!checked})}
                        className="h-5 w-5"
                      />
                      <Label htmlFor="collect-name" className="text-sm sm:text-base cursor-pointer">
                        이름
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="collect-phone"
                        checked={surveyData.collectPhone}
                        onCheckedChange={(checked: boolean) => setSurveyData({...surveyData, collectPhone: !!checked})}
                        className="h-5 w-5"
                      />
                      <Label htmlFor="collect-phone" className="text-sm sm:text-base cursor-pointer">
                        전화번호
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="collect-email"
                        checked={surveyData.collectEmail}
                        onCheckedChange={(checked: boolean) => setSurveyData({...surveyData, collectEmail: !!checked})}
                        className="h-5 w-5"
                      />
                      <Label htmlFor="collect-email" className="text-sm sm:text-base cursor-pointer">
                        이메일
                      </Label>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* 생성 버튼 - 모바일 최적화 */}
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <Button
            onClick={handleGenerate}
            disabled={
              isGenerating ||
              creatingForm ||
              (formType === 'quiz'
                ? !quizData.title || !quizData.text
                : !surveyData.title || !surveyData.purpose || !surveyData.audience)
            }
            size="lg"
            className="w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base sm:text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isGenerating || creatingForm ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
                <span className="text-sm sm:text-base">
                  {creatingForm ? 'Google Forms 생성 중...' : 'AI 초안 생성 중...'}
                </span>
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                <span className="text-sm sm:text-base">Google Forms로 만들기</span>
              </>
            )}
          </Button>

          {statusMessage && (
            <div className="w-full max-w-md px-4">
              <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-gray-600 bg-blue-50 py-2 px-4 rounded-lg border border-blue-200">
                <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                <p>{statusMessage}</p>
              </div>
            </div>
          )}
        </div>

        {errorMessage && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-red-800">오류 발생</h3>
                <p className="mt-1 text-sm text-red-700">{errorMessage}</p>
                {needsReauth && (
                  <div className="mt-4 space-y-3">
                    <p className="text-sm font-medium text-red-800">
                      Google Forms 권한이 필요합니다
                    </p>
                    <p className="text-sm text-red-600">
                      로그아웃 후 다시 로그인하면 Google Forms 접근 권한이 새로 부여됩니다.
                    </p>
                    <Button
                      onClick={() => {
                        // 로그아웃하고 즉시 로그인 페이지로
                        window.location.href = '/api/auth/signout?callbackUrl=/';
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      로그아웃 후 재로그인하기
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {creationResult && (
          <Card className="mt-6 sm:mt-8 border-[1.5px] border-black shadow-md hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-black text-lg sm:text-xl">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600 flex-shrink-0" />
                <span>Google Forms 생성 완료!</span>
              </CardTitle>
              <CardDescription className="text-sm sm:text-base mt-2">
                생성된 폼은 내 드라이브에 저장되었습니다. 바로 편집하거나 응답 링크를 공유해보세요.
              </CardDescription>
              <div className="mt-3 px-4 py-3 bg-yellow-50 border-2 border-yellow-400 rounded-lg">
                <p className="text-sm font-semibold text-yellow-800 text-center">
                  ⚠️ AI는 실수할 수 있습니다! 공유 전 반드시 확인하세요!
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Button
                  onClick={() => window.open(creationResult.formUrl, '_blank')}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white h-11 sm:h-12 text-sm sm:text-base font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>편집 화면 열기</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(creationResult.responderUrl, '_blank')}
                  className="flex items-center justify-center gap-2 border-blue-600 text-blue-600 hover:bg-blue-50 h-11 sm:h-12 text-sm sm:text-base font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>응답 링크 열기</span>
                </Button>
              </div>
              <div className="rounded-lg bg-gray-50 border border-gray-200 p-4 sm:p-5 text-xs sm:text-sm text-gray-700 space-y-3">
                <div>
                  <span className="font-semibold text-gray-900">폼 ID:</span>{' '}
                  <span className="font-mono text-gray-600 break-all">{creationResult.formId}</span>
                </div>
                <div className="pt-2 border-t border-gray-300">
                  <span className="font-semibold text-gray-900 block mb-1">공유 링크:</span>
                  <a
                    href={creationResult.responderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline break-all inline-block"
                  >
                    {creationResult.responderUrl}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}