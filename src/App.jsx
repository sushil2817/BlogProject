
import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appWrite/auth'
import {login, logout} from './store/authSlice'
import { Header,Footer } from './components/index'
import { Outlet } from 'react-router-dom'

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL);

  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .catch((error)=>(console.log("feacing problem in login: ",error)))
    .finally(()=>(
      setLoading(false)
    ))
  },[])
  

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header></Header>
        <main>
        TOdO:
          {/* <Outlet/> */}
        </main>
        <Footer></Footer>
      </div>
    </div>
  ):null
}

export default App
