import { Role } from '../redux/services/enums/role.enum'

import { generateRandomEmoji } from './createRandomAvatar'

// Better to use faker.js for this or have better defaults
const RANDOM_USER_DATA = {
  email: `${(Math.random() * 10000).toFixed(0)}@gmail.com`,
  password: Math.random().toString(),
  firstName: `Anonymous`,
  lastName: `${(Math.random() * 1000).toFixed(0)}`,
  role: Role.Anonymous,
  emojiAvatar: generateRandomEmoji(true),
}

export const generateAnonymousUser = () => {
  return RANDOM_USER_DATA
}
