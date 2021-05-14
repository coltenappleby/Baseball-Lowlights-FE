import React from 'react'
import PostCard from './PostCard'
import { useState } from 'react'
import PostCreate from './PostCreate'
import Filter from './Filter'

function PostList({ posts, setPosts, removePost }){
  
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")


  function toggleShowForm() {
    setShowForm(showForm => !showForm)
  }

  const filteredPosts = posts.filter((post) => {
    if (searchTerm.toUpperCase() === "GENERAL") {
      return (post.team1 === "none" && post.team2 === "none")
    } 

    return (post.team1.toUpperCase().includes(searchTerm.toUpperCase()) 
           || post.team2.toUpperCase().includes(searchTerm.toUpperCase())) 
  })

  const postCards = filteredPosts.map((post) => {
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
      <Filter setSearchTerm={setSearchTerm} searchTerm={searchTerm}/>
      <div className="post-cards-container">
        {postCards}
      </div>
    </div>
  )
}

export default PostList