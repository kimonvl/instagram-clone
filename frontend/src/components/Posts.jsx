import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'
import { selectFeedPosts } from '@/store/post/post.selector'

const Posts = () => {

  const feedPosts = useSelector(selectFeedPosts);

  return (
    <div>
        {feedPosts.map((post) =>{
            return (<Post key={post._id} post={post}/>)
        })}
    </div>
  )
}

export default Posts