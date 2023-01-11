import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';

import { client, urlFor } from '../Client';
import { CreateUser } from '../utils/User-utility';

const PinSingle = ({ pin }) => {

  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const navigate = useNavigate();

  const { postedBy, image, _id, destination, save } = pin;

  const user = CreateUser;

  let alreadySaved = !!(save?.filter((item) => item?.postedBy?._id === user?.googleId)?.length);

  const savePin = (id) => {
    debugger
    if (!alreadySaved) {
      setSavingPost(true);

      client
        .patch(id) 
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: user?.googleId,
          postedBy: {
            _type: 'postedBy',
            _ref: user?.googleId,
          },
        }])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        });
    }
  };

  const deletePin = (id)=>{
     client
     .delete(id)
     .then(()=>{
       window.location.reload();
     })
  }

  return (
    <div className="m-2 h-auto">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className=" relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
          {image && (
        <img className="rounded-lg w-full" src={(urlFor(image).width(250).url())} alt="user-post" /> )}
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50 hover:transition-all duration-500 ease-in"
            style={{ height: '100%' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                ><MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button  type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none'> {save?.length} Saved</button>
              ): (
                <button 
                type='button' 
                className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none' 
                onClick={(e)=>{e.stopPropagation(); 
                savePin(_id)}}>Save</button>
              )}
            </div>
            <div className='flex w-full justify-between'>
            {destination && (
              <a
              href={destination} 
              target="_blank"
              rel='noneferrer'
              className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-2 hover:shadow-md opacity-75 hover:opacity-100 rounded-xl'> 
              <BsFillArrowUpRightCircleFill/>
                  {destination.length > 20 ? destination.slice(8,20): destination.slice(8)}
              </a>
              )}
              {postedBy?._id === user?.googleId &&(
                <button
                 className='bg-white opacity-70 hover:opacity-100 text-black font-bold px-3 py-1 text-base rounded-full hover:shadow-md outlined-none'
                 onClick={(e)=>{
                   e.stopPropagation();
                   deletePin(_id);
                 }}
                >
                   <AiTwotoneDelete/>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link 
      to={`user-profile/${user?.id}`} 
      className='flex gap-2 mt-2 items-center'>
      <img 
      className='rounded-full w-8 h-8'
      src={postedBy?.image}
      alt='user-profile'
      />
      <p className='font-semibold text-white capitalize'>{postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default PinSingle;