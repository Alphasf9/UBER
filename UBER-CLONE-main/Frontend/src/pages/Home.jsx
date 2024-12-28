import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelClosedRef = useRef(null);
  const vehicleFoundRef = useRef(null);

  const [vehcilePanel, setvehcilePanel] = useState(false);

  const vehiclePanelRef = useRef(null);

  const confirmRidePanelRef = useRef(null);
  const WaitingForDriverRef = useRef(null);

  const [confirmRidePanel, setconfirmRidePanel] = useState(false);


  const [vehicleFound, setVehicleFound] = useState(false)

  const [waitingForDriver, setWaitingForDriver] = useState(false)




  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          // padding: 25,
        });
        gsap.to(panelClosedRef.current, {
          opacity: "1",
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          duration: 0.5,
          opacity: "1",
        });
      }
    },
    [panelOpen]
  );

  useGSAP(function () {
    if (vehcilePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      }
      )
    }

    else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }


  }, [vehcilePanel])


  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      }
      )
    }

    else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }


  }, [confirmRidePanel])



  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      }
      )
    }

    else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }


  }, [vehicleFound])





  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(WaitingForDriverRef.current, {
        transform: 'translateY(0)'
      }
      )
    }

    else {
      gsap.to(WaitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }


  }, [waitingForDriver])





  return (
    <div className="h-screen relative overflow-hidden">
      {/* Uber Logo */}
      <img
        className="w-20 mb-5 absolute left-6 top-6"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />

      {/* Map Screen */}
      <div
        className="h-screen w-screen">
        <img
          className="h-full w-full object-cover brightness-75"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Background"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        {/* Input Panel */}
        <div className="h-[30%] p-6 bg-white relative shadow-lg">
          {/* Close Button */}
          <h5
            ref={panelClosedRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute top-6 right-6 opacity-0 text-2xl cursor-pointer"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>

          {/* Heading */}
          <h4 className="text-2xl font-semibold mb-4">Find a trip</h4>

          {/* Input Fields */}
          <form onSubmit={submitHandler}>
            <div className="relative mb-5">
              <div className="line absolute h-16 top-5 left-6 bg-gray-800 w-1 rounded-full"></div>
              <input
                onClick={() => setPanelOpen(true)}
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="bg-gray-100 px-12 py-2 text-lg rounded-lg w-full shadow focus:ring focus:ring-blue-500"
                type="text"
                placeholder="Add a pick-up location"
              />
            </div>
            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-gray-100 px-12 py-2 text-lg rounded-lg w-full shadow focus:ring focus:ring-blue-500"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>

        {/* Location Search Panel */}
        <div
          ref={panelRef}
          className="bg-white h-0 overflow-hidden transition-all duration-300 shadow-lg"
        >
          <LocationSearchPanel setPanelOpen={setPanelOpen} setvehcilePanel={setvehcilePanel} />
        </div>
      </div>

      {/* Bottom Bar */}

      <div ref={vehiclePanelRef} className="fixed z-10 bottom-0  w-full translate-y-full px-2 py-10 bg-white pt-12">

        <VehiclePanel setconfirmRidePanel={setconfirmRidePanel} setvehcilePanel={setvehcilePanel} />

      </div>

      <div ref={confirmRidePanelRef} className="fixed z-10 bottom-0  w-full translate-y-full px-2 py-6 bg-white pt-12">
        <ConfirmedRide setconfirmRidePanel={setconfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>

      <div ref={vehicleFoundRef} className="fixed z-10 bottom-0  w-full translate-y-full px-2 py-6 bg-white pt-12">
        <LookingForDriver setVehicleFound={setVehicleFound} />
      </div>


      <div ref={WaitingForDriverRef} className="fixed z-10 bottom-0  w-full  px-2 py-6 bg-white pt-12">
        <WaitingForDriver waitingForDriver={waitingForDriver}  />
      </div>
    </div>
  );
};

export default Home;
