import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostCard from './PostCard.js'

function UserShow() {
    const [user, setUser] = useState("")

    let { id } = useParams()
    
    useEffect( () => {
        fetch(`http://localhost:3000/users/${id}`)
            .then(res => res.json())
            .then(setUser)
    }, [id])

    
    let postCards
    if(user) {
      const sortedPosts = user.posts.sort((a, b) => b.id - a.id)
      postCards = sortedPosts.map((post) => <PostCard {...post} key = {post.id} />)  
    }

    return(
        <div>
            <h1>{user.username}'s Posts</h1>
            <div className="post-cards-container">
                {postCards}
            </div>
        </div>
    )

}

export default UserShow;