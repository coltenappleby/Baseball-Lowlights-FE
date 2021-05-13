import React, {useState} from 'react'


function CommentCard({content, username, updatedAt, userId, id, deleteComment}) {
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

    fetch(`http://localhost:3000/comments/${id}`, {
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

    fetch(`http://localhost:3000/comments/${id}`, {method: "DELETE"})
    setIsEditMode(false)

    deleteComment(id)
  }


  return (
    <li>
      
      <p>Posted By: {username}</p>
      {!isEditMode ? 
      <p>{text}</p> :
      <form onSubmit = {handleSubmit}>
        <textarea name="content" value= {text} onChange = {handleChange} rows="4" cols="25"></textarea>
        <input type="submit"/>
      </form> }
      <p>Updated At: {updatedAt}</p>
      {loggedInUserId === userId && <button onClick={handleClick}>Edit Comment</button> }
      {loggedInUserId === userId && <button onClick={handleDeleteClick}> 🗑️ </button> }
  
      
    </li>
    ) 




}

export default CommentCard;