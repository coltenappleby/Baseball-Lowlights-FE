import React, { useState } from "react"

function PostCreate({posts, setPosts}) {
    const [formData, setFormData] = useState({
        title: "",
        media_link: "",
        media_type: "",
        team1: "",
        team2: "",
        description: "",
        user_id: window.sessionStorage.getItem("currentUserId")
    })

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`http://localhost:3000/posts/`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(newPost => setPosts([...posts, newPost].reverse()))
    }



    return (
        <div>
        {/* {errors ? <p style={{color: "red"}}>{errors[0]}</p> : null} */}
        <form onSubmit={handleSubmit}>
            <label>Title: </label>
            <input type="text" name="title" value={formData.title} onChange={handleChange}/><br />
            <label>Description: </label>
            <input type="text" name="description" value={formData.description} onChange={handleChange}/><br />
            <label>Media Link: </label>
            <input type="text" name="media_link" value={formData.media_link} onChange={handleChange}/><br />
            <label>Media Type: </label>
            <input type="text" name="media_type" value={formData.media_type} onChange={handleChange}/><br />
            <label>Team1: </label>
            <input type="text" name="team1" value={formData.team1} onChange={handleChange}/><br />
            <label>Team2: </label>
            <input type="text" name="team2" value={formData.team2} onChange={handleChange}/><br />
            <input type="submit" />
        </form>
        </div>
    )

}

export default PostCreate;