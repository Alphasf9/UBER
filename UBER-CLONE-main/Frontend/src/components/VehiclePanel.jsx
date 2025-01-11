import React from 'react'

const  VehiclePanel = (props) => {
    return (
        <div>
            <h5 onClick={() => {
                props.setvehcilePanel(false)
            }}
                className="p-1  text-center w-[95%] absolute top-0 "><i className="text-3xl text-gray-300  ri-arrow-down-wide-line"></i></h5>


            <h3 className="text-2xl font-bold mb-5">Choose your Vehicle</h3>


            {/*Uber go */}


            <div onClick={() => {
                props.setconfirmRidePanel(true);
                props.setVehicleType('car')
            }} className="flex w-full items-center mb-2  justify-between p-3  shadow-md bg-gray-100  border-2 rounded-md active:border-black">
                {/* Ride Info */}

                <div className="flex items-center">
                    <img className="h-14 mr-3 rounded-full" src="/images/imagescaruber.png" alt="UberGo" />
                    <div className="ml-6">
                        <h4 className="font-medium text-lg">
                            UberGo <span className="text-sm ml-2"><i className="ri-user-3-fill"></i> 4</span>
                        </h4>
                        <p className="text-black text-sm font-semibold">5 mins away</p>
                        <p className="text-sm text-gray-500">Affordable, compact rides</p>
                    </div>
                </div>

                {/* Price */}
                <div className="text-right">
                    <h2 className="text-2xl font-semibold text-black">₹{props.fare.car}</h2>
                </div>
            </div>

            {/*Moto */}


            <div
                onClick={() => {
                    props.setconfirmRidePanel(true);
                    props.setVehicleType('motorcycle')
                }}
                className="flex w-full items-center mb-2  justify-between p-2  shadow-md bg-gray-100  border-2 rounded-md active:border-black">
                {/* Ride Info */}

                <div className="flex items-center">
                    <img className="h-10 mr-3 rounded-full" src="/images/imagesbikeuber.png" alt="UberGo" />
                    <div className="ml-3">
                        <h4 className="font-medium text-lg">
                            Moto <span className="text-sm ml-2"><i className="ri-user-3-fill"></i> 1</span>
                        </h4>
                        <p className="text-black text-sm font-semibold">8 mins away</p>
                        <p className="text-sm text-gray-500">Affordable, motorcycle rides</p>
                    </div>
                </div>

                {/* Price */}
                <div className="text-right">
                    <h2 className="text-2xl font-semibold text-black">₹{props.fare.motorcycle}</h2>
                </div>
            </div>





            {/*Auto*/}


            <div
                onClick={() => {
                    props.setconfirmRidePanel(true);
                    props.setVehicleType('auto')
                }}
                className="flex w-full items-center mb-2  justify-between p-2  shadow-md bg-gray-100  border-2 rounded-md active:border-black">
                {/* Ride Info */}

                <div className="flex items-center">
                    <img className="h-14 mr-3 m-2 rounded-full" src="/images/imagesautouber.png" alt="UberGo" />
                    <div className="ml-9">
                        <h4 className="font-medium text-lg">
                            Uber Auto <span className="text-sm ml-2"><i className="ri-user-3-fill">3</i></span>
                        </h4>
                        <p className="text-black text-sm font-semibold">2 mins away</p>
                        <p className="text-sm text-gray-500">Quick, easy </p>
                    </div>
                </div>

                {/* Price */}
                <div className="text-right">
                    <h2 className="text-2xl font-semibold text-black">₹{props.fare.auto}</h2>
                </div>
            </div>
        </div>
    )
}

export default VehiclePanel