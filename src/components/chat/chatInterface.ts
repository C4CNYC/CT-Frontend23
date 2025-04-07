import { ChatAiOptionsType } from './hooks/ChatConstants'

export type IChatMessages = {
  id: number
  isMe: boolean
  chat: string
  ctime: number // timestamp
  options?: ChatAiOptionsType[]
}
