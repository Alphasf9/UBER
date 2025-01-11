import { Link } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import { useRef, useState } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { useEffect, useContext } from 'react';
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios'


const CaptainHome = () => {

  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);

  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpPanelRef = useRef(null);
  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);
  const [ride, setRide] = useState(null);

  useEffect(() => {
    socket.emit('join', {
      userId: captain._id,
      userType: 'captain',
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);

          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    // return () => clearInterval(locationInterval);
  },[]);




  socket.on('new-ride', (data) => {
    console.log("New ride received:", data)
    setRide(data)
    setRidePopUpPanel(true)
  })
console.log("Ride: ", ride)

  async function confirmRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captainId: captain._id,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("This is our response .data of our captain home", response.data)


    setRidePopUpPanel(false);
    setConfirmRidePopUpPanel(true);

  }



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


  // useEffect(() => {
  //   if (ride) {
  //     console.log("Ride data is updated: ", ride);
  //     setRidePopUpPanel(true);  // Triggers the pop-up when 'ride' state is updated
  //   }
  // }, [ride]);




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
        <RidePopUp
          ride={ride}
          setRidePopUpPanel={setRidePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          confirmRide={confirmRide}
        />
      </div>


      <div ref={confirmRidePopUpPanelRef} className="fixed bottom-0 w-full px-4 py-4 translate-y-full bg-white shadow-xl z-40">
        <ConfirmRidePopUp 
        ride={ride}
         setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel} />
      </div>


    </div>
  );
};

export default CaptainHome;
