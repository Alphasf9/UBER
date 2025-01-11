import axios from "axios";
import captainModel from "../models/captain.model.js";

export const getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getCalulatedDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error("Origin and Destination are required");
    }

    const apiKey = 'AIzaSyDTEocQfgJZqhzee_aXEpm_G7GFUjjUyr0';

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;

    try {
        const response = await axios.get(url, {
            timeout: 10000
        });
        if (response.data.status === 'OK') {

            if (response.data.rows[0].elements[0].status === 'NOT_FOUND') {
                throw new Error('Invalid Origin or Destination');
            }

            return response.data.rows[0].elements[0];

        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }

}


export const getSuggestions = async (input) => {
    try {
        if (!input) {
            return res.status(400).json({ message: "Input is required" });
        }

        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
        // const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&types=(cities)&key=${apiKey}`;

        const response = await axios.get(url);


        if (response.data.status === 'OK') {
            return response.data.predictions;

        } else {
            throw new Error('Unable to fetch suggestions in maps services')
        }
    } catch (error) {
        console.error("Error in getSuggestions:", error.message);
        throw new Error("Unable to fetch suggestions in map services: " + error.message);
    }

}


export const getCaptainInTheRadius = async (ltd, lng, radius) => {
    try {
        const captains = await captainModel.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[ltd, lng], radius / 6371]
                }
            }
        })
        return captains;
    } catch (error) {
        console.error("Error in getCaptainInTheRadius:", error.message);
        throw new Error("Unable to fetch captains in the radius: " + error.message);
    }
}