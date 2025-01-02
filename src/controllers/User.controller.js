import User from "../models/User.model.js"

export const getUserById = (req, res) => {

    const id = req.parames();

    const idUser = User.findById(id);

    return res.status(200).send(idUser)
}

export const getAllUser = (req, res) => {

    const allUser = User.find()

    return res.status(200).send(allUser)
}