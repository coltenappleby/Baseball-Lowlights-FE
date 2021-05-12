import React from 'react'


function CommentCard({content, username, updatedAt}) {


    return (
        <li>
          <p>Posted By: {username}</p>
          <p>{content}</p>
          <p>Updated At: {updatedAt}</p>
        </li>
      ) 




}

export default CommentCard;