import { response } from "express";
import Ride from "../models/ride.model.js";
import { getCalulatedDistanceTime } from "./maps.services.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendMessageToSocketId } from "../socket.js";


export async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error("Pickup and Destination are required");
    }

    const distanceTime = await getCalulatedDistanceTime(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        motorcycle: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        motorcycle: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        motorcycle: 1.5
    };



    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        motorcycle: Math.round(baseFare.motorcycle + ((distanceTime.distance.value / 1000) * perKmRate.motorcycle) + ((distanceTime.duration.value / 60) * perMinuteRate.motorcycle))
    };

    return fare;

}

function getOtp(num) {
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num) - 1).toString();
    return otp;
}

export const createRide = async ({ user, pickup, destination, vehicleType }) => {
    try {

        if (!user || !pickup || !destination || !vehicleType) {
            throw new Error("User, Pickup, Destination and Vehicle Type are required");
        }

        const fare = await getFare(pickup, destination);

        const ride = await Ride.create({
            user,
            pickup,
            destination,
            fare: fare[vehicleType],
            otp: getOtp(6)
        });

        return ride

    } catch (error) {
        throw new Error(error.message);
    }
}



export const confirmRideToUser = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error("Ride id is required to confirm ride");
    }

    try {

        await Ride.findOneAndUpdate({
            _id: rideId
        }, {
            status: "accepted",
            captain: captain._id
        })



        const ride = await Ride.findOne({ _id: rideId }).populate('user').populate('captain').select('+otp');
        if (!ride) {
            throw new Error("Ride not found");
        }

        return ride;

    } catch (error) {


        throw new Error(error.message);

    }
}

export const startRideWithUser = async ({
    rideId, otp, captain
}) => {
    if (!rideId) {
        throw new Error("Ride id is required to start ride");
    }

    if (!otp) {
        throw new Error("OTP is required to start ride");
    }

    try {

        const ride = await Ride.findOne({
            _id: rideId
        }).populate('user').populate('captain').select('+otp');

        if (!ride) {
            throw new Error("Ride not found or otp is incorrect");
        }

        if (ride.status !== "accepted") {
            throw new Error("Ride is not accepted");
        }

        if (ride.otp !== otp) {
            throw new Error("OTP is incorrect");
        }

        await Ride.findOneAndUpdate({
            _id: rideId
        }, {
            status: "ongoing"
        })

        return ride;

    } catch (error) {


        throw new Error(error.message);

    }
}


export const endRideWithUser = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error("Ride id is required to end ride");
    }

    try {

        const ride = await Ride.findOne({
            _id: rideId,
            captain: captain._id
        }).populate('user').populate('captain').select('+otp');

        if (!ride) {
            throw new Error("Ride not found");
        }

        if (ride.status !== "ongoing") {
            throw new Error("Ride is not ongoing");
        }

        await Ride.findOneAndUpdate({
            _id: rideId
        }, {
            staus: "completed"
        })

        return ride;

    } catch (error) {

        throw new Error(error.message);

    }
}



