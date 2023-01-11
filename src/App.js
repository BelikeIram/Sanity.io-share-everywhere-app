import Login from './components/Login'
import Home from './container/Home'
import {Routes, Route, Navigate} from 'react-router-dom'
import { Google } from './google'
const App = ()=>{
    return (
        <>
         <Routes>
           <Route path='/login' element={<Login/>}/>
           <Route path='/*' element={<Home/>}/>
         </Routes>
        </>
    )
}
export default App;