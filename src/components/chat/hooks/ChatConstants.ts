import { IFriend } from '@root/src/redux/interfaces/friends.interface'

export let actions = [
  { type: 'lesson', name: 'Lesson Modify' },
  { type: 'slide', name: 'Translate Slide' },
  { type: 'slide', name: 'Add New Slide' },
  { type: 'slide', name: 'Add Validations to Slide' },
  { type: 'slide', name: 'Add Hints to Slide' },
  { type: 'slide', name: 'Add Solution to Slide' },
]
export type ChatAiOptionsType = {
  type: string
  action: string
  shortTitle: string
  description: string
}
export const AiAgent: IFriend = {
  id: '1',
  first_name: 'Ai Agent',
  active: true,
  email: '',
  last_name: 'Agent',
  phone: '',
  country: '',
  state: '',
  city: '',
  post_code: '',
  about: '',
  verified: false,
  cover: '',
  username: null,
  socials: [],
  status: '',
  createdAt: '',
  updatedAt: '',
  avatar: `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI2MCIgdmlld0JveD0iMCAwIDIwMCAyNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3QgeD0iNDAiIHk9IjgwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiByeD0iMTUiIGZpbGw9IiMzQTlFQkYiIHN0cm9rZT0iIzA4M0Y1MiIgc3Ryb2tlLXdpZHRoPSI1Ii8+CiAgPGNpcmNsZSBjeD0iNzUiIGN5PSIxMjAiIHI9IjEwIiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiMwODNGNTIiIHN0cm9rZS13aWR0aD0iNSIvPgogIDxjaXJjbGUgY3g9IjEyNSIgY3k9IjEyMCIgcj0iMTAiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzA4M0Y1MiIgc3Ryb2tlLXdpZHRoPSI1Ii8+CiAgPHJlY3QgeD0iMzAiIHk9IjE3MCIgd2lkdGg9IjE0MCIgaGVpZ2h0PSI1MCIgcng9IjEwIiBmaWxsPSIjM0E5RUJGIiBzdHJva2U9IiMwODNGNTIiIHN0cm9rZS13aWR0aD0iNSIvPgogIDxyZWN0IHg9IjI1IiB5PSI5NSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjQwIiByeD0iNSIgZmlsbD0iIzNBOUVCRiIgc3Ryb2tlPSIjMDgzRjUyIiBzdHJva2Utd2lkdGg9IjUiLz4KICA8cmVjdCB4PSIxNTUiIHk9Ijk1IiB3aWR0aD0iMjAiIGhlaWdodD0iNDAiIHJ4PSI1IiBmaWxsPSIjM0E5RUJGIiBzdHJva2U9IiMwODNGNTIiIHN0cm9rZS13aWR0aD0iNSIvPgogIDxsaW5lIHgxPSIxMDAiIHkxPSI2MCIgeDI9IjEwMCIgeTI9Ijc1IiBzdHJva2U9IiMwODNGNTIiIHN0cm9rZS13aWR0aD0iNSIvPgogIDxjaXJjbGUgY3g9IjEwMCIgY3k9IjUwIiByPSI3IiBmaWxsPSIjM0E5RUJGIiBzdHJva2U9IiMwODNGNTIiIHN0cm9rZS13aWR0aD0iNSIvPgo8L3N2Zz4K`,
}
