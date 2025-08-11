export const FileExtensions = {
  JS: 'js' as const,
  CSS: 'css' as const,
  HTML: 'html' as const,
  JSON: 'json' as const,
  PY: 'py' as const,
  JAVA: 'java' as const,
  TEST: 'test' as const,
  GO: 'go' as const,
} as const
export type FileExtension = (typeof FileExtensions)[keyof typeof FileExtensions] | (string & {})

export const FileExtensionJudge = {
  c: 50,
  cpp: 54,
  cs: 51,
  go: 60,
  java: 62,
  py: 71,
  rs: 73,
}
