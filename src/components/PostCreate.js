import React, { useState } from "react"

function PostCreate({posts, setPosts, setShowForm}) {
    const [formData, setFormData] = useState({
        title: "",
        media_link: "",
        media_type: "video",
        team1: "none",
        team2: "none",
        description: "",
        user_id: window.sessionStorage.getItem("currentUserId")
    })
    const [errors, setErrors] = useState([])

    
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
        .then((newPost) => {
            if(newPost.id) {
                setPosts([newPost, ...posts])
                setFormData({
                    title: "",
                    media_link: "",
                    media_type: "image/gif",
                    team1: "none",
                    team2: "none",
                    description: "",
                    user_id: window.sessionStorage.getItem("currentUserId")
                })
                setErrors([])
                setShowForm(false)
            }
            else {
                setErrors(newPost)
            }    
        })

    }
    
    const teams = ['Arizona Diamondbacks','Atlanta Braves','Baltimore Orioles','Boston Red Sox','Chicago Cubs','Chicago White Sox','Cincinnati Reds','Cleveland Indians','Colorado Rockies','Detroit Tigers','Houston Astros','Kansas City Royals','Los Angeles Angels','Los Angeles Dodgers','Miami Marlins','Milwaukee Brewers','Minnesota Twins','New York Mets','New York Yankees','Oakland Athletics','Philadelphia Phillies','Pittsburgh Pirates','San Diego Padres','San Francisco Giants','Seattle Mariners','St. Louis Cardinals','Tampa Bay Rays','Texas Rangers','Toronto Blue Jays','Washington Nationals']
    const teamSelectOptions = teams.map((team, index) => <option key={team + index} value={team}>{team}</option>)

    const errorsDisplay = errors.map((e, index) => <p key={e + index} style={{color: "red"}}>{e}</p>)

    const mediaLinkPlaceholder = "To submit a video:\n1. Click the share button on the video in question\n2. Find the embed option\n3. Copy and paste the 'iframe' into this section"
    const descriptionPlaceholder = "Use this section and categorize post-type as 'text' to submit a text-only post"

    return (
        <>
            {errors.length > 0 && <div>{errorsDisplay}</div>}
        
            <form className="post-form"onSubmit={handleSubmit}>
                <label>Title: </label><br/>
                <input type="text" name="title" value={formData.title} onChange={handleChange}/><br/>
                <div className="post-form-middle-row">
                    <div className="post-form-middle-row-input">
                        <label>Post Type: </label><br/>
                        <select name="media_type" onChange={handleChange}>
                            <option value="video">Video</option>
                            <option value="image/gif">Image/Gif</option>
                            <option value="text">Text</option>
                        </select><br/>
                    </div>
                    <div className="post-form-middle-row-input">   
                        <label>Team1: </label><br/>
                        <select name="team1" value={formData.team1} onChange={handleChange}>
                            <option value="none">none</option>
                            {teamSelectOptions}
                        </select><br/>
                    </div>
                    <div className="post-form-middle-row-input">
                        <label>Team2: </label><br/>
                        <select name="team2" value={formData.team2} onChange={handleChange}>
                            <option value="none">none</option>
                            {teamSelectOptions}
                        </select><br/>
                    </div>
                </div>
                <label>Media Link: </label><br/>
                <textarea 
                    name="media_link"
                    placeholder={mediaLinkPlaceholder} 
                    value={formData.media_link} 
                    onChange={handleChange}
                    rows="8"
                    cols="60"
                /><br/>
                <label>Description: </label><br/>
                <textarea 
                    name="description"
                    placeholder={descriptionPlaceholder} 
                    value={formData.description} 
                    onChange={handleChange}
                    rows="8"
                    cols="60"
                /><br/>
                <input type="submit" />
            </form>
        </>
    )

}

export default PostCreate;