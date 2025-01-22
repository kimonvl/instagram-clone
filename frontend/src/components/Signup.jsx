import React, { useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoading } from '../store/user/user.selector'
import { signupUserStart } from '@/store/user/user.action'

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: ""
  })
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);

  const changeInputHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const onSubmitSignUp = async (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(signupUserStart(input.username, input.email, input.password, navigate));
  }

  return (
    <div className='flex items-center w-screen h-screen justify-center'>
      <form onSubmit={onSubmitSignUp} className='shadow-lg flex flex-col gap-5 p-8'>
        <div className='my-4'>
          <h1 className='text-center font-bold text-xl'>LOGO</h1>
          <p className='text-sm text-center'>Sign up to see photos and videos from your friends</p>
        </div>
        <div>
          <span className='font-medium float-left my-2'>Username</span>
          <Input
            type="text"
            value={input.username}
            name="username"
            onChange={changeInputHandler}
            className="focus-visible:ring-transparent " />
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
            <Button type="submit">Signup</Button>
          )
        }
        
        <span className='text-center'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
      </form>
    </div>
  )
}

export default Signup