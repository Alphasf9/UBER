import userModel from "../models/user.model.js";
import createUser from "../services/user.services.js"
import { validationResult } from 'express-validator'
import blacklistTokenModel from "../models/blacklistToken.model.js";

const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            success: false
        })
    }

    const { fullname, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ email });

    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "User already exist with this email"
        });
    }


    const hashPassword = await userModel.hashPassword(password);

    const user = await createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
    });


    const token = user.generateAuthToken();

    res.status(201).json({
        token,
        user,
        message: "User Registered successfully"
    });
}



const loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            success: false
        })
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password'); // when user field will be searched passowrd 

    if (!user) {
        return res.status(401).json({
            message: "Invaild email or password"
        });
    };

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = user.generateAuthToken();
    res.cookie('token', token)

    return res.status(200).json({
        token,
        user,
        message: "User logged in successfully"
    });
}



const getUserProfile = async (req, res, next) => {

    res.status(200).json(req.user)

}

const logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await blacklistTokenModel.create({ token });

    res.status(200).json({ message: 'Logged out' });

}


export default { registerUser, loginUser, logoutUser, getUserProfile }
