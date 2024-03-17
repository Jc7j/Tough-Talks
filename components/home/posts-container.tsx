import { fetchPosts } from '@/lib/data'
import PostCard from './post-card'

export default async function PostsContainer() {
  const posts = await fetchPosts()

  return (
    <div className="grid grid-cols-6  gap-4 p-10">
      {posts.map((post) => (
        <PostCard key={post.id} id={post.id} content={post.content} timeTillExpire={post.timeTillExpire}/>
      ))}
    </div>
  )
}
