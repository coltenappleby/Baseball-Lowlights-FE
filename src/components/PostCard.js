import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function PostCard({
  id,
  title,
  mediaLink,
  mediaType,
  description,
  team1, 
  team2,
  likesCount,
  username 
}) {
  // const [mediaElement, setMediaElement] = useState("")
  // // https://www.youtube.com/oembed?url=https%3A//

  // useEffect( () => {
  //   fetch(`https://www.youtube.com/oembed?url=https%3A//${mediaLink}`)
  //   .then(res => res.json())
  //   .then(console.log)
  // })
  
  function createIFrame(embedLink, mediaType) {
    if (mediaType === "video") {
      const widthLoc = embedLink.indexOf("width=") // +7
      const heightLoc = embedLink.indexOf("height=")  // +8
      const srcLoc = embedLink.indexOf("src=") // +5
      const titleLoc = embedLink.indexOf("title=")

      const width = embedLink.slice(widthLoc+7, widthLoc+10)
      const height = embedLink.slice(heightLoc+8, heightLoc+11)
      const link = embedLink.slice(srcLoc+5, titleLoc-2)

      // <iframe width=\"560\" height=\"315\"src=\"https://www.youtube.com/embed/YDHihWAKicI\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>
      return  <div><iframe width = {width} height = {height} src = {link} title = {"YouTube video player"} frameBorder = {0}>  </iframe></div>
    } else {
      return <div><img src={embedLink} alt={title}/></div>
    }
  }
    

  return (
    <li>
      <Link to={`/posts/${id}`}><h3>{title}</h3></Link>
      <p>Posted By: {username}</p>
      <p>Teams involved: {team1}, {team2}</p>
      {createIFrame(mediaLink, mediaType)}
      <p>{description}</p>
      <p>likes: {likesCount}</p>
    </li>
  ) 
}

export default PostCard