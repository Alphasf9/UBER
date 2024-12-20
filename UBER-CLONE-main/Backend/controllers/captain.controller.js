import { validationResult } from "express-validator";
import captainModel from "../models/captain.model.js";

import createCaptain from "../services/captain.services.js";


const registerCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                success: false
            })
        }

        const { fullname, email, password, vehicle } = req.body;

        const isCaptainAlreadyExist = await captainModel.findOne({ email });

        if (isCaptainAlreadyExist) {
            return res.status(400).json({
                message: "Captain already exist with this email"
            })
        };

        const hashPassword = await captainModel.hashPassword(password);


        const captain = await createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType

        })

        const token = captain.generateAuthToken();

        res.status(201).json({
            token,
            captain,
            message: "Captain Registered successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error while registering captain"
        });
    }

}

export default { registerCaptain }