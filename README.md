To run this (Only runnable in local if you have the .env.local file):

1. git clone
2. pnpm install
3. pnpm run dev
4. Go to [localhost](http://localhost:3000)
5. Click signup then youll be redirect through [Kinde's](https://kinde.com/) auth, then redirected to the homepage.

- If you try to return back to localhost:3000, youll be redirected back to localhost:3000/home

Todo:

1. Anon tweeting?
2. Ensure Users can only post twice or whatever amount of days. I think user model needs a `dateOfFirstPost`

3. Use Pusher
   1. Use Pusher to subscribe the posts and update the display
   2. Use Pushed to subsribe the posts and delete if needed

Maybe:

```
  useEffect(() => {
    channel.bind('post-created', function(data) {
      setPosts((prevPosts) => [...prevPosts, data.post]);
    });

    channel.bind('post-expired', function(data) {
      setPosts((prevPosts) => prevPosts.filter(post => post.id !== data.postId));
    });

    // Cleanup
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
    })
```
