import React, { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom';
import PostCard from './PostCard'


function PostEdit({ removePost }){
    let history = useHistory()
    const { id } = useParams();
    const [postData, setPostData] = useState([])
    const [formData, setFormData] = useState({
        title: "",
        media_link: "",
        media_type: "",
        team1: "",
        team2: "",
        description: "",
        user_id: window.sessionStorage.getItem("currentUserId")
    })
    const [errors, setErrors] = useState([])

    const teams = ['Arizona Diamondbacks','Atlanta Braves','Baltimore Orioles','Boston Red Sox','Chicago Cubs','Chicago White Sox','Cincinnati Reds','Cleveland Indians','Colorado Rockies','Detroit Tigers','Houston Astros','Kansas City Royals','Los Angeles Angels','Los Angeles Dodgers','Miami Marlins','Milwaukee Brewers','Minnesota Twins','New York Mets','New York Yankees','Oakland Athletics','Philadelphia Phillies','Pittsburgh Pirates','San Diego Padres','San Francisco Giants','Seattle Mariners','St. Louis Cardinals','Tampa Bay Rays','Texas Rangers','Toronto Blue Jays','Washington Nationals']
    const teamSelectOptions = teams.map((team, index) => <option key={team + index} value={team}>{team}</option>)


    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_END_POINT}/posts/${id}`)
        .then(res => res.json())
        .then(data => {
            setPostData(data)
            setFormData(data)
        })
    }, [id])


    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault() 
        fetch(`http://localhost:3000/posts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(resp => resp.json())
        .then((updatedPost) => {
            if(updatedPost.id){
                // setErrors([])
                history.push(`/posts/${id}`)
            } else {
                setErrors(updatedPost)
            }
            
        })
        
    }

    const errorsDisplay = errors.map((error, index) => <p key = {index+error} style = {{color: "red"}} > {error} </p>)

    return(
        <div>
            <h1> {formData.title} </h1> 

            {postData.likes && (
            <div className="post-cards-container">
                <PostCard 
                    key={postData.id} 
                    {...postData}
                    removePost={removePost}
                />
            </div>
            )}

            {errors.length > 0 && <div> {errorsDisplay} </div> }

            <form className="post-form"onSubmit={handleSubmit}>
                <label>Title: </label><br/>
                <input type="text" name="title" value={formData.title} onChange={handleChange}/><br/>
                <div className="post-form-middle-row">
                    <div className="post-form-middle-row-input">
                        <label>Post Type: </label><br/>
                        <select name="mediaType" value={formData.mediaType} onChange={handleChange}>
                            <option value="image/gif">Image/Gif</option>
                            <option value="text">Text</option>
                            <option value="video">Video</option>
                        </select><br/>
                    </div>
                    <div className="post-form-middle-row-input">
                        <label>Team1 (required): </label><br/>
                        <select name="team1" value={formData.team1} onChange={handleChange}>
                            {teamSelectOptions}
                        </select><br/>
                    </div>
                    <div className="post-form-middle-row-input">
                        <label>Team2 (optional): </label><br/>
                        <select name="team2" value={formData.team2} onChange={handleChange}>
                            {teamSelectOptions}
                        </select><br/>
                    </div>
                </div>    
                <label>Media Link: </label><br/>
                <textarea 
                    name="mediaLink" 
                    value={formData.mediaLink} 
                    onChange={handleChange}
                    rows="8"
                    cols="60"
                /><br/>
                <label>Description: </label><br/>
                <textarea 
                    name="description" 
                    value={formData.description} 
                    onChange={handleChange}
                    rows="8"
                    cols="60"
                /><br/>
                <input type="submit" />
            </form> 

                                
        </div>
    )


};

export default PostEdit;