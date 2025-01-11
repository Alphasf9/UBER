import { getAddressCoordinate, getCaptainInTheRadius } from "../services/maps.services.js";
import { confirmRideToUser, createRide, getFare, startRideWithUser, endRideWithUser } from "../services/ride.services.js";
import { validationResult } from "express-validator";
import { sendMessageToSocketId } from "../socket.js";
import Ride from "../models/ride.model.js";


export const createRideController = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { userId, pickup, destination, vehicleType } = req.body;


        const ride = await createRide({ user: req.user._id, pickup, destination, vehicleType });
        console.log("This is our userId ", req.user._id)

        res.status(201).json({
            message: "Ride created successfully",
            ride
        });

        const getPickupCoordinates = await getAddressCoordinate(pickup)

        const captainInRadius = await getCaptainInTheRadius(getPickupCoordinates.ltd, getPickupCoordinates.lng, 2);

        ride.otp = "";

        const rideWithUser = await Ride.findOne({ _id: ride._id }).populate('user');

        captainInRadius.map(captain => {
            console.log("Data of ride with user ", rideWithUser);

            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            })

        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error while creating ride"
        });
    }
}



export const getFareController = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await getFare(pickup, destination);

        return res.status(200).json(fare);
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error while fetching fare"
        });
    }
}

export const confirmRide = async (req, res, next) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const { rideId } = req.body;

        const ride = await confirmRideToUser({ rideId, captain: req.captain })

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        if (!ride) {
            return res.status(404).json({ message: "Ride not found with given id" });
        }


        res.status(200).json(ride);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error while confirming ride" });
    }
}



export const startRide = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { rideId, otp } = req.query;

        const ride = await startRideWithUser({ rideId, otp, captain: req.captain });

        console.log("Ride started successfully", ride);

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        });
        return res.status(200).json({ message: "Ride started successfully", ride });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error while starting ride" });
    }
}


export const endRide = async (req, res) => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { rideId } = req.body;

        // const ride = await Ride.findOne({rideId, captain: req.captain });

        // if (!ride) {
        //     return res.status(404).json({ message: "Ride not found with given id" });
        // }

        const ride = await endRideWithUser({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        });

        return res.status(200).json({ message: "Ride completed successfully", ride });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error while completing ride" });
    }
}


