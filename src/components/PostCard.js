import React from 'react'
import { Link } from 'react-router-dom'
import PostShow from './PostShow'

function PostCard({
  id,
  title,
  mediaLink,
  mediaType,
  description,
  team1, 
  team2,
  likesCount,
  username 
}) {
  
  let mediaHtml
  
  if (mediaType === "gif") {
    mediaHtml = <div><img src={mediaLink} alt={title}/></div>
  }
  else if (mediaType === "video") {
    mediaHtml = <div dangerouslySetInnerHTML={{__html: mediaLink}}></div>
  }

  return (
    <li>
      <Link to={`posts/${id}`}><h3>{title}</h3></Link>
      <p>Posted By: {username}</p>
      <p>Teams involved: {team1}, {team2}</p>
      {mediaHtml}
      <p>{description}</p>
      <p>likes: {likesCount}</p>
    </li>
  ) 
}

export default PostCard