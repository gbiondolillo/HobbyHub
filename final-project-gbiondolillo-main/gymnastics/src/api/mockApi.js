let posts = [
    { 
      id: '1', 
      title: 'Welcome to the Gymnastics Forum!', 
      content: 'Here you can share all your thoughts and information about gymnastics.', 
      imageUrl: 'https://th.bing.com/th/id/R.aee7eb9b539ffab9b2d4f4b22ce86a56?rik=6r1ouitLruqp%2bw&riu=http%3a%2f%2fcliparts.co%2fcliparts%2fdT9%2fraL%2fdT9raL9gc.jpg&ehk=Qdx4zDucyH1hjvbMS8F2PdGzS5YhKLa9RCBmhQwpdFE%3d&risl=&pid=ImgRaw&r=0', 
      createdAt: new Date().toISOString(), 
      upvotes: 5, 
      comments: [
        { id: 'c1', text: 'Really excited about this community!', timestamp: new Date().toISOString() },
        { id: 'c2', text: 'Looking forward to contributing.', timestamp: new Date().toISOString() }
      ]
    },
    { 
      id: '1', 
      title: 'LSU Gymnast', 
      content: 'Who is youre favorite gymnast from LSU? Ours is Livvy Dunne. Upvote for Livvy. ', 
      imageUrl: 'https://th.bing.com/th/id/OIP.oidlFr4kQDoecinG-C6RhAAAAA?rs=1&pid=ImgDetMain', 
      createdAt: new Date().toISOString(), 
      upvotes: 10, 
      comments: [
        { id: 'c1', text: 'She is an amazing gymnast!', timestamp: new Date().toISOString() },
        { id: 'c2', text: 'I want to be as good as her someday!', timestamp: new Date().toISOString() }
      ]
    },
    // Additional posts can be added here
  ];
  
  const simulateDelay = (result) => new Promise(resolve => setTimeout(() => resolve(result), 500));
  
  const mockApi = {
    getPosts: async () => {
      return simulateDelay([...posts]);
    },
  
    getPost: async (id) => {
      const post = posts.find(post => post.id === id);
      if (!post) throw new Error('Post not found');
      return simulateDelay({ ...post });
    },
  
    createPost: async ({ title, content, imageUrl }) => {
      const newPost = {
        id: (Math.random() * 1000000).toFixed(0), 
        title,
        content,
        imageUrl,
        createdAt: new Date().toISOString(),
        upvotes: 0,
        comments: []
      };
      posts = [newPost, ...posts]; 
      return simulateDelay(newPost);
    },
  
    updatePost: async (id, updates) => {
      const index = posts.findIndex(post => post.id === id);
      if (index === -1) throw new Error('Post not found');
      posts[index] = { ...posts[index], ...updates };
      return simulateDelay({ ...posts[index] });
    },
  
    deletePost: async (id) => {
      const lengthBefore = posts.length;
      posts = posts.filter(post => post.id !== id);
      if (posts.length === lengthBefore) throw new Error('Post not found');
      return simulateDelay({ id });
    },
  
    upvotePost: async (id) => {
      const post = posts.find(post => post.id === id);
      if (!post) throw new Error('Post not found');
      post.upvotes += 1;
      return simulateDelay(post.upvotes);
    },
  
    addComment: async (id, comment) => {
      const newComment = {
          id: comment.id || (Math.random() * 1000000).toFixed(0),
          text: comment.text,
          user: comment.user,
          timestamp: new Date().toISOString()
      };
      const post = posts.find(post => post.id === id);
      if (!post) throw new Error('Post not found');
      post.comments.push(newComment);
      return simulateDelay(newComment);
  }
  };
  
  export default mockApi;
  