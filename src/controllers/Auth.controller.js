import { json } from "express";
import User from "../models/User.model.js"

export const signUp = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if ([username, email, password].some((field) => field?.trim() === "")) {
            res.status(200).send(json({ "message": "All fields are required" }));
        }

        const alredyUser = await User.findone(email);
        if (alredyUser) {
            res.status(200).send(json({ "message": "user alredy exist" }))
        }

        const hashpass = await User.hashpass(password)

        const user = User.crete({
            username,
            email,
            password: hashpass
        });

        const creteUser = await User.findbyid(user._id).select("-password")

        return res.status(200).json({ "message": "user created succesfully" })
    } catch (error) {
        res.status(401).send(json({ "message": "something went wrong while create user !!! try again later" }))
    }

}

export const signIn = async (req, res) => {

    const { email, password } = req.body;

    if ([email, password].some((field) => field?.trim() === "")) {
        return res.status(400).send(json({ "message": "email and password is reqired" }))
    }

    const existUser = await User.findone(email);
    if (!existUser) {
        return res.status(409).send(json({ "message": "email is weong" }))
    }

    const isPasscorrect = await User.comparePassword(password)
    if (!isPasscorrect) {
        return res.status(409).json({ "message": "password is wrong" })
    }

    const accessToken = User.genareteToken()

    const loggedInUser = await User.findById(user._id).select("-password -RefreshToken")

    const options = {
        httpsonly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .send(
            json({ "message": "Login Successfully" })
        )
}

export const logout = (req, res) => {
    res.clearecookie("accessToken")

    const options = {
        httponly: true,
        secure: true
    }

    return res.status(200).clearecookie("accessToken", options).send(json({ "message": "user logout sucessfully" }))
}

export const getCurrentUser = (req, res) => {
    return res.status(200).send(req.user)
}

export const changePassword = (req, res) => {

    const { password } = req.body;

    if ([password].some((field) => field?.trim() === "")) {
        return res.status(409).send(json({ "message": "password is reqired" }))
    }

    user.password = password
    user.save({ validateBeforeSave: false })

    return res.status(200).send(json({ "message": "password change succesfully" }))

}

export const updateAccount = async (req, res) => {
    const { username, email } = req.body

    if (!username || !email) {
        throw new ApiError(401, "Detail Is Reqired")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                username: username,
                email: email
            }
        },
        { new: true }

    ).select("-password")

    return res.status(200).send(json({ "message": "Account detail updated Succesfully" }))


}