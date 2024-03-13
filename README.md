To run this (Only runnable in local if you have the .env.local file):

1. git clone
2. pnpm install
3. pnpm run dev
4. Go to [localhost](http://localhost:3000)
5. Click signup then youll be redirect through [Kinde's](https://kinde.com/) auth, then redirected to the homepage.

- If you try to return back to localhost:3000, youll be redirected back to localhost:3000/home

Todo:

1. Fully anon tweeting?
2. Use a cron job to check every hour any timeTillExpired is expired then delete expired ones ?
3. Add functionality to fetchCardData and this will be dynamic (streaming) as cards will be continuously added and deleted.
4. Ensure Users can only post twice or whatever amount of days.
