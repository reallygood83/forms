export function getProgramDescription(): string {
  const base =
    'AI로 퀴즈와 설문을 자동 생성하고 구글 폼으로 즉시 배포합니다. 교육과 업무 설문을 신속·정확하게 제작하세요.'
  return base.length > 150 ? base.slice(0, 150) : base
}

export function buildShareDescription(extra?: string): string {
  const core = getProgramDescription()
  if (!extra) return core
  const merged = `${extra} ${core}`.trim()
  return merged.length > 150 ? merged.slice(0, 150) : merged
}

