import React from 'react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'

function Header({ user, signout }) {
    const userid = user?.uid;
    const username = user?.displayName;
    const mobnav = useRef();

    const handlemobnave = () => {
        mobnav.current.classList.toggle('hidden');
    }
    const hndlehide = () =>{
     mobnav.current.classList.add('hidden');
    }
    return (
        <>
            <div className="flex justify-around items-center text-center p-3 h-16 bg-bg_nav text-white">
                <h2 className='text-xl cursor-pointer text-blue-600'><Link to={'/'}>CodifyVault</Link></h2>

                <div className="md:hidden">
                    <button onClick={handlemobnave}><i className="fa-solid fa-bars"></i></button>
                </div>

                <div className="hidden md:flex gap-8 bg-bg_nav">
                    <ul className='flex gap-4 bg-bg_nav'>
                        <li><Link to={'/'} className='bg-bg_nav'>Home</Link></li>
                        <li><Link className='bg-bg_nav' to={'/create'}>Create</Link></li>                        
                    </ul>
                    <ul className='bg-bg_nav'>
                        {!userid && <li><Link className='bg-bg_nav' to={'/auth'}>Login</Link></li>}
                        {userid && (
                            <>
                            <div className="flex gap-8 bg-bg_nav">
                            <li><p className='bg-bg_nav'>{username}</p></li>
                            <li className='bg-bg_nav'><button onClick={signout}>Logout</button></li>
                            </div>
                            </>
                        )}
                    </ul>
                </div>

                <div className="hidden fixed top-0 inset-0 h-[50vh] w-[100vw] p-3 md:hidden bg-bg_form" onClick={hndlehide} ref={mobnav}>
                    <div className="flex justify-around">
                        <h2>CodifyVault</h2>
                        <div className="">
                            <button onClick={handlemobnave}><i className="fa-solid fa-x"></i></button>
                        </div>                        
                    </div>
                    <ul className='text-center flex flex-col gap-8'>
                            <li><Link to={'/'}>Home</Link></li>
                            <li><Link to={'/create'}>Create</Link></li>                                           
                            {!userid && <li><Link to={'/auth'}>Login</Link></li>}
                            {userid && (
                                <>
                                <div className="flex gap-8 text-center md:flex-row flex-col">
                                <li className='cursor-pointer'><p>{username}</p></li>
                                <button onClick={signout}>Logout</button>
                                </div>
                                </>
                            )}
                        </ul>

                </div>
 

            </div>
        </>
    )
}

export default Header
