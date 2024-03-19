'use client'

import React, { useEffect, useState } from 'react'

import PostCard from './post-card'

type Post = {
  id: string
  content: string
  timeTillExpire: string
}

export default function PostsContainer() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok) {
          throw new Error(
            'Network response was not ok. Unable to fetch posts for homepage'
          )
        }

        const data: Post[] = await response.json()
        setPosts(data)
      } catch (error) {
        console.error('Failed to fetch posts:', error)
        // Here, you might want to handle errors, e.g., show a user-friendly message
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 p-3 lg:p-10 items-start">
      {posts.map((post) => {
        return (
          <PostCard
            key={post.id}
            id={post.id}
            content={post.content}
            timeTillExpire={new Date(post.timeTillExpire)}
          />
        )
      })}
    </div>
  )
}
