import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    username: {
        type: "String",
        require: true,
    },
    email: {
        type: "String",
        require: true
    },
    password: {
        type: "String",
        require: true
    },

});

userSchema.method.genareteToken = () => {
    return jwt.sign({
        id: this._id
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.method.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

userSchema.method.comparePassword = async (password) => {
    return await bcrypt.compare(password, this.password)
}

const userModel = mongoose.model('user', userSchema);

export default userModel