import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import { useRef, useState } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';

const CaptainHome = () => {

  const [ridePopUpPanel, setRidePopUpPanel] = useState(true);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);

  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpPanelRef = useRef(null);


  useGSAP(function () {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(0)'
      }
      )
    }

    else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }


  }, [ridePopUpPanel])




  useGSAP(function () {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(0)'
      }
      )
    }

    else {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }


  }, [confirmRidePopUpPanel])




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
          to="/captain-login"
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
      <div className="absolute bottom-0 w-full z-30">
        <CaptainDetails />
      </div>

      {/* RidePopUp */}
      <div ref={ridePopUpPanelRef} className="fixed bottom-0 w-full px-4 py-4 translate-y-full bg-white shadow-xl z-40">
        <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} />
      </div> 


      <div ref={confirmRidePopUpPanelRef} className="fixed bottom-0 w-full px-4 py-4 translate-y-full bg-white shadow-xl z-40">
        <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel} />
      </div>


    </div>
  );
};

export default CaptainHome;
