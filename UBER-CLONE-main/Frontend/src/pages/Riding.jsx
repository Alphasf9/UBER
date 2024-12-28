import React from 'react';
import { Link } from 'react-router-dom'

const Riding = () => {
    return (
        <div className="h-screen flex flex-col">
            {/* Home Button at the top-right */}
            <Link to='/home' className="h-12 w-12 bg-gray-800 flex items-center justify-center rounded-full shadow-md fixed top-4 right-4 z-50 cursor-pointer transform hover:scale-105 transition-all duration-200 ease-in-out">
                <i className="ri-home-2-fill text-xl text-white"></i>
            </Link>

            {/* First Section: Background Image */}
            <div className="flex-shrink-0">
                <img
                    className="h-full w-full object-cover brightness-75"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt="Background"
                />
            </div>

            {/* Second Section: Ride Details and Payment */}
            <div className="flex-grow p-4 flex flex-col justify-between space-y-4">
                <div className="flex items-center justify-between p-4">
                    <img
                        className="h-20 w-auto object-contain rounded-lg shadow-md"
                        src="/images/imagescaruber.png"
                        alt="Ride confirmation"
                    />
                    <div className="text-right">
                        <h2 className="text-lg font-medium">Manoj Kumar</h2>
                        <h4 className="text-xl font-semibold -mt-1 -mb-1">UP80 9071</h4>
                        <p className="text-sm text-gray-600">White Suzuki S-Presso LXI</p>
                    </div>
                </div>

                {/* Location and Payment Information */}
                <div className="flex flex-col gap-4 items-center">
                    <div className="w-full flex flex-col items-center gap-4">

                        {/* Location */}
                        <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out w-[90%]">
                            <i className="text-3xl text-blue-600 ri-map-pin-5-fill mb-2"></i>
                            <div className="text-center">
                                <h3 className="font-semibold text-base text-gray-800">562/11-A</h3>
                                <p className="text-sm text-gray-600">Agra Fort Railway Station, Agra</p>
                            </div>
                        </div>

                        {/* Payment */}
                        <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out w-[90%]">
                            <i className="text-3xl text-yellow-600 ri-money-rupee-circle-line mb-2"></i>
                            <div className="text-center">
                                <h3 className="font-semibold text-base text-gray-800">₹ 193.20</h3>
                                <p className="text-sm text-gray-600">Cash</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Button */}
                <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-green-500 transition duration-200 ease-in-out transform hover:scale-105">
                    Make a payment
                </button>
            </div>

        </div>
    );
};

export default Riding;
