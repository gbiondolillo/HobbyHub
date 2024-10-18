import React, { useState, useEffect } from 'react';
import PostForm from '../PostForms/PostForm.js';
import PostList from '../PostLists/PostList';
import './Home.css';
import mockApi from '../../api/mockApi';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await mockApi.getPosts();
      setPosts(posts);
      console.log(posts)
    };

    fetchPosts();

    const intervalId = setInterval(fetchPosts, 10000);

    return () => clearInterval(intervalId);
  }, []);


  return (
    <div>
      <h1>Gymnastics</h1>
      <PostForm />
      <PostList posts={posts} />
    </div>
  );
}

export default Home;
