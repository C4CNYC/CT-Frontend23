export function getRoomId(senderId: string, reciverId: string): string {
  return [senderId, reciverId].sort().join('_')
}
