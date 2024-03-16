'use client'

import { useState, useCallback } from 'react'
import debounce from 'lodash/debounce'
import { useFormState } from 'react-dom'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

import { Button } from '../ui/button'
import { postContent } from '@/lib/data'

export default function CreatePost() {
  const [charCount, setCharCount] = useState(0)
  const { user } = useKindeBrowserClient()

  const initialState = { message: '', errors: {} }
  const postContentWithId = useCallback(
    postContent.bind(null, user?.id ?? ''),
    [user?.id]
  )

  const [state, dispatch] = useFormState(postContentWithId, initialState)

  const updateCharCount = useCallback(
    debounce((value) => {
      setCharCount(value.length)
    }, 300),
    []
  )

  return (
    <form action={dispatch}>
      <input
        id="userId"
        name="userId"
        defaultValue={user?.email ?? ''}
        className="hidden"
      />
      <textarea
        className="bg-gray-200 w-full rounded-lg shadow border p-2 text-black"
        placeholder="beep boop..."
        onChange={(e) => updateCharCount(e.target.value)}
        required
        id="content"
        name="content"
      />
      {/* {state.message && (
        <p className="mt-2 text-sm text-red-500">{state.message}</p>
      )} */}
      <div className="w-full flex items-center justify-between">
        <p className="text-sm">{charCount}/316</p>
        <Button variant="default" type="submit">
          Send it
        </Button>
      </div>
    </form>
  )
}
