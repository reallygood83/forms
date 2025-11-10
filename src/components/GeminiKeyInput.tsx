'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, Eye, EyeOff, Loader2 } from 'lucide-react';

interface GeminiKeyInputProps {
  onKeySet: (key: string) => void;
}

export default function GeminiKeyInput({ onKeySet }: GeminiKeyInputProps) {
  const { data: session } = useSession();
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isStored, setIsStored] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Firebase에서 API 키 확인
    async function loadApiKey() {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/secrets/get");
        const json = await res.json();

        if (res.ok && json.exists && json.key) {
          setApiKey(json.key);
          setIsStored(true);
          onKeySet(json.key);
        }
      } catch (e) {
        console.error("Failed to load API key:", e);
      } finally {
        setLoading(false);
      }
    }

    loadApiKey();
  }, [session, onKeySet]);

  const handleSaveKey = async () => {
    if (!apiKey.trim()) return;

    setSaving(true);
    try {
      const res = await fetch("/api/secrets/set", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: apiKey.trim() }),
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "저장 실패");
      }

      setIsStored(true);
      onKeySet(apiKey.trim());
    } catch (error) {
      console.error("Failed to save API key:", error);
      alert(error instanceof Error ? error.message : "API 키 저장 실패");
    } finally {
      setSaving(false);
    }
  };

  const handleClearKey = () => {
    setApiKey('');
    setIsStored(false);
    onKeySet('');
  };

  if (loading) {
    return (
      <Card className="shadow-md">
        <CardContent className="py-8 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="ml-2 text-sm text-zinc-600">API 키 불러오는 중...</span>
        </CardContent>
      </Card>
    );
  }

  if (isStored) {
    return (
      <Card className="shadow-md border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-black">
            <Key className="h-5 w-5 text-green-600" />
            Gemini API 키 ✓
          </CardTitle>
          <CardDescription className="text-zinc-600">
            대시보드에서 저장한 API 키가 자동으로 적용되었습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              readOnly
              className="flex-1 bg-white"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowKey(!showKey)}
              className="border-green-600 text-green-600 hover:bg-green-100"
            >
              {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              onClick={handleClearKey}
              className="border-green-600 text-green-600 hover:bg-green-100"
            >
              변경
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-black">
          <Key className="h-5 w-5 text-blue-600" />
          Gemini API 키 설정
        </CardTitle>
        <CardDescription className="text-zinc-600">
          AI 보조 생성을 위해 Gemini API 키를 입력해주세요. 입력하지 않더라도 기본 템플릿으로 폼을 만들 수 있습니다.
          <a 
            href="https://aistudio.google.com/app/apikey" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline ml-1"
          >
            여기서 발급받을 수 있습니다.
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gemini-key" className="text-gray-700 font-medium">API 키</Label>
            <div className="flex items-center gap-2">
              <Input
                id="gemini-key"
                type={showKey ? 'text' : 'password'}
                placeholder="AIza..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowKey(!showKey)}
                className="border-black text-black hover:bg-zinc-100"
              >
                {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <Button
            onClick={handleSaveKey}
            disabled={!apiKey.trim() || saving}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                저장 중...
              </>
            ) : (
              "API 키 저장"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
