import fetchPosts from '@/lib/data'
import PostCard from './post-card'

export default async function PostsContainer() {
  const posts = await fetchPosts()

  return (
    <div className="h-screen">
      {posts.map((post) => (
        <PostCard key={post.id} content={post.content} />
      ))}
    </div>
  )
}
