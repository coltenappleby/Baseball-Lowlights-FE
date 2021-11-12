import React, {useState} from 'react'
import { Link } from 'react-router-dom'


function CommentCard({content, username, userId, id, deleteComment}) {
  const [text, setText] = useState(content)
  const [isEditMode, setIsEditMode] = useState(false)

  const loggedInUserId = parseInt(window.sessionStorage.getItem("currentUserId"))

  function handleClick(e){
    setIsEditMode(true)
  }
  function handleChange(e) {
    setText(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()

    fetch(`${process.env.REACT_APP_API_END_POINT}/comments/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": 'application/json',
      "Accept": 'application/json'
    },
    body: JSON.stringify({content: text})
    })

    setIsEditMode(false)
  }

  function handleDeleteClick(e){
    e.preventDefault()

    fetch(`${process.env.REACT_APP_API_END_POINT}/comments/${id}`, {method: "DELETE"})
    setIsEditMode(false)

    deleteComment(id)
  }


  return (
    <div className="comment-card">
      
      <p>Posted By: <Link to={`/users/${userId}`}>{username}</Link></p>
      {!isEditMode ? (
        <p>{text}</p>
      ) : (
        <form onSubmit = {handleSubmit}>
          <textarea name="content" value= {text} onChange = {handleChange} rows="8" cols="60"></textarea>
          <input type="submit"/>
        </form> 
      )}
      <div className="comment-buttons">
        {loggedInUserId === userId && <button onClick={handleClick}>Edit Comment</button> }
        {loggedInUserId === userId && <button onClick={handleDeleteClick}> 🗑️ </button> }
      </div>
      
    </div>
    ) 




}

export default CommentCard;