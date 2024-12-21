import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        setUserData({
            email: email,
            password: password
        })
        setEmail('');
        setPassword('');
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-5 ' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt='' />

                <form onSubmit={(e) => {
                    submitHandler(e);
                }}>
                    <h3 className='p-7 text-lg font-medium  mb-2' style={{ fontWeight: 500, padding: '4px' }}> What's your email</h3>
                    <input required
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        className='bg-[#eeeeee]  mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        type='email'
                        placeholder='email@example.com'>
                    </input >
                    <h3 className='p-7 text-lg font-medium  mb-2' style={{ fontWeight: 500, padding: '4px' }}>Enter your Password</h3>
                    <input
                        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        required
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        type='password'
                        placeholder='password'>
                    </input>

                    <button className='bg-[#111] font-semibold text-white mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>
                        Login
                    </button>

                    <p className='text-center'> New Here?
                        <Link to='/signup'
                            className='text-[#e9771b] ml-1'>
                            Create new Account
                        </Link>
                    </p>
                </form>
            </div>

            <div>
                <Link
                    to='/captain-login'
                    className='bg-[#f7ee64] flex items-center justify-center font-semibold text-white mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>
                    Sign in as Captain
                </Link>
            </div>
        </div>
    )
}

export default UserLogin