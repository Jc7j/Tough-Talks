import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'

import { Button } from '@/components/ui/button'
import BasicInfo from '@/components/settings/basic-info'

export default function Page() {
  return (
    <div className="flex flex-col justify-center items-center">
      <BasicInfo />
      <LogoutLink>
        <Button variant="outline">Logout</Button>
      </LogoutLink>
    </div>
  )
}
