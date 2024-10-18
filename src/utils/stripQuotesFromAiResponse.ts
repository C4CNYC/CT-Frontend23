/**  stripts \`\`\`json  javascript  python  from the begining and at the end \`\`\` of  string
 */
export function stripQuotesFromAiResponse(response: string): string {
  if (!response.startsWith('```')) return response
  return response.replace(/^```(\w)*/, '').replace(/```$/, '')
}

export function JsonParseFromAiResponse(response: string): any {
  try {
    return JSON.parse(stripQuotesFromAiResponse(response))
  } catch (error) {
    return response
  }
}
