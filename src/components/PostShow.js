import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentCard from './CommentCard.js'
import CommentCreate from './CommentCreate.js'
import PostCard from './PostCard.js'

function PostShow(){
  const [postData, setPostData] = useState([])
  const [comments, setComments] = useState([])
  const [errors, setErrors] = useState("")
  let { id } = useParams()
  
  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`)
    .then(resp => resp.json())
    .then((data) => {
      if (data.error) {
        setErrors(data.error)
      }
      else {
        setPostData([data])
        setComments(data.comments)
      }
    })
  }, [id])

  function removeComment(id) {
    const filteredComments = comments.filter((comment) => comment.id !== id)
    setComments(filteredComments)
  }

  let commentCards
  const sortedComments = [...comments].sort((a,b) => b.id-a.id)
  commentCards = sortedComments.map((comment) => <CommentCard {...comment} key = {comment.id} deleteComment = {removeComment}/>)


  const postCards = postData.map((post) => {
    return (
      <PostCard 
        key={post.id}
        {...post}
      />
    )
  })

  return (
    <>
      {errors ? <div><h1>{errors}</h1></div> :
      <>
        <div className="post-cards-container">
          {postCards}
        </div>
      
        <div className="comment-section">
          <h3>Comments</h3>
          <CommentCreate setComments = {setComments} comments = {comments} postId = {id} />
          <ul>{commentCards} </ul>
        </div>
      </>}
    </>
  )
}

export default PostShow;