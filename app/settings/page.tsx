import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'

import { Button } from '@/components/ui/button'
import BasicInfo from '@/components/settings/basic-info'

export default async function Page() {
  const { isAuthenticated } = getKindeServerSession()
  if (!(await isAuthenticated())) {
    return redirect('/')
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <BasicInfo />
      <LogoutLink>
        <Button variant="outline">Logout</Button>
      </LogoutLink>
    </div>
  )
}
