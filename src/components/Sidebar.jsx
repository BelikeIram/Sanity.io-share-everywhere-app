import { Link, NavLink } from "react-router-dom";
import {RiHomeFill} from 'react-icons/ri'
import {IosIosArrowForward} from 'react-icons/io'
import logo from '../assets/logo.png'
import { categories } from "../utils/data";

const isNotActiveStyle = 'flex items-center gap-3 py-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
const isActiveStyle = 'flex items-center gap-3 py-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize';

const Sidebar = ({user, closeToggle})=>{
  const handleCloseSidebar = ()=>{
    if(closeToggle) closeToggle(false);
  }
    return(
        <>
         <div className="flex flex-col min-w-210 px-5 py-2">
             <div className="flex flex-col">
             <Link
             to="/"
             className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
             onClick={handleCloseSidebar}
           >
             <img src={logo} alt="logo"/>
           </Link>
                <div className="flex flex-col py-5">
                   <NavLink
                   to="/"
                   className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
                   onClick={handleCloseSidebar}
                 >
                   <RiHomeFill />
                   Home
                 </NavLink>
                 <h3 className="text-gray-600 mt-2 py-3">Discover Categories</h3>
                 {categories.slice(0, categories.length-1).map((category)=>(
                    <NavLink to={`/category/${category.name}`} key={category.name} className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)} onClick={handleCloseSidebar}>
                    <img
                      src={category.image}
                      className='w-8 h-8 rounded-full shadow-sm'
                      alt="category-img"
                    />
                    {category.name}
                    </NavLink>
                 ))}
                </div>
             </div>
             {user && (
              <Link to={`user-profile/user._id`} className='flex items-center gap-2 mb-3 my-5 p-2 pt-5  bg-white items-center rounded-lg shadow-lg relative bottom-0' onClick={ handleCloseSidebar }>
                 <img src={user.image} className={'w-10'}/>
                 <p>{user.userName}</p>
              </Link>
             )}
         </div>
        </>
    )
}
export default Sidebar;