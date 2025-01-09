import { collection, doc, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MyDB } from './firebase';
import { getDocs } from 'firebase/firestore';

function Home({ user,deletecode }) {
  const userid = user?.uid;
  const [loading, setLoading] = useState(true);
  const [codes, setCodes] = useState([]);
  const navigate = useNavigate();

  const details = (id)=>{
    navigate(`details/${id}`);
  }
  

  useEffect(() => {
    const fetchCodes = async () => {
      const q = query(collection(MyDB, "codes"), where("userid", "==", userid));
      const snapshot = await getDocs(q);
      const codeData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setCodes(codeData);
      setLoading(false);
    }
    fetchCodes();
  }, [userid]);
  return (
    <>
      {!userid && (
        <>
          <div className="h-[92vh] flex justify-center items-center overflow-y-hidden bg-black text-white">
            <h2 className='m-1 text-xl font-semibold font-mono'>Start To Save Your Code By</h2><br />
            <Link className='w-24 flex items-center justify-center h-8 bg-blue-500 rounded-md ml-4 hover:bg-blue-600 font-semibold text-lg' to={'/auth'}>Sign Up</Link>
          </div>
        </>
      )}
      {userid && (
        <>
          {loading && (
            <>
            <div className="flex justify-center h-[92vh] overflow-y-hidden items-center text-center bg-black text-white">
              <h2 className='text-center text-xl font-semibold'>Loading Codes</h2>
            </div>
            </>
          )}
          <div className="flex justify-center overflow-y-auto items-center h-[92vh] bg-black text-center p-4 pt-12 flex-wrap gap-6">
            {codes.map((doc,index) => {
              return (
                <>
                  <div className="w-auto md:w-96 h-auto bg-black border border-white text-white p-4 rounded-md cursor-pointer" key={index}>
                       <h2>{doc.title}</h2>
                       <p>{doc.note}</p>
                       <button onClick={()=>{ details(doc.id) }} className='m-2'><i class="fa-solid fa-eye"></i></button>
                       <button onClick={()=>{ deletecode(doc.id) }} className='m-2'><i class="fa-solid fa-trash"></i></button>
                       <button onClick={()=>{ navigate(`update/${doc.id}`) }} className='m-2'><i class="fa-regular fa-pen-to-square"></i></button>
                  </div>
                </>
              )
            })}
          </div>          
        </>
      )}
      {}
    </>
  )
}

export default Home
