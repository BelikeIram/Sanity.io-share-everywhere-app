import GoogleLogin from "react-google-login";
import {HiMenu} from 'react-icons/hi'
import { useNavigate } from "react-router-dom";
import { client } from "./Client";
export const Google = ()=>{
  const navigate = useNavigate();
  const responseHandle = (response)=>{
    console.log(response);
    localStorage.setItem('user', JSON.stringify('response.profileObj'))
    const {googleId, name, imageUrl} = response.profileObj;
     const doc = {
       _id : googleId,
       _type : 'user',
       userName : name,
       image : imageUrl
     }
     client.createIfNotExists(doc).then(()=>{
        navigate('/login', {replace : 'true'})
     })
  }

    return(
        <>
           <div className="h-screen flex align-center justify-center gap-x-6">
             <div className="flex align-center"> 
             <GoogleLogin
               clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
               onSuccess={responseHandle}
               onFailure={responseHandle}
             />
             </div>

           </div>
        </>
    )
}