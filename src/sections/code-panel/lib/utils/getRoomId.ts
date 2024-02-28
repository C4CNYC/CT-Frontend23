const getRoomId = (userId: string, lessonId: string) => `${userId as string}_${lessonId as string}`

export default getRoomId
