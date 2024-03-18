'use client'

import { useState, useCallback } from 'react'
import debounce from 'lodash/debounce'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

const CreatePostFormSchema = z.object({
  content: z.string().max(316, {
    message: 'Max character count is 316',
  }),
})

export default function CreatePost() {
  const [charCount, setCharCount] = useState(0)
  const { user } = useKindeBrowserClient()

  const form = useForm<z.infer<typeof CreatePostFormSchema>>({
    resolver: zodResolver(CreatePostFormSchema),
  })

  const updateCharCount = useCallback(
    debounce((value) => {
      setCharCount(value.length)
    }, 300),
    []
  )

  async function onSubmit(data: z.infer<typeof CreatePostFormSchema>) {
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'applcation/json',
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        throw new Error('Network response was not ok')
      }

      const postData = await res.json()
      console.log('Post created:', postData)
    } catch (err) {
      console.error('Failed to submit form:', err)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field: { onChange } }) => (
            <FormItem>
              <FormLabel>Post a Tweet</FormLabel>
              <FormDescription>
                Write down whatever youre feeling. Only once per 24 hours
              </FormDescription>
              <FormControl>
                <Textarea
                  onChange={(e) => updateCharCount(e.target.value)}
                  placeholder="What am I feeling"
                />
              </FormControl>
            </FormItem>
          )}
        />
        {form.formState.errors.content && (
          <p>{form.formState.errors.content.message}</p>
        )}
        <div className="text-sm w-full flex items-center justify-between mt-3">
          <span className="flex">
            <p className={`${charCount > 316 ? 'text-red-500' : ''}`}>
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
