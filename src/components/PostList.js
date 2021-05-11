import React from 'react'
import PostCard from './PostCard'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function PostList(){
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/posts')
    .then(resp => resp.json())
    .then(setPosts)
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
      <h1>Recent Posts:</h1>
      <ul>
        {postCards}
      </ul>
      <Link to="/users">click me</Link>
    </div>
  )
}

export default PostList