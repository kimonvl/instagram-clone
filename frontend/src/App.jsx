import { useEffect } from 'react'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import MainLayout from './components/MainLayout'
import Profile from './components/Profile'
import Signup from './components/Signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from './store/user/user.selector'
import { selectSocket } from './store/socket/socket.selector'
import { socketConnect } from './store/socket/socket.action'


const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/profile",
        element: <Profile />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
])



function App() {

  const currentUser = useSelector(selectCurrentUser);
  const socket = useSelector(selectSocket);
  const dispatch = useDispatch();

  useEffect(() =>{
    if(currentUser && !socket) {
      dispatch(socketConnect());
    }
  } , [])
  

  return (
    <>
      <RouterProvider router={browserRouter}/>
    </>
  )
}

export default App
