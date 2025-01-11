import { getAddressCoordinate, getSuggestions } from "../services/maps.services.js";
import { validationResult } from "express-validator";
import { getCalulatedDistanceTime } from "../services/maps.services.js";


export const getCoordinates = async (req, res, next) => {

    const { address } = req.query;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const coordinates = await getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(500).json({ message: error.message + " Coordinates not found " });
    }

}


export const getDistanceTime = async (req, res, next) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { origin, destination } = req.query;

        const distanceTime = await getCalulatedDistanceTime(origin, destination);
        return res.status(200).json(distanceTime);

    } catch (error) {
        res.status(500).json({ message: error.message + " Unable to fetch distance and time" });
    }

}


export const getAutoCompleteSuggestions = async (req, res, next) => {

    try {
        const errors = validationResult(req);

        const { input } = req.query;

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        if (!input) {
            return res.status(400).json({ message: "Input is required" });
        }

        const suggestions = await getSuggestions(input);
         res.status(200).json(suggestions);
    } catch (error) {
        res.status(500).json({ message: error.message + " Unable to fetch suggestions" });
    }
}

