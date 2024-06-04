
// import React from 'react'
import { useSelector } from 'react-redux'
import {Container,Logo, LogoutBtn} from '../index'
import { Link, useNavigate } from 'react-router-dom'


function Header() {
  const authStatus = useSelector((state)=>state.auth.status)
  const navigate = useNavigate()
  const navItems = [
    {
      name:'Home',
      slug:'/',
      active:true
    },
    {name:'Login',
      slug:'/login',
      active: !authStatus,
    },
    {
      name:"Signup",
      slug:"/signup",
      active:!authStatus,
    },
    {
      name:'All Posts',
      slug:'/all-posts',
      active:authStatus,
    },
    {
      name:"Add Post",
      slug:'add-post',
      active:authStatus
    }
  ]
  return (
    <div>
      <header className='py-3 shrink bg-gray-500'>
        <Container>
          <nav className='flex'>
            <div className='mr-4 '>
              <link to="/">
                <Logo width='70px'></Logo>
              </link>
            </div>
            
          </nav>
        </Container>
      </header>
    </div>
  )
}

export default Header
