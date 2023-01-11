import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
import { client } from '../Client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { CreateUser } from '../utils/User-utility';
import { Navigate } from 'react-router-dom';

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none'; 

const UserProfile = () => {
  const [user, setUser] = useState()
  const [pins, setPins] = useState();
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('created');
  const navigate = useNavigate();
  const { userId } = useParams();

  const userInfo = CreateUser;
  console.log(client);
  useEffect(() => {
    const query = userQuery(userInfo?.googleId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);
 
  const Logout  = ()=>{
    localStorage.clear();

    Navigate('/login')
  }

  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId);
  
      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  if (!user) {
    return <Spinner message='Loading user profile...'/>
  }
  return (
    <div className="relative pb-2 h-full justify-center items-center">
       <div className='flex flex-col pb-5'>
          <div className='relative flex flex-col mb-7'>     
             <div className='flex flex-col justify-center items-center'>
                 <img
                   className='w-full h-370 2xl:h-510 shadow-lg object-cover'
                   src='https://source.unsplash.com/1600x900/?nature,photography,technology'
                   alt='user-pic'
                 />
                 <img
                 className='rounded-full w-20 h-20 mt-0 shadow-xl'
                 style={{marginTop:'-40px'}}
                 src={user.image}
                 />
                 <h1 className='font-bold text-3xl text-center mt-3'>
                    {user.userName}
                 </h1>
                 <div className='absolute top-0 z-1 right-0 p-2 '>
                    {userId === user._id}
                    <GoogleLogout
                    clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
                    render={(renderProps) => (
                      <button
                        type="button"
                        className="bg-white p-2 rounded-full cursor-pointer shadow-md "
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        <AiOutlineLogout color='red' />
                      </button>
                    )}
                    onLogoutSuccess={Logout}
                    cookiePolicy="single_host_origin"
                  />
                 </div>
             </div>   
             <div className='text-center mb-7 mt-4 '>
               <button
                type='button'
                onClick={(e)=>{
                  setText(e.target.textContent);
                  setActiveBtn('created')
                }}
                 className = {`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
               >
               created
               </button>
               <button
               type='button'
               onClick={(e)=>{
                 setText(e.target.textContent);
                 setActiveBtn('saved')
               }}
                className = {`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
              >
              saved
              </button>
             </div> 
             {pins?.length ?(
              <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
                 <MasonryLayout user={user}/>
              </div>
              ) : (
                <h1>No pins Found</h1>
              )}
          </div>
       </div>
    </div>
  )
}
export default UserProfile;
