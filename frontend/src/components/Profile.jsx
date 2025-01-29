import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link, useParams } from 'react-router-dom'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { AtSign, Heart, MessageCircle } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, selectSelectedProfile } from '@/store/user/user.selector'
import { fetchSelectedProfileStart } from '@/store/user/user.action'
import CommentDialog from './CommentDialog'
import { fetchSelectedPostStart } from '@/store/post/post.action'

const Profile = () => {
  const dispatch = useDispatch();
  const selectedProfile = useSelector(selectSelectedProfile);
  const currentUser = useSelector(selectCurrentUser);
  const params = useParams();
  const targetId = params.id;
  const [selectedTab, setSelectedTab] = useState("posts");
  const [openCommentDialog, setOpenCommentDialog] = useState(false);

  const posts = selectedTab == "posts" ? selectedProfile?.posts : selectedProfile?.bookmarks;

  useEffect(() => {
    if(selectedProfile?._id != targetId) {
      dispatch(fetchSelectedProfileStart(targetId));
    }
  }, [targetId]);

  const handlePostClick = (postId) => {
    dispatch(fetchSelectedPostStart([postId]));
    setOpenCommentDialog(true);
    console.log("post click");
  }

  return (
    <div className='flex max-w-5xl justify-center mx-auto pl-10'>
      <div className='flex flex-col gap-20 p-8'>
        <div className='grid grid-cols-2'>
          <section className='flex items-center justify-center'>
            <Avatar className="h-32 w-32">
              <AvatarImage srd={selectedProfile?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className='flex flex-col gap-5'>
              <div className='flex items-center gap-2'>
                <span>
                  {selectedProfile?.username}
                </span>
                {
                  selectedProfile?._id == currentUser._id ? (
                    <>
                      <Link to="/account/edit"><Button variant="secondary" className="hover:bg-gray-200 h-8">Edit profile</Button></Link>
                      <Button variant="secondary" className="hover:bg-gray-200 h-8">View archive</Button>
                    </>
                  ) : (
                    <>
                      {
                        currentUser.following.includes(selectedProfile?._id) ? (<Button variant="secondary" className="hover:bg-gray-200 h-8">Unfollow</Button>)
                          : (<Button variant="secondary" className="hover:bg-gray-200 h-8">Follow</Button>)
                      }

                      <Button variant="secondary" className="hover:bg-gray-200 h-8">Send message</Button>
                    </>
                  )
                }


              </div>
              <div className='flex items-center gap-4'>
                <p><span className='font-semibold'>{selectedProfile?.posts.length} </span>post</p>
                <p><span className='font-semibold'>{selectedProfile?.followers.length} </span>fllowers</p>
                <p><span className='font-semibold'>{selectedProfile?.following.length} </span>following</p>
              </div>
              <div className='flex flex-col gap-1'>
                <span className='font-semibold'>{selectedProfile?.bio}</span>
                <Badge className='w-fit' variant="secondary"><AtSign /><span className='pl-1'>{selectedProfile?.username}</span></Badge>
                <span>🤯Learn code with patel mernstack style</span>
                <span>🤯Turing code into fun</span>
                <span>🤯DM for collaboration</span>
              </div>
            </div>

          </section>
        </div>
        <div className='border-t border-t-gray-200'>
          <div className='flex items-center justify-center gap-10 text-sm'>
            <span onClick={() => setSelectedTab("posts")} className={`py-3 cursor-pointer ${selectedTab == 'posts' ? 'font-bold' : ""}`}>POSTS</span>
            <span onClick={() => setSelectedTab("saved")} className={`py-3 cursor-pointer ${selectedTab == 'saved' ? 'font-bold' : ""}`}>SAVED</span>

          </div>
          <div className='grid grid-cols-3 gap-1'>
            {
              posts && posts.map((post) => {
                return (
                  <div onClick={() => handlePostClick(post._id)} key={post._id} className='relative group cursor-pointer'>
                    <img src={post.image} alt="post_image" className='rounded-sm my-2 w-full aspect-square object-cover' />
                    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                      <div  className='flex items-center text-white space-x-4'>
                        <button className='flex items-center gap-2 hover:text-gray-300'>
                          <Heart />
                          <span>{post.likes.length}</span>
                        </button>
                        <button  className='flex items-center gap-2 hover:text-gray-300'>
                          <MessageCircle />
                          <span>{post.comments.length}</span>
                        </button>

                      </div>

                    </div>

                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      <CommentDialog openCommentDialog={openCommentDialog} setOpenCommentDialog={setOpenCommentDialog}/>
    </div>
  )
}

export default Profile