import PostsContainer from '@/components/home/posts-container'
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { Suspense } from 'react'

export function RevenueChartSkeleton() {
  return <div>Fetching....</div>
}

// @TODO Move Login  side if not Authenticated to layout.tsx
export default async function Page() {
  const { isAuthenticated } = getKindeServerSession()

  return (await isAuthenticated()) ? (
    <>
      <Suspense fallback={<RevenueChartSkeleton />}>
        <PostsContainer />
      </Suspense>
    </>
  ) : (
    <>
      Not protected.... You need to be authenticated{' '}
      <LoginLink>
        <strong>Login</strong>
      </LoginLink>
    </>
  )
}
