import { fetchPosts } from '@/lib/data'
import PostCard from './post-card'

export default async function PostsContainer() {
  const posts = await fetchPosts()

  return (
    <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 p-3 lg:p-10 items-start">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          content={post.content}
          timeTillExpire={post.timeTillExpire}
        />
      ))}
    </div>
  )
}
