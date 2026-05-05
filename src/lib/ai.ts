// Minimal client for the OpenAI Chat Completions endpoint.
//
// SECURITY NOTE: VITE_* env vars are bundled into the client JS. Anyone
// inspecting the page can extract this key. Use only with a heavily
// rate-limited / spend-capped key for the live demo. The proper long-term
// fix is a serverless proxy that keeps the key on the server.

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export const hasApiKey = (): boolean =>
  Boolean(import.meta.env.VITE_OPENAI_API_KEY)

export async function chatComplete(
  messages: ChatMessage[],
  options: { temperature?: number; maxTokens?: number } = {},
): Promise<string> {
  const key = import.meta.env.VITE_OPENAI_API_KEY
  if (!key) throw new Error('NO_KEY')

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      temperature: options.temperature ?? 0.6,
      max_tokens: options.maxTokens ?? 500,
    }),
  })

  if (!res.ok) throw new Error(`API_${res.status}`)
  const data = await res.json()
  const content = data?.choices?.[0]?.message?.content
  if (typeof content !== 'string') throw new Error('NO_CONTENT')
  return content.trim()
}
