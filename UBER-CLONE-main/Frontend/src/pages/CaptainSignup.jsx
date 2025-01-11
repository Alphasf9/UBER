import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainSignup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const { captain, setCaptain } = React.useContext(CaptainDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const captainData = {
            fullname: {
                firstname: firstName,
                lastname: lastName,
            },
            email: email,
            password: password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType,
            }
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData);

        if (response.status === 201) {
            const data = response.data;
            // console.log(data)
            setCaptain(data.captain);
            console.log(setCaptain)
            localStorage.setItem('token', data.token);
            navigate('/captain-home');
        }

        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setVehicleColor('');
        setVehiclePlate('');
        setVehicleCapacity('');
        setVehicleType('');
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

                    <h3
                        className='p-7 text-lg font-medium  mb-6'
                        style={{ fontWeight: 500, padding: '4px' }}>
                        Vehicle Details
                    </h3>
                    <div className='flex gap-5'>
                        <div className='w-1/2'>
                            <h3
                                className='p-7 text-lg font-medium  mb-2'
                                style={{ fontWeight: 500, padding: '4px' }}>
                                Vehicle Color
                            </h3>
                            <input required
                                className='bg-[#eeeeee]  mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                                value={vehicleColor}
                                onChange={(e) => {
                                    setVehicleColor(e.target.value);
                                }}
                                type='text'
                                placeholder='Vehicle color'>
                            </input >
                        </div>
                        <div className='w-1/2'>
                            <h3
                                className='p-7 text-lg font-medium  mb-2'
                                style={{ fontWeight: 500, padding: '4px' }}>
                                Vehicle Plate
                            </h3>
                            <input required
                                className='bg-[#eeeeee]  mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                                value={vehiclePlate}
                                onChange={(e) => {
                                    setVehiclePlate(e.target.value);
                                }}
                                type='text'
                                placeholder='Vehicle Plate'>
                            </input >
                        </div>
                    </div>
                    <div className='flex gap-5'>
                        <div className='w-1/2'>
                            <h3
                                className='p-7 text-lg font-medium  mb-2'
                                style={{ fontWeight: 500, padding: '4px' }}>
                                Vehicle Capacity
                            </h3>
                            <input required
                                className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                                value={vehicleCapacity}
                                type='number'
                                min={1}
                                step={1}
                                onChange={(e) => {
                                    const value = Math.max(1, Number(e.target.value));
                                    setVehicleCapacity(value);
                                }}
                                placeholder='Vehicle capacity'
                            >
                            </input>
                        </div>
                        <div className='w-1/2'>
                            <h3
                                className='p-7 text-lg font-medium  mb-2'
                                style={{ fontWeight: 500, padding: '4px' }}>
                                Vehicle Type
                            </h3>
                            <select required
                                className='bg-[#eeeeee]  mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                                value={vehicleType}
                                onChange={(e) => {
                                    setVehicleType(e.target.value);
                                }}
                                placeholder='Vehicle type'>
                                <option value='car'>Car</option>
                                <option value='auto'>Auto</option>
                                <option value='motorcycle'>Motorcycle</option>
                            </select>
                        </div>
                    </div>

                    <button className='bg-[#111] font-semibold text-white mb-3 rounded px-4 py-2 w-full text-base placeholder:text-sm'>
                        Create Captain Account
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