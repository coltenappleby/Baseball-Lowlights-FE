import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostCard from './PostCard.js'

function UserShow() {
    const [userPosts, setUserPosts] = useState([])

    let { id } = useParams()
    


    useEffect( () => {
        fetch(`http://localhost:3000/users/${id}`)
            .then(res => res.json())
            .then(data => setUserPosts(data.posts))
    }, [id])

    console.log(userPosts)

    let postCards

    if(userPosts) {
      postCards = userPosts.map((post) => <PostCard {...post} key = {post.id} />)  
    }

    return(
        <div>
            <ul> {postCards} </ul>
        </div>
    )





}

export default UserShow;