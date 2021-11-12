import React, { useState } from "react"

function CommentCreate({postId, setComments, comments}) {
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
        fetch(`${process.env.REACT_APP_API_END_POINT}/comments/`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(newComment => {
           const updatedComments = [...comments, newComment]
           setComments(updatedComments)
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