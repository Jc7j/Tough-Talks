export type Post = {
  id: string
  content: string
  timeTillExpire: string
}

export type User = {
  id: string
  email: string
  name: string
  posts?: Post[]
}
