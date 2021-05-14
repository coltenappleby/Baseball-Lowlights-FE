import React from 'react'
import PostCard from './PostCard'
import { useState } from 'react'
import PostCreate from './PostCreate'

function PostList({ posts, setPosts, removePost }){
  
  const [showForm, setShowForm] = useState(false)


  function toggleShowForm() {
    setShowForm(showForm => !showForm)
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
          <PostCreate posts={posts} setPosts={setPosts} setShowForm={setShowForm}/>
          <button onClick={toggleShowForm}>Cancel</button>
          </>
        ) : (
        <button onClick={toggleShowForm}>Add a Post</button>
        )}
      </div>
      <h1>Recent Posts</h1>
      <div className="post-cards-container">
        {postCards}
      </div>
    </div>
  )
}

export default PostList