import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MyDB } from './firebase';
import { toast } from 'react-toastify';

function Details() {
    const { id } = useParams();
    const titleRef = useRef(null);
    const coderef = useRef(null);
    const noteRef = useRef(null);
    const [data, setdata] = useState({});

    const cpoied = (ref) => {
        const textToCopy = ref.current.value;

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                toast.success("Copied");
            })
            .catch(err => {
                toast.error("Somrthing went be wrong");
            });
    }

    const viewcode = async (id) => {
        try {
            const docRef = doc(MyDB, "codes", id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log(docSnap.data());
                setdata(docSnap.data());
            } else {
                toast.error("No such document!");
            }
        } catch (error) {
            toast.error("Error getting document: " + error.message);
        }
    }

    useEffect(() => {
        viewcode(id);
    }, [id]);
    return (
        <>
            <div className="flex flex-wrap h-[92vh] flex-col gap-4 p-4 bg-black text-slate-300">
                <div className="w-auto h-auto bg-bg_form text-white rounded-md p-4">
                    <p>Title : </p>
                    <h2 ref={titleRef}>{data.title}</h2>
                    <button onClick={()=>{ cpoied(titleRef) }} className='mt-8 bg-slate-500 border border-black text-white rounded-md p-2'>Copy</button>
                </div>
                <div className="w-auto h-auto bg-bg_form text-white rounded-md p-4">
                    <p>Code : </p>
                    <p ref={coderef}>{data.code}</p>                    
                    <button onClick={()=>{ cpoied(coderef) }} className='mt-8 bg-slate-500 border border-black text-white rounded-md p-2'>Copy</button>
                </div>
                <div className="w-auto h-auto bg-bg_form text-white rounded-md p-4">
                    <label>Note : </label>
                    <p ref={noteRef}>{data.note}</p>
                    <button onClick={()=>{ cpoied(noteRef) }} className='mt-8 bg-slate-500 border border-black text-white rounded-md p-2'>Copy</button>
                </div>
            </div>
        </>
    )
}

export default Details