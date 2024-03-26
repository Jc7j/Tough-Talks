import {
  RegisterLink,
  LoginLink,
} from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'

export default async function Home() {
  const { isAuthenticated } = getKindeServerSession()

  if (await isAuthenticated()) {
    redirect('/home')
  }

  return (
    <main className="flex flex-col lg:flex-row justify-center items-center h-screen px-5">
      <div className="flex justify-center items-center w-full h-2/5 lg:h-full">
        <Image
          src="/toughtalks-logo.png"
          alt="Tough Talks Logo"
          width={500}
          height={500}
        />
      </div>
      <div className="flex flex-col justify-center items-center w-full h-3/5 lg:h-full">
        <h3 className="text-2xl lg:text-3xl font-extrabold text-center">
          {' '}
          Tweet whatver you want
        </h3>
        <LoginLink>Sign in</LoginLink>
        <RegisterLink>Sign up</RegisterLink>
      </div>
    </main>
  )
}
