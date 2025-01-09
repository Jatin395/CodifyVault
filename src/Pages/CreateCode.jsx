import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import { MyDB } from './firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CreateCode({ user }) {
  const navigate = useNavigate();
  const userid = user?.uid;
  const [form, setForm] = useState({
    title : "",
    code : "",
    note : "",
    userid : userid || ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to create code");
      return;
    }
    
    if (form.title && form.code) {
      setIsLoading(true);
      try {
        await addDoc(collection(MyDB, "codes"), form);
        toast.success('Code Saved Successfully');
        setForm({ title: "", code: "", note: "", userid: userid }); // Reset form
        navigate('/');
      } catch (err) {
        console.error(err);
        toast.error("Error saving code: " + err.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Fill All The Required Fields");
    }
  }
  const handleChange = (e)=>{
  setForm({...form,[e.target.name]:e.target.value});
  }
  return (
    <>
    <div className="flex h-[92vh] text-center bg-black text-slate-300 justify-center items-center">
        <form className='border w-auto h-auto md:w-[70vw] md:h-[40vw] border-black gap-8 text-center bg-bg_form text-slate-200 justify-center items-center p-4 rounded-md flex flex-col' onSubmit={handleSubmit}>
           <h2 className='text-xl font-semibold'>Create Code</h2>          
            <>
              <div className="">
                <label>Title : </label>
                <input type='text' name='title' className='w-[240px] md:w-[50vw] border text-black border-black p-2' value={form.title} placeholder='Title' onChange={handleChange}></input>
              </div>
            </>          
          <div className="">
            <label>Code : </label>
            <textarea className='border border-black w-[240px] h-[120px] md:w-[50vw] text-black overflow-y-auto p-2' value={form.code} onChange={handleChange} name='code' placeholder='Code'></textarea>
          </div>
          <div className="">
            <label>Notes : </label>
            <input type='text' placeholder='Note' name='note' className='w-[240px] border md:w-[50vw] text-black border-black p-2' value={form.note} onChange={handleChange}></input>
          </div>
          <button 
            type="submit" 
            className='w-40 h-10 hover:shadow-md bg-blue-400 rounded-md text-white hover:bg-blue-500 disabled:bg-gray-400'
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Code'}
          </button>
                     
        </form>                
      </div>
    </>
  )
}

export default CreateCode
