import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { toast } from 'sonner'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoading, selectNavigateToHome } from '@/store/user/user.selector'
import { loginUserStart } from '@/store/user/user.action'

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);
  const navigateToHome = useSelector(selectNavigateToHome);

  useEffect(() => {
      if(navigateToHome)
        navigate('/');
  },
  [navigateToHome]);

  const changeInputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const onSubmitSignUp = async (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(loginUserStart(input.email, input.password));
  }

  return (
    <div className='flex items-center w-screen h-screen justify-center'>
      <form onSubmit={onSubmitSignUp} className='shadow-lg flex flex-col gap-5 p-8'>
        <div className='my-4'>
          <h1 className='text-center font-bold text-xl'>LOGO</h1>
          <p className='text-sm text-center'>Login to see photos and videos from your friends</p>
        </div>
        <div>
          <span className='font-medium float-left my-2'>Email</span>
          <Input
            type="email"
            value={input.email}
            name="email"
            onChange={changeInputHandler}
            className="focus-visible:ring-transparent " />
        </div>
        <div>
          <span className='font-medium float-left my-2'>Password</span>
          <Input
            type="password"
            value={input.password}
            name="password"
            onChange={changeInputHandler}
            className="focus-visible:ring-transparent " />
        </div>
        {
          loading ? (
            <Button>
              <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
              Please wait
            </Button>
          ) : (
            <Button type="submit">Login</Button>
          )
        }
        
        <span className='text-center'>Don't have an account? <Link to="/Signup" className='text-blue-600'>Signup</Link></span>
      </form>
    </div>
  )
}

export default Login