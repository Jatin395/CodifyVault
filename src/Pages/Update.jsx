import { doc, setDoc } from 'firebase/firestore'; 
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MyDB } from './firebase';
import { toast } from 'react-toastify';
import { getDoc } from 'firebase/firestore';

function Update() {
    const { id } = useParams();  
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        code: "",
        note: ""
    });

    
    const fetchdata = async () => {
        const docRef = doc(MyDB, "codes", id);
        try {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                
                setForm({
                    title: docSnap.data().title || '',
                    code: docSnap.data().code || '',
                    note: docSnap.data().note || ''
                });
            } else {
                toast.error("No such document!");
            }
        } catch (error) {
            toast.error("Error getting document: " + error.message);
        }
    };

     
    useEffect(() => {
        fetchdata();
    }, [id]);

     
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const docRef = doc(MyDB, "codes", id);

            
            await setDoc(docRef, {
                title: form.title,
                code: form.code,
                note: form.note
            }, { merge: true }); 

            toast.success("Code updated successfully!");
            navigate('/');
            
        } catch (error) {
            toast.error("Error updating code: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="flex h-[92vh] text-center justify-center items-center bg-black text-white">
                <form
                    className='border w-auto h-auto bg-bg_form text-slate-300 gap-8 border-black text-center justify-center items-center p-4 rounded-md flex flex-col'
                    onSubmit={handleSubmit}
                >
                    <h2 className='text-xl font-semibold'>Update Code</h2>
                    <div className="">
                        <label>Title : </label>
                        <input
                            type='text'
                            name='title'
                            className='w-[70vw] border border-black p-2 text-black rounded-sm'
                            value={form.title}
                            placeholder='Title'
                            onChange={handleChange}
                        />
                    </div>
                    <div className="">
                        <label>Code : </label>
                        <textarea
                            className='border border-black w-[70vw] h-[40vh] overflow-y-auto p-2 text-black'
                            value={form.code}
                            onChange={handleChange}
                            name='code'
                            placeholder='Code'
                        />
                    </div>
                    <div className="">
                        <label>Notes : </label>
                        <input
                            type='text'
                            name='note'
                            className='w-[70vw] border border-black p-2 text-black'
                            value={form.note}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className='w-40 h-10 bg-blue-400 rounded-md text-white hover:bg-blue-500 disabled:bg-gray-400'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Updating...' : 'Update Code'}
                    </button>
                </form>
            </div>
        </>
    );
}

export default Update;
