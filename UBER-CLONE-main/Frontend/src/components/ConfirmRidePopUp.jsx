import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {

    const [otp, setOtp] = useState('')
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
                params: {
                    rideId: props.ride._id,
                    otp: otp,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });


            if (response.status === 200) {
                props.setConfirmRidePopUpPanel(false);
                props.setRidePopUpPanel(false)
                navigate('/captain-riding', { state: { ride: props.ride } });
            }
            console.log("Ride confirmed:", response.data);
            // handle successful confirmation, e.g., navigate to another page or update UI
        } catch (error) {
            console.error("Error confirming ride:", error);
            // handle error, e.g., show error message to user
        }

    };

    console.log("This is my ride", props.ride)

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
                        <span className="absolute inset-x-0 bottom-0 border-b-2 border-green-600 capitalize"></span>
                        {props.ride?.user.fullname.firstname + " " + props.ride?.user?.fullname.lastname}

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
                                <p className="text-sm text-gray-600">{props.ride?.pickup}</p>
                            </div>
                        </div>

                        {/* Drop-off Location */}
                        <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out w-full">
                            <i className="text-2xl text-blue-600 ri-map-pin-5-fill mr-4"></i>
                            <div className="text-left">
                                <p className="text-sm text-gray-600">{props.ride?.destination}</p>
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
                                    <h3 className="font-semibold text-base text-gray-800">₹ {props.ride?.fare}</h3>
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
                    <button
                        // to="/captain-riding"
                        className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold shadow-lg hover:bg-green-600 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out text-center block mb-4"
                    >
                        Confirm
                    </button>

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
