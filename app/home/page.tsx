import PostsContainer from '@/components/home/posts-container'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

export default async function Page() {
  const { isAuthenticated } = getKindeServerSession()

  return (await isAuthenticated()) ? (
    <div className="h-screen">
      <div className="flex justify-center pt-5 lg:pt-20">
        {' '}
        Pciking container
      </div>
      <PostsContainer />
    </div>
  ) : (
    <div>
      Not protected.... You need to be authenticated{' '}
      <LoginLink>
        <strong>Login</strong>
      </LoginLink>
    </div>
  )
}
