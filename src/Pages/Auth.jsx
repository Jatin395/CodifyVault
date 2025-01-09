import React, { useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { MyAuth } from './firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Auth() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [signup, setsignup] = useState(false);
  const navugate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!signup) {
      signInWithEmailAndPassword(MyAuth, form.email, form.password)
        .then(() => {
          toast.success('Sign In Successfully ');
          navugate('/');
        })
        .catch((e) => {
          console.log(e);
          toast.error('Something went be wrong !');
        })
    }
    else {
      if (form.name && form.email && form.password) {
        createUserWithEmailAndPassword(MyAuth, form.email, form.password)
        .then((usercredencil)=>{
          updateProfile(usercredencil.user, {
            displayName: form.name
          })
        })
          .then(() => {
            toast.success('Signed Up Succesfully');
            navugate('/');
          })
          .catch((e) => {
            console.log(e);
            toast.error('Something went be wrong !');
          })
      }
      else{
        toast.error("Please Fill All Inputs Feilds");
      }
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <div className="flex h-[92vh] overflow-hidden justify-center items-center bg-black text-slate-300">
        <form className='border border-slate-300 text-center p-4 m-2 md:p-8 rounded-md flex flex-col gap-4' onSubmit={handleSubmit}>
          <h2>{!signup ? 'Sign In' : 'Sign Up'} </h2>
          {signup && (
            <>
              <div className="">
                <label>Name : </label>
                <input type='text' name='name' className='border border-slate-300 text-black rounded-md p-2' onChange={handleChange} placeholder='Name'></input>
              </div>
            </>
          )}
          <div className="">
            <label>Email : </label>
            <input type='text' name='email' className='border border-slate-300 text-black rounded-md p-2' onChange={handleChange} placeholder='Email'></input>
          </div>
          <div className="">
            <label>Password : </label>
            <input type='password' name='password' className='border border-slate-300 text-black rounded-md p-2' placeholder='Password' onChange={handleChange}></input>
          </div>
          <button type="submit">{!signup ? 'Sign In' : 'Sign Up'}</button>

          <p onClick={() => setsignup(!signup)} className="hover:scale-105 cursor-pointer">
            {!signup ? "Dont Have Account : Sign Up" : "Already Have Account : Sign In"}
          </p>
        </form>
      </div>
    </>
  )
}

export default Auth
