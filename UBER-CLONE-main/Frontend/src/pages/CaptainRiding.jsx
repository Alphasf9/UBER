// import React from 'react'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from 'react-router-dom'
import { useRef, useState } from "react";
import FinishRide from "../components/FinishRide";


const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)

    const finishRidePanelRef = useRef(null)


    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)'
            }
            )
        }

        else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }


    }, [finishRidePanel])



    return (
        <div className="h-screen flex flex-col relative bg-gray-100 overflow-hidden">



            {/* Logo at the top-left */}
            <div className="fixed top-4 left-4 z-20">
                <div className="p-2 rounded-full bg-gray-900 border border-gray-700 shadow-md flex items-center justify-center">
                    <img
                        className="w-10 h-10 object-contain"
                        src="/images/images.png"
                        alt="Logo"
                    />
                </div>
            </div>

            {/* Home Button at the top-right */}
            <div className="fixed top-4 right-4 z-20">
                <Link
                    to="/captain-home"
                    className="h-12 w-12 bg-gray-900 flex items-center justify-center rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
                >
                    <i className="ri-arrow-left-line text-2xl text-white"></i>
                </Link>
            </div>

            {/* Map Background */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    className="w-full h-full object-cover brightness-75"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt="Background"
                />
            </div>

            {/* Ride Details Container */}
            <div 
            onClick={()=>{
                setFinishRidePanel(true)
            }}

            className="absolute p-8 bottom-0 bg-yellow-400 w-full z-30 flex items-center justify-between ">

                <h5
                    className="absolute text-center top-2 right-4 cursor-pointer text-gray-500"
                >
                    <i className="text-3xl ri-arrow-up-wide-line"></i>
                </h5>


                <h4 className='text-xl m-2 font-semibold'>4 Km away from you</h4>
                <button className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold shadow-md hover:bg-green-500 hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out transform"
                >Complete Ride</button>

            </div>


            <div ref={finishRidePanelRef}  className="fixed bottom-0 w-full px-4 py-4 translate-y-full bg-white shadow-xl z-40">
                <FinishRide   setFinishRidePanel={setFinishRidePanel} />
            </div>

        </div>
    )
}

export default CaptainRiding