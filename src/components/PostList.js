import React from 'react'
import PostCard from './PostCard'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PostCreate from './PostCreate'

function PostList(){
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/posts')
    .then(resp => resp.json())
    .then(allPosts => setPosts(allPosts.reverse()))
  }, [])

  const postCards = posts.map((post) => {
    return (
      <PostCard 
        key={post.id}
        {...post}
      />
    )
  })

  return (
    <div>
      <div> < PostCreate posts = {posts} setPosts={setPosts} /> </div>
      <h1>Recent Posts:</h1>
      <ul>
        {postCards}
      </ul>
    </div>
  )
}

export default PostList