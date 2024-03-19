'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useUserPersonalInfoStore } from '@/lib/store/userPersonalInfoStore'

const UpdateSettingsFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Atleast 2 characters for a name')
    .max(50, 'Max characters is 50'),
  email: z.string({}),
})

export default function BasicInfo() {
  const [savedSuccessMessage, setSavedSuccessMessage] = useState('')
  const { name, email, setUserPersonalInfo, fetchUserPersonalInfo } =
    useUserPersonalInfoStore()

  // useEffect(() => {
  //   fetchUserPersonalInfo()
  // }, [fetchUserPersonalInfo])

  const form = useForm<z.infer<typeof UpdateSettingsFormSchema>>({
    resolver: zodResolver(UpdateSettingsFormSchema),
    defaultValues: {
      name: name || '',
      email: email || '',
    },
  })

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = form

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
        console.error('Network response not okay. Unable to update user info.')
      }

      const userData = await res.json()
      setSavedSuccessMessage(userData.message)
    } catch (err) {
      console.log('Failed to update user info', err)
    }
  }

  return (
    <div className="text-center py-10 ">
      Basic Information
      <Form {...form}>
        <form className="w-full" onSubmit={handleSubmit(onSubmitHandler)}>
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
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {savedSuccessMessage && <p>Saved Succesfully!</p>}
          <Button variant="default" type="submit" >
            Send it
          </Button>
        </form>
      </Form>
    </div>
  )
}
