const posts = [
  {
    id: '1a2b3c4d',
    postContent: 'This is my first post. Feeling excited!',
    timeTillExpire: new Date(Date.now() + 600000).toISOString(), // Expires in 10 minutes
  },
  {
    id: '2b3c4d5e',
    postContent: 'Exploring the city today, found a cool new café.',
    timeTillExpire: new Date(Date.now() + 1200000).toISOString(), // Expires in 20 minutes
  },
  {
    id: '3c4d5e6f',
    postContent: 'Had a great workout session this morning!',
    timeTillExpire: new Date(Date.now() + 1800000).toISOString(), // Expires in 30 minutes
  },
  {
    id: '4d5e6f7g',
    postContent: 'Current read: Deep Work by Cal Newport. Highly recommend it.',
    timeTillExpire: new Date(Date.now() + 2400000).toISOString(), // Expires in 40 minutes
  },
  {
    id: '5e6f7g8h',
    postContent: "Trying out new recipes, today it's homemade pizza 🍕",
    timeTillExpire: new Date(Date.now() + 3000000).toISOString(), // Expires in 50 minutes
  },
]
