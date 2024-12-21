import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const CaptainSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userData, setuserData] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        setuserData({
        fullName: {
                firstName: firstName,
                lastName: lastName,
            },
            email: email,
            password: password
        })
        console.log(userData);

        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
    }
    return (
        <div className='py-5 px-5 h-screen flex flex-col justify-between'>
            <div>
                <img
                    className='w-16 mb-5 '
                    src='/images/images.png' alt='UBER-driver-logo' />

                <form onSubmit={(e) => {
                    submitHandler(e);
                }}>
                    <h3 className='p-7 w-full text-lg font-medium  mb-6' style={{ fontWeight: 500, padding: '4px' }}>
                        What's Our Captain Name
                    </h3>
                    <div className='flex gap-4 mb-7'>
                        <input
                            required
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                            className='bg-[#eeeeee] w-1/2 mb-1.3  rounded px-4 py-2 border  text-lg placeholder:text-base'
                            type='text'
                            placeholder='First name'>
                        </input >

                        <input
                            required
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                            className='bg-[#eeeeee] w-1/2   rounded px-4 py-2 border  text-lg placeholder:text-base'
                            type='text'
                            placeholder='Last name'>
                        </input >


                    </div>

                    <h3
                        className='p-7 text-lg font-medium  mb-6'
                        style={{ fontWeight: 500, padding: '4px' }}>
                        What's our Captain email
                    </h3>
                    <input required
                        className='bg-[#eeeeee]  mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        type='email'
                        placeholder='email@example.com'>
                    </input >
                    <h3
                        className='p-7 text-lg font-medium  mb-6'
                        style={{ fontWeight: 500, padding: '4px' }}>
                        Enter your Password
                    </h3>
                    <input
                        className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                        required
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        type='password'
                        placeholder='password'>
                    </input>

                    <button className='bg-[#111] font-semibold text-white mb-3 rounded px-4 py-2 w-full text-base placeholder:text-sm'>
                        Login
                    </button>

                    <p className='text-center'> Already Have a Account?
                        <Link to='/captain-login'
                            className='text-[#e9771b] ml-1'>
                            Login Here
                        </Link>
                    </p>
                </form>
            </div>

            <div>
                <p className='text-[10px]  leading-tight'>
                    This Site is protected by reCAPTCHA
                    and the <span className='font-bold underline'>
                        Google
                        Privacy Policy</span> and
                    <span className=' font-bold underline'>Terms of Service apply</span>

                </p>
            </div>
        </div>
    )
}

export default CaptainSignup