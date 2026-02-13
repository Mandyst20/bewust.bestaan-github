export interface UserWithProfile {
  id: string
  email: string
  role: string
  profile: {
    username: string
    bio: string | null
    avatarUrl: string | null
    allowDm: boolean
  } | null
}

export interface TopicWithAuthor {
  id: string
  title: string
  body: string
  tags: string[]
  status: string
  createdAt: Date
  updatedAt: Date
  author: {
    id: string
    profile: {
      username: string
    } | null
  }
  _count: {
    replies: number
  }
}

export interface ReplyWithAuthor {
  id: string
  body: string
  createdAt: Date
  author: {
    id: string
    profile: {
      username: string
    } | null
  }
}

export interface DmThreadWithUsers {
  id: string
  createdAt: Date
  lastMessageAt: Date
  userA: {
    id: string
    profile: {
      username: string
    } | null
  }
  userB: {
    id: string
    profile: {
      username: string
    } | null
  }
  messages: {
    id: string
    body: string
    createdAt: Date
    senderId: string
  }[]
}
