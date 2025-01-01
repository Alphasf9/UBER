import React from 'react';

const CaptainDetails = (props) => {
    return (
        <div>
            <div className="absolute bottom-0 w-full bg-white rounded-t-3xl shadow-xl p-5 z-20 max-h-[50vh] overflow-y-auto">

                {/* Driver Information */}
                <div className="flex items-center space-x-4 mb-6">
                    <img
                        className="h-16 w-16 object-cover rounded-full border-2 border-gray-300"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7iNNW-dCs66XkdSsqRpBzGzjL5qKXNXYLdw&s"
                        alt="Driver"
                    />
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">Manoj Kumar</h3>
                        <p className="text-sm text-gray-600">White Suzuki S-Presso LXI</p>
                        <p className="text-sm text-gray-500">UP80 9071</p>
                    </div>
                </div>

                {/* Earnings Section */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out mb-4">
                    <h4 className="text-2xl font-bold text-gray-800">₹ 298.56</h4>
                    <p className="text-sm text-gray-600">Total Earnings</p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
                        <i className="ri-time-line text-xl text-gray-600 mb-1 block"></i>
                        <h5 className="text-lg font-medium text-gray-800">10.2</h5>
                        <p className="text-sm text-gray-500">Hours Online</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
                        <i className="ri-speed-up-line text-xl text-gray-600 mb-1 block"></i>
                        <h5 className="text-lg font-medium text-gray-800">20 km/h</h5>
                        <p className="text-sm text-gray-500">Average Speed</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CaptainDetails;
