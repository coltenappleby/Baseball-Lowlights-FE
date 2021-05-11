import React from 'react'


function CommentCard({content, username, updatedAt}) {


    return (
        <li>
          <p>{content}</p>
          <p>Posted By: {username}</p>
          <p>Updated At: {updatedAt}</p>
        </li>
      ) 




}

export default CommentCard;