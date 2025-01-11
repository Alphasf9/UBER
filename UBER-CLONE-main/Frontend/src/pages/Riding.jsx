import { Link, useLocation } from 'react-router-dom'
import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Riding = () => {

    const location = useLocation();
    const { ride } = location.state || {};
    const navigate = useNavigate();

    const { socket } = useContext(SocketContext);

    socket.on('ride-ended', () => {
        navigate('/home')
    });

    return (
        <div className="h-screen flex flex-col">
            {/* Home Button at the top-right */}
            <Link to='/home' className="h-12 w-12 bg-gray-800 flex items-center justify-center rounded-full shadow-md fixed top-4 right-4 z-50 cursor-pointer transform hover:scale-105 transition-all duration-200 ease-in-out">
                <i className="ri-home-2-fill text-xl text-white"></i>
            </Link>

            {/* First Section: Background Image (Live Tracking) */}
            <div className="flex-grow p-4 flex justify-center items-center bg-gray-200">
                <LiveTracking />
            </div>

            {/* Second Section: Ride Details and Payment */}
            <div className="p-4 flex flex-col space-y-4 max-h-[40%] overflow-y-auto">
                <div className="flex items-center justify-between p-4">
                    <img
                        className="h-20 w-auto object-contain rounded-lg shadow-md"
                        src="/images/imagescaruber.png"
                        alt="Ride confirmation"
                    />
                    <div className="text-right">
                        <h2 className="text-lg font-medium capitalize">{ride?.captain.fullname?.firstname + " " + ride?.captain.fullname.lastname}</h2>
                        <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain.vehicle.plate}</h4>
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
                                <p className="text-sm text-gray-600">{ride?.destination}</p>
                            </div>
                        </div>

                        {/* Payment */}
                        <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out w-[90%]">
                            <i className="text-3xl text-yellow-600 ri-money-rupee-circle-line mb-2"></i>
                            <div className="text-center">
                                <h3 className="font-semibold text-base text-gray-800">₹ {ride?.fare}</h3>
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
