import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentCard from './CommentCard.js'
import CommentCreate from './CommentCreate.js'

function PostShow(){
  const [postData, setPostData] = useState("")
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
        setPostData(data)
      }
    })
  }, [id])

  let mediaHtml
  
  if (postData.mediaType === "gif" || postData.mediaType === "image/gif") {
    mediaHtml = <div><img src={postData.mediaLink} alt={postData.title}/></div>
  }
  else if (postData.mediaType === "video") {
    mediaHtml = <div dangerouslySetInnerHTML={{__html: postData.mediaLink}}></div>
  }

  function removeComment(id) {
    const filteredComments = [...postData.comments].filter((comment) => comment.id !== id)
    setPostData({...postData, comments: filteredComments})
  }

  let commentCards

  if(postData.comments) {
    const sortedComments = [...postData.comments].sort((a,b) => b.id-a.id)
    commentCards = sortedComments.map((comment) => <CommentCard {...comment} key = {comment.id} deleteComment = {removeComment}/>)
  }

  return (
    <>
      {errors ? <div><h1>{errors}</h1></div> :
      <>
        <div> 
          <h3>{postData.title}</h3>
          <p>Posted By: {postData.username}</p>
          <p>Teams involved: {postData.team1}, {postData.team2}</p>
          {mediaHtml}
          <p>{postData.description}</p>
          <p>likes: {postData.likesCount}</p>
        </div>
        <div className="comment-section">
          <h3>Comments</h3>
          <CommentCreate setPostData = {setPostData} postData = {postData} postId = {id} />
          <ul>{commentCards} </ul>
        </div>
      </>}
    </>
  )
}

export default PostShow