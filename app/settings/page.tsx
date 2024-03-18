'use client'

import { Button } from '@/components/ui/button'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'

export default function Page() {
  const { user } = useKindeBrowserClient()

  return (
    <div className="flex flex-col items-center justify-center py-10">
      Basic Information
      <form className="flex flex-col">
        <label>Full Name</label>
        <input
          id="userName"
          name="userName"
          defaultValue={user?.given_name || ''}
        />
      </form>
      <LogoutLink>
        <Button variant="outline">Logout</Button>
      </LogoutLink>
    </div>
  )
}
