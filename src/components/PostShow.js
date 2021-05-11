import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function PostShow(){
  const [postData, setPostData] = useState("")
  const [errors, setErrors] = useState("")
  let { id } = useParams()

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`)
    .then(resp => resp.json())
    .then((data) => {
      console.log(data)
      // if (data.error) {
      //   setErrors(data.error)
      // }
      // else {
      //   setPostData(data)
      // }
    })
  }, [])

  let mediaHtml
  
  if (postData.mediaType === "gif") {
    mediaHtml = <div><img src={postData.mediaLink} alt={postData.title}/></div>
  }
  else if (postData.mediaType === "video") {
    mediaHtml = <div dangerouslySetInnerHTML={{__html: postData.mediaLink}}></div>
  }


  return (
    <div>
      {errors ? <h1>{errors}</h1> :
      <> 
      <h3>{postData.title}</h3>
      <p>Posted By: {postData.username}</p>
      <p>Teams involved: {postData.team1}, {postData.team2}</p>
      {mediaHtml}
      <p>{postData.description}</p>
      <p>likes: {postData.likesCount}</p>
      </>}
      
    </div>
  )
}

export default PostShow