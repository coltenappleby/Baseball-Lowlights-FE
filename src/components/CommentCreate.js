import React, { useState } from "react"

function CommentCreate({postId, setPostData, postData}) {
    const [formData, setFormData] = useState({
        user_id: window.sessionStorage.getItem("currentUserId"),
        post_id: postId,
        content: ""
    })

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`http://localhost:3000/comments/`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(newComment => {
        //    setPostData( ...postData, [e.target.comments] : [...e.target.comments, newComment])

           const updatedComments = [...postData.comments, newComment]
           setPostData({...postData, comments: updatedComments})
        })
        setFormData({user_id: window.sessionStorage.getItem("currentUserId"), post_id: postId, content: ""})
    }

    return(
        <form onSubmit={handleSubmit}>
            <textarea 
                name="content" 
                value={formData.content} 
                onChange={handleChange}
                rows="8"
                cols="60"
            /><br/>
            <input type="submit" />
        </form>
    )


}

export default CommentCreate;