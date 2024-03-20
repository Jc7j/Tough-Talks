'use client'

import { useState, useEffect } from 'react'
import debounce from 'lodash/debounce'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useDialogOpen } from '@/lib/store/useDialogOpen'

const CreatePostFormSchema = z.object({
  content: z
    .string()
    .min(1, 'Content is required')
    .max(316, 'Max characters is 316'),
})

export default function CreatePost() {
  const [charCount, setCharCount] = useState(0)
  const router = useRouter()
  const {open, setOpen} = useDialogOpen()

  const form = useForm<z.infer<typeof CreatePostFormSchema>>({
    resolver: zodResolver(CreatePostFormSchema),
    defaultValues: {
      content: '',
    },
  })

  const {
    control,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const debouncedUpdateCharCount = debounce((content) => {
    setCharCount(content.length)
  }, 300)

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'content') {
        debouncedUpdateCharCount(value.content)
      }
    })

    return () => subscription.unsubscribe()
  }, [watch, debouncedUpdateCharCount])

  async function onSubmitHandler(data: z.infer<typeof CreatePostFormSchema>) {
    const timeTillExpire = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const updatedData = { ...data, timeTillExpire }
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'applcation/json',
        },
        body: JSON.stringify(updatedData),
      })

      if (!res.ok) {
        throw new Error('Network response was not ok')
      }

      setOpen(false)
      router.push('/home')
    } catch (err) {
      console.error('Failed to submit form:', err)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <FormField
          control={control}
          // name="content"
          {...register('content')}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post a Tweet</FormLabel>
              <FormDescription>
                Write down whatever youre feeling. Only once per 24 hours
              </FormDescription>
              <FormControl>
                <Textarea placeholder="What am I feeling" {...field} rows={7} />
              </FormControl>
              <FormMessage>{errors.content?.message}</FormMessage>
            </FormItem>
          )}
        />
        <div className="text-sm w-full flex items-center justify-between mt-3">
          <span className="flex">
            <p className={`${charCount > 316 ? 'text-destructive' : ''}`}>
              {charCount}
            </p>
            <p>/316</p>
          </span>
          <Button variant="default" type="submit">
            Send it
          </Button>
        </div>
      </form>
    </Form>
  )
}
