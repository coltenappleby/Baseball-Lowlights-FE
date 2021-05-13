import React from 'react'
import PostCard from './PostCard'
import { useState, useEffect } from 'react'
import PostCreate from './PostCreate'

function PostList(){
  const [posts, setPosts] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3000/posts')
    .then(resp => resp.json())
    .then(setPosts)
  }, [])

  function toggleShowForm() {
    setShowForm(showForm => !showForm)
  }

  function removePost(id) {
    const filteredPosts = posts.filter((post) => post.id !== id)
    setPosts(filteredPosts)
  }

  const postCards = posts.map((post) => {
    return (
      <PostCard 
        key={post.id}
        removePost={removePost}
        {...post}
      />
    )
  })


  return (
    <div>
      <div>
        {showForm ? (
          <>
          <PostCreate posts={posts} setPosts={setPosts}/>
          <button onClick={toggleShowForm}>Cancel</button>
          </>
        ) : (
        <button onClick={toggleShowForm}>Add a Post</button>
        )}
      </div>
      <h1>Recent Posts:</h1>
      <div className="post-cards-container">
        {postCards}
      </div>
    </div>
  )
}

export default PostList