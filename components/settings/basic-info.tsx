'use client'

import clsx from 'clsx'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { User } from '@/lib/definitions'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const UpdateSettingsFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Atleast 2 characters for a name')
    .max(50, 'Max characters is 50'),
  email: z.string({}),
})

export default function BasicInfo() {
  const { user } = useKindeBrowserClient()
  const [dbUser, setDbUser] = useState<User>()

  const form = useForm<z.infer<typeof UpdateSettingsFormSchema>>({
    resolver: zodResolver(UpdateSettingsFormSchema),
    defaultValues: {
      name: dbUser?.name || '',
      email: dbUser?.email || '',
    },
  })

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = form

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!res.ok) {
          console.error('Network response not ok. Unable to fetch user info')
        }

        const data: User = await res.json()
        setDbUser(data)
      } catch (err) {
        console.error('Network response not ok. Unable to fetch user info', err)
      }
    }

    fetchUser()

  }, [user])

  async function onSubmitHandler(
    data: z.infer<typeof UpdateSettingsFormSchema>
  ) {
    try {
      const res = await fetch('/api/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'applcation/json',
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        console.error('Network response not okay. Umable to update user info.')
      }

      const userData = await res.json()
      console.log('new user data', userData)
    } catch (err) {
      console.log('Failed to update settings', err)
    }
  }

  console.log("dbUser", dbUser)

  return (
  <div className="text-center py-10 ">
  Basic Information
  <Form {...form}>
    <form
      className="w-full"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <FormField
        control={control}
        {...register('name')}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-c-primary-marine-blue flex items-center justify-between">
              Name
              <FormMessage>{errors.name?.message}</FormMessage>
            </FormLabel>
            <FormControl>
              <Input
              
                className={clsx(
                  'placeholder:font-medium placeholder:text-c-neutral-cool-gray border-c-neutral-light-gray text-c-primary-marine-blue',
                  {
                    'border-c-primary-strawberry-red': errors.name?.message,
                  }
                )}
                placeholder={dbUser?.name}

                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        {...register('email')}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-c-primary-marine-blue flex items-center justify-between">
              Email Address
              <FormMessage>{errors.email?.message}</FormMessage>
            </FormLabel>
            <FormControl>
              <Input
                type="email"
                className={clsx(
                  'placeholder:font-medium placeholder:text-c-neutral-cool-gray border-c-neutral-light-gray text-c-primary-marine-blue',
                  {
                    'border-c-primary-strawberry-red':
                      errors.email?.message,
                  }
                )}
                placeholder={dbUser?.email}
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </form>
  </Form>
  <Button variant="default" type="submit">
    Send it
  </Button>
  </div>)
}
