import React, { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

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
  userId,
  removePost,
  removeUserPost
}) {
  let history = useHistory()
  let location = useLocation()
  const loggedInUserId = parseInt(window.sessionStorage.getItem("currentUserId"))
  const [likeCountCurrent, setLikeCountCurrent] = useState(likesCount)
  const [activeLikes, setActiveLikes] = useState(likes)
  const [isLiked, setIsLiked] = useState(likes.map((like) => like.user_id).includes(loggedInUserId))
  
  let mediaHtml
  
  if (mediaType === "gif" || mediaType === "image/gif") {
    mediaHtml = <div className="media-container"><img src={mediaLink} alt={title}/></div>
  }
  else if (mediaType === "video") {
    mediaHtml = <div dangerouslySetInnerHTML={{__html: mediaLink}} className="media-container"></div>
  }

  function handleLike(e){
    fetch(`${process.env.REACT_APP_API_END_POINT}/likes`, {
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
    
    fetch(`${process.env.REACT_APP_API_END_POINT}/likes/${targetLikeId}`, {method: 'DELETE'})
    
    setIsLiked(false)
    setLikeCountCurrent((likeCountCurrent) => likeCountCurrent-1)
    const filteredLikes = activeLikes.filter((like) => like.id !== targetLikeId)
    setActiveLikes(filteredLikes)

  }

  function handleDelete(e) {
    fetch(`${process.env.REACT_APP_API_END_POINT}/posts/${id}`, {method: 'DELETE'})
    removePost(id)
    if(location.pathname.includes("/users")){
      removeUserPost(id)
    } 
    else {
      history.push("/")
    }
  }

  let teamsDisplay
  if (team1 === "none" && team2 === "none"){
    teamsDisplay = "General Highlight"
  }
  else if (team2 === "none") {
    teamsDisplay = `Team: ${team1}`
  }
  else {
    teamsDisplay = `Teams: ${team1} & ${team2}`
  }

  return (
    <div className="post-card">
      <div className="post-card-likes">
        <div className="post-card-likes-content">
          <div className="post-card-likes-top">
            {!isLiked ? (
              <button onClick={handleLike}>👍</button>
            ) : (
              <button onClick={handleDisLike}>👎</button>
            )}
            <p>Likes:</p>
            <p>{likeCountCurrent}</p>
          </div>

          {loggedInUserId === userId && (
            <div className="post-card-update">
              <Link to={`/posts/${id}/edit`}><button>Edit</button></Link>
              <button onClick={handleDelete}>Delete</button>
            </div>
          )}
        </div>
      </div>
      <div className="post-card-main">
        <div className="post-card-header">
          <p><Link to={`/users/${userId}`}><strong>{username}</strong></Link></p> 
          <p>{teamsDisplay}</p> 
          <Link to={`/posts/${id}`}><h3>{title}</h3></Link>
        </div>
        {mediaHtml}
        <p>{description}</p> 
        
      </div>  
    </div>
  ) 
}

export default PostCard