import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostCard from './PostCard.js'

function UserShow({ removePost }) {
    const [userShowPosts, setUserShowPosts] = useState([])
    const [user, setUser] = useState("")

    let { id } = useParams()
    
    useEffect( () => {
        fetch(`${process.env.REACT_APP_API_END_POINT}/users/${id}`)
            .then(res => res.json())
            .then((userData) => {
                setUserShowPosts(userData.posts)
                setUser(userData)
            })
    }, [id])

    function removeUserPost(id) {
        const filteredPosts = userShowPosts.filter((post) => post.id !== id)
        setUserShowPosts(filteredPosts)
    }
    
    let postCards
    if(user){
      const sortedPosts = userShowPosts.sort((a, b) => b.id - a.id)
      postCards = sortedPosts.map((post) => {
        return (
            <PostCard 
                {...post} 
                key={post.id} 
                removeUserPost={removeUserPost} 
                removePost={removePost} 
            />
        )
      })  
    }

    return(
        <div>
            <h1>{user.username}'s Posts</h1>
            {userShowPosts.length > 0 ? (
                <div className="post-cards-container">
                    {postCards}
                </div>) 
            : (
                <div className="no-user-posts">
                    <p>{user.username} has no posts at the moment. Come back again later!</p>
                </div>
            )}
        </div>
    )

}

export default UserShow;