'use client'

import { useEffect } from 'react'

import PostsContainer from '@/components/home/posts-container'

import { useUserPersonalInfoStore } from '@/lib/store/userPersonalInfoStore'

export default function Page() {
  const { fetchUserPersonalInfo } = useUserPersonalInfoStore()

  useEffect(() => {
    fetchUserPersonalInfo()
  }, [fetchUserPersonalInfo])

  return <PostsContainer />
}
