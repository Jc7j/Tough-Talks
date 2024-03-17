import { Button } from '@/components/ui/button'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      test
      <LogoutLink><Button variant="outline">Logout</Button></LogoutLink>
    </div>
  )
}
