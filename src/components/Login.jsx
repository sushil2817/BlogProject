import React,{useState} from 'react'
import { Link,Navigate,useNavigate } from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button, Input, Logo} from './index'
import authService from "../appWrite/auth"
import { set, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

function Login() {

    const navigation = useNavigate()
    const dispatch = useDispatch()
    const {resgister, handleSubmit} = useForm()
    const [error, setError] = useState('')

    const login = async(data)=>{
           setError("")
           try{
               const session = await authService.login(data)
               if(session){
                const userData = await authService.getCurrentUser()
                if(userData){
                    dispatch(authLogin(userData));
                    Navigate("/")
                }
               }
           }catch(error){
               setError(error.message)
           }
    }
  return (
    <div
     className='flex items-center justify-center w-full'
    >
      <div className={`mx-auto rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                       <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%'/>
                       </span>

                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Don&apos;t have any account?&nbsp;
                    <Link type='/signUp' className='font-medium text-primary transition-all duration-200 hover:underline'>
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'> {error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                       <div className='space-y-5'>
                               <Input label="Email:"
                               placeholder="Enter your email"
                               type="email"
                               {...resgister("email",{
                                required:true,
                                validate:{
                                  matchPatern:(value)=>/^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email address must be a valid address"
                                }
                               })}
                                />
                                <Input label="Password:"
                                type="password"
                                placeholder="Enter your password" 
                                 {...resgister("password",{required:true,
                                 })}/>
                                 <Button>Sign in</Button>
                               
                       </div>
                </form>
      </div>
    </div>
  )
}

export default Login
