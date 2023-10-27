export type CommentType = {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: UserType;
  replies: ReplyType[];
}

export type UserType = {
  image: {
    png: string,
    webp: string
  },
  username: string
}

export type ReplyType = CommentType & {
  replyingTo?: string
}
