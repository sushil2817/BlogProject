import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appWrite/config'
import {logout} from '../../store/authSlice'


function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () =>{
      authService.logout()
      .then(()=>{
        dispatch(logout())
      }).catch((error)=>{
         console.log("Error in logout: ",error);
      })
    }
  return (
    <div>
      <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100' >Logout</button>
    </div>
  )
}

export default LogoutBtn
