import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import Header from './Components/Header'
import { toast, ToastContainer } from 'react-toastify'
import { MyAuth } from './Pages/firebase'
import { signOut } from 'firebase/auth'
import CreateCode from './Pages/CreateCode'
import Details from './Pages/Details'
import { deleteDoc } from 'firebase/firestore'
import { doc,getDoc } from 'firebase/firestore'
import { MyDB } from './Pages/firebase'
import Update from './Pages/Update'

export default function App() {
  const [user,setuser] = useState(null);  

  useEffect(()=>{
   MyAuth.onAuthStateChanged((user)=>{
    setuser(user);
    console.log(user);
   })
  });


  const signout = ()=>{
    signOut(MyAuth).then(()=>{
      toast.success('SignOut Successfully');            
    }).catch(()=>{
      toast.error("Something went be wrong");
    })
  }
  

  const deletecode = async (id) => {
    try {
      const docRef = doc(MyDB, "codes", id);  
      const docSnap = await getDoc(docRef);  
  
      if (docSnap.exists()) {
        await deleteDoc(docRef); 
        toast.success("Code Deleted Successfully");
        setTimeout(() => {
          location.reload();          
        }, 1000);
      } else {
        toast.error("Code not found");
      }
    } catch (error) {
      toast.error("Error deleting code: " + error.message);
    }
  }

  return (
    <>
    <Router>
      <ToastContainer/>
      <Header user={user} signout={signout}/>
      <Routes>
        <Route path='/' element={<Home user={user} deletecode={deletecode} />}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/details/:id' element={<Details/>} />
        <Route path='/update/:id' element={<Update/>} />
        <Route path='/create' element={<CreateCode user={user}/>}/>
      </Routes>
    </Router>      
    </>
  )
}
