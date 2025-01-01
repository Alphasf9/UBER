import { useState } from 'react';
import { Link } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {

    const [otp, setOtp] = useState('')
    const submitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <div className="h-[95vh] w-full bg-white rounded-t-3xl shadow-lg flex flex-col items-center p-6 relative overflow-hidden">
            
            {/* Header */}
            <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">Confirm this ride to start</h3>

            {/* User Photo and Info Section */}
            <div className="flex items-center justify-start w-full mb-8">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
                    <img
                        src="/images/uberpassenger.png"
                        alt="Passenger requesting ride"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="ml-4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-1 relative">
                        <span className="absolute inset-x-0 bottom-0 border-b-2 border-green-600"></span>
                        Mohd Haseeb Ali
                    </h2>
                    <h5 className="text-lg text-blue-600 font-medium mt-2 relative">
                        <span className="absolute inset-x-0 bottom-0 border-b-2 border-blue-600"></span>
                        2.2 Km
                    </h5>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex flex-col items-center gap-6 w-full overflow-y-auto">
                <div className="w-full px-4">
                    <div className="flex flex-col items-center gap-6">
                        {/* Pickup Location */}
                        <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out w-full">
                            <i className="text-2xl text-green-600 ri-map-pin-2-line mr-4"></i>
                            <div className="text-left">
                                <h3 className="font-semibold text-base text-gray-800">562/11-A</h3>
                                <p className="text-sm text-gray-600">Agra Fort Railway Station, Agra</p>
                            </div>
                        </div>

                        {/* Drop-off Location */}
                        <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out w-full">
                            <i className="text-2xl text-blue-600 ri-map-pin-5-fill mr-4"></i>
                            <div className="text-left">
                                <h3 className="font-semibold text-base text-gray-800">562/11-A</h3>
                                <p className="text-sm text-gray-600">Agra Fort Railway Station, Agra</p>
                            </div>
                        </div>

                        {/* Distance & Fare Information */}
                        <div className="flex flex-col gap-4 w-full">
                            {/* Distance */}
                            <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out w-full">
                                <i className="text-2xl text-blue-600 ri-road-map-line mr-4"></i>
                                <div className="text-left">
                                    <h3 className="font-semibold text-base text-gray-800">12.5 km</h3>
                                    <p className="text-sm text-gray-600">Distance</p>
                                </div>
                            </div>

                            {/* Fare Information */}
                            <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out w-full">
                                <i className="text-2xl text-yellow-600 ri-money-rupee-circle-line mr-4"></i>
                                <div className="text-left">
                                    <h3 className="font-semibold text-base text-gray-800">₹ 193.20</h3>
                                    <p className="text-sm text-gray-600">Cash</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Buttons with Animations */}
            <div className="w-full mt-6 space-y-6 px-4">
                {/* OTP Input Field */}
                <form onSubmit={submitHandler}>
                    <input value={otp}
                        onChange={(e) => {
                            setOtp(e.target.value)
                        }}
                        type="text"
                        placeholder="Enter OTP to confirm ride"
                        className="w-full p-4 text-lg bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 mb-4 font-semibold text-gray-700"
                        style={{ fontFamily: 'Roboto, sans-serif', letterSpacing: '0.5px' }}
                    />

                    {/* Confirm Button (Link styled as button) */}
                    <Link
                        to="/captain-riding"
                        className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold shadow-lg hover:bg-green-600 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out text-center block mb-4"
                    >
                        Confirm
                    </Link>

                    {/* Cancel Button */}
                    <button
                        onClick={() => {
                            props.setConfirmRidePopUpPanel(false);
                            props.setRidePopUpPanel(false);
                        }}
                        className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold shadow-lg hover:bg-gray-200 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ConfirmRidePopUp;
