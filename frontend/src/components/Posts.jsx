import React from 'react'
import Post from './Post'

const Posts = () => {
  return (
    <div>
        {[1,2,3,4,5].map((post, index) =>{
            return (<Post key={index}/>)
        })}
    </div>
  )
}

export default Posts