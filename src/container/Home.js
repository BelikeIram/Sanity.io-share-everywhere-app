import { Sidebar, UserProfile} from "../components";
import {HiMenu} from 'react-icons/hi'
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'
import { useState, useEffect, useRef } from "react";
import { userQuery } from "../utils/data";
import { client } from "../Client";
import {AiFillCloseCircle} from 'react-icons/ai'
import { Routes, Route } from "react-router-dom";
import {Pin} from './Pin'
import { CreateUser } from "../utils/User-utility";

const Home = ()=>{
  const [ToggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState()
  const scrollRef = useRef(null);
  
  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
     scrollRef.current.scrollTo = (0,0)
  }, [])
  
   return(
      <div className="flex md:flex-row flex-col h-screen transition-height duration-75 ease-out"
         style={{background:'#4f014f'}}
       >
          <div className="hidden md:flex flex-initial bg-white"
          >
          <Sidebar user={user && user}/>
          </div>
          <div className="flex md:hidden flex-row ">
             <div className="flex flex-row justify-between items-center shadow-md p-2 w-full">
                 <HiMenu fontSize={30} className={'cursor-pointer bg-white '} onClick={()=>setToggleSidebar(true)}/>
                 <Link to={'/'}>
                 <img className="w-28" src={logo} alt='/'/>
              </Link>
              <Link to={`user-profile/${user?._id}`}>
              <img src={user?.image} alt="user-pic" className="w-9 h-9 rounded-full " />
              </Link>
             </div>
         { ToggleSidebar && (
             <div className="w-4/5 h-screen fixed shadow-md overflow-y-auto z-10 animate-slide-in bg-white">
                <div className="absolute flex justify-end cursor-pointer w-full pt-5 pr-2">
                   <AiFillCloseCircle fontSize={30} onClick={()=>setToggleSidebar(false)}/>
                </div>
                <Sidebar user={user && user} closeToggle={setToggleSidebar}/>
             </div>
         )} 
         </div>
         <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
            <Routes>
                <Route path='/user-profile/:user' element={<UserProfile/>}/>
                <Route path='/*' element={<Pin user={user&&user}/>}/>
            </Routes>
         </div>
      </div>
      )
}
export default Home;