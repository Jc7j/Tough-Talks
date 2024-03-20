import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'

import PostsContainer from '@/components/home/posts-container'

export default async function Page() {
  const { isAuthenticated } = getKindeServerSession()

  if (!(await isAuthenticated())) {
    return redirect('/')
  }

  return (
    <>
      <PostsContainer />
    </>
  )
}
