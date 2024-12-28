import React from 'react';

const ConfirmedRide = (props) => {
  return (
    <div className="relative p-4 max-h-[55vh] overflow-y-auto overflow-x-hidden bg-white rounded-lg shadow-lg">

      <h5
        onClick={() => { props.setconfirmRidePanel(false) }}
        className="p-1 text-center w-full absolute top-0 cursor-pointer"
      >
        <i className="text-3xl text-gray-500 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl p-3 font-bold mb-3 text-center text-gray-800">Confirm Your Ride</h3>

      <div className="gap-4 flex justify-center flex-col items-center">

        {/* Image Section */}
        <img className="h-40 w-auto object-contain rounded-lg shadow-md" src="/images/ubersedancar.png" alt="Ride confirmation" />

        <div className="w-full mt-2">
          <div className="flex flex-col items-center gap-4">
            {/* First Div */}
            <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out w-[90%]">
              <i className="text-3xl text-green-600 ri-map-pin-2-line mb-2"></i>
              <div className="text-center">
                <h3 className="font-semibold text-base text-gray-800">562/11-A</h3>
                <p className="text-sm text-gray-600">Agra Fort Railway Station, Agra</p>
              </div>
            </div>

            {/* Second Div */}
            <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out w-[90%]">
              <i className="text-3xl text-blue-600 ri-map-pin-5-fill mb-2"></i>
              <div className="text-center">
                <h3 className="font-semibold text-base text-gray-800">562/11-A</h3>
                <p className="text-sm text-gray-600">Agra Fort Railway Station, Agra</p>
              </div>
            </div>

            {/* Third Div */}
            <div className="flex flex-col items-center bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out w-[90%]">
              <i className="text-3xl text-yellow-600 ri-money-rupee-circle-line mb-2"></i>
              <div className="text-center">
                <h3 className="font-semibold text-base text-gray-800">₹ 193.20</h3>
                <p className="text-sm text-gray-600">Cash</p>
              </div>
            </div>
          </div>
        </div>

        <button onClick={() => {
          props.setVehicleFound(true)
          props.setconfirmRidePanel(false)
        }}
          className="text-center w-full bg-green-600 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-green-500 transition duration-200 ease-in-out">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmedRide;
