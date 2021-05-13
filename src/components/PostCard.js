import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function PostCard({
  id,
  title,
  mediaLink,
  mediaType,
  description,
  team1, 
  team2,
  likesCount,
  username,
  likes,
  userId
}) {
  // console.log(likes)
  const loggedInUserId = parseInt(window.sessionStorage.getItem("currentUserId"))
  const [isLiked, setIsLiked] = useState(likes.map((like) => like.user_id).includes(loggedInUserId))
  const [likeCountCurrent, setLikeCountCurrent] = useState(likesCount)
  const [activeLikes, setActiveLikes] = useState(likes)

  let mediaHtml
  
  if (mediaType === "gif" || mediaType === "image/gif") {
    mediaHtml = <div className="media-container"><img src={mediaLink} alt={title}/></div>
  }
  else if (mediaType === "video") {
    mediaHtml = <div dangerouslySetInnerHTML={{__html: mediaLink}} className="media-container"></div>
  }

  function handleLike(e){
    fetch(`http://localhost:3000/likes`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      },
      body: JSON.stringify({post_id: id, user_id: loggedInUserId})
    })
    .then(res => res.json())
    .then(newLike => setActiveLikes([...activeLikes, newLike]))
    setLikeCountCurrent((likeCountCurrent) => likeCountCurrent+1)
    setIsLiked(true)
    
  }

  function handleDisLike(e){
    const targetLikeId = activeLikes.find((like) => like.user_id === loggedInUserId).id
    fetch(`http://localhost:3000/likes/${targetLikeId}`, {method: 'DELETE'})
    setIsLiked(false)
    setLikeCountCurrent((likeCountCurrent) => likeCountCurrent-1)
    const filteredLikes = activeLikes.filter((like) => like.id !== targetLikeId)
    setActiveLikes(filteredLikes)

  }

  return (
    <div className="post-card">
      <div className="post-card-likes">
        <div className="post-card-likes-content">
          {!isLiked ? <button onClick={handleLike}>👍</button> :
          <button onClick={handleDisLike}>👎</button>}
          <p>Likes:</p>
          <p>{likeCountCurrent}</p>
        </div>
      </div>
      <div className="post-card-main">
        <div className="post-card-header">
          <p><Link to={`/users/${userId}`}><strong>{username}</strong></Link> | Teams: {team1}, {team2}</p> 
          <Link to={`/posts/${id}`}><h3>{title}</h3></Link>
        </div>
        {mediaHtml}
        <p>{description}</p> 
      </div>  
    </div>
  ) 
}

export default PostCard