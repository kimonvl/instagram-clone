import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Feed from './Feed'
import RightSidebar from './RightSidebar'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFeedPostsStart } from '@/store/post/post.action'
import { selectCurrentUser } from '@/store/user/user.selector'
import { fetchSuggestedUsersStart } from '@/store/user/user.action'
import { fetchOfflineUnseenLikeNotificationsStart } from '@/store/notification/notification.action'

const Home = () => {

  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate()

  useEffect(() => {
    if(!user){
      navigate("/login");
    }
  }, [user]);

  // fetch post and suggested users here
  const dispatch = useDispatch();
  useEffect(() =>{
    if(user) {
      dispatch(fetchFeedPostsStart());
    }
  }, []);

  useEffect(() =>{
    if(user) {
      dispatch(fetchSuggestedUsersStart(user._id));
    }
  }, []);

  useEffect(() =>{
    if(user) {
      dispatch(fetchOfflineUnseenLikeNotificationsStart(user._id));
    }
  }, []);

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