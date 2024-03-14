import fetchPosts from '@/lib/data'
import PostCard from './post-card'

export default async function PostsContainer() {
  const posts = await fetchPosts()

  return (
    <div className="flex justify-center items-center relative p-6 h-screen w-screen">
      {posts.map((post) => (
        <PostCard key={post.id} id={post.id} content={post.content} />
      ))}
    </div>
  )
}
