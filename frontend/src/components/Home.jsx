import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Feed from './Feed'
import RightSidebar from './RightSidebar'
import { useDispatch } from 'react-redux'
import { fetchFeedPostsStart } from '@/store/post/post.action'

const Home = () => {
  // fetch post and suggested users here
  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(fetchFeedPostsStart());
  }, [])

  return (
    <div className='flex'>
      <div className='flex-grow'>
        <Feed/>
        <Outlet/>
      </div>
      <RightSidebar/>
    </div>
  )
}

export default Home