export type Post = {
  id: string
  content: string
  isNew?: boolean
  createdAt: string
}

export type User = {
  id: string
  email: string
  name: string
  posts?: Post[]
}

export type userPersonalInfo = {
  name: string
  email: string
  setUserPersonalInfo: (name: string, email: string) => void
  fetchUserPersonalInfo: () => Promise<void>
}

export type DialogOpen = {
  open: boolean
  setOpen: (open: boolean) => void
}
