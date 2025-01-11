import { useContext, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { useEffect } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

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
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [vehicleType, setVehicleType] = useState(null)

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({})
  const [ride, setRide] = useState(null);
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);
  const navigate = useNavigate()


  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id })
  }, [user])

  socket.on('ride-confirmed', ride => {
    console.log("Ride confirmed details", ride);
    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(ride)
  })

  socket.on('ride-started', ride => {
    setWaitingForDriver(false)
    navigate('/riding', { state: { ride } })
  })





  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch {
      // handle error
    }
  };




  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch {
      // handle error
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
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

  useGSAP(
    function () {
      if (vehcilePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehcilePanel]
  );

  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(WaitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(WaitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriver]
  );

  async function findTrip() {
    setvehcilePanel(true);
    setPanelOpen(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setFare(response.data);


  }



  async function createRide() {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      console.log(response.data);


    }
    catch (error) {
      console.error("Error  ride:", error);
    }
  }


  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-20 mb-5 absolute left-6 top-6"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />

      <div className="h-screen w-screen">
        <LiveTracking />
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        {/* Input  */}
        <div className="h-[30%] p-6 bg-white relative shadow-lg">
          {/* Close Button */}
          <h5
            ref={panelClosedRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className={`absolute top-6 right-6 ${panelOpen ? "opacity-100" : "opacity-0"
              } text-2xl cursor-pointer transition-opacity`}
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>

          <h4 className="text-2xl font-semibold mb-4">Find a trip</h4>

          
          <form onSubmit={submitHandler}>
            <div className="relative mb-5">
              <div className="line absolute h-16 top-5 left-6 bg-gray-800 w-1 rounded-full"></div>
              <input
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("pickup");
                }}
                value={pickup}
                onChange={handlePickupChange}
                className="bg-gray-100 px-12 py-2 text-lg rounded-lg w-full shadow focus:ring focus:ring-blue-500"
                type="text"
                placeholder="Add a pick-up location"
              />
            </div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-gray-100 px-12 py-2 text-lg rounded-lg w-full shadow focus:ring focus:ring-blue-500"
              type="text"
              placeholder="Enter your destination"
            />
          </form>

          {panelOpen && (
            <div className="mt-4 mb-6">
              <button onClick={findTrip}
                className="bg-blue-500 text-white px-6 py-3 text-lg rounded-lg w-full shadow hover:bg-blue-600 focus:ring focus:ring-blue-500 transition duration-300">
                Find Trip
              </button>
            </div>
          )}
        </div>

        {/* Location   */}
        <div
          ref={panelRef}
          className={`p-8 bg-white ${panelOpen ? "h-auto" : "h-0"
            } overflow-hidden transition-all duration-300 shadow-lg`}
          style={{ top: panelOpen ? "calc(30% + 63px)" : "0" }}
        >

          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPanelOpen={setPanelOpen}
            setvehcilePanel={setvehcilePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      {/*   */}
      <div
        ref={vehiclePanelRef}
        className="fixed z-10 bottom-0  w-full translate-y-full px-2 py-10 bg-white pt-12"
      >
        <VehiclePanel
          setconfirmRidePanel={setconfirmRidePanel}
          setvehcilePanel={setvehcilePanel}
          fare={fare}
          setVehicleType={setVehicleType}
        />
      </div>

      <div
        ref={confirmRidePanelRef}
        className="fixed z-10 bottom-0  w-full translate-y-full px-2 py-6 bg-white pt-12"
      >
        <ConfirmedRide
          setconfirmRidePanel={setconfirmRidePanel}
          setVehicleFound={setVehicleFound}
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          fare={fare}
        />
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed z-10 bottom-0  w-full translate-y-full px-2 py-6 bg-white pt-12"
      >
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          vehicleType={vehicleType}
          fare={fare}

        />
      </div>

      <div
        ref={WaitingForDriverRef}
        className="fixed z-10 bottom-0  w-full  px-2 py-6 bg-white pt-12"
      >
        <WaitingForDriver
          ride={ride}
          waitingForDriver={waitingForDriver}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
