import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import { useContext } from 'react'

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userData, setuserData] = useState({});

    const navigate = useNavigate();

    const { user, setUser } = useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName,
            },
            email: email,
            password: password
        };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
        if (response.status === 201) {
            const data = response.data
            setUser(data.user);
            localStorage.setItem('token', data.token);
            navigate('/home')
        }

        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
    }
    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img
                    className='w-16 mb-5 '
                    src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt='' />

                <form onSubmit={(e) => {
                    submitHandler(e);
                }}>
                    <h3 className='p-7 text-lg font-medium  mb-6' style={{ fontWeight: 500, padding: '4px' }}>
                        Tell Us Your Name To Begin your Journey With Us
                    </h3>
                    <div className='flex gap-4 mb-5'>
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
                        What's your email
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
                        Create Acount
                    </button>

                    <p className='text-center'> Already Have a Account?
                        <Link to='/login'
                            className='text-[#e9771b] ml-1'>
                            Login Here
                        </Link>
                    </p>
                </form>
            </div>

            <div>
                <p className='text-[10px] font-bold leading-tight'>
                    By proceeding, you consent to get calls,
                    WhatsApp or SMS messages, including by
                    automated means, from Uber and its
                    affiliates to the number provided.
                </p>
            </div>
        </div>
    )
}

export default UserSignup