import mongoose from "mongoose";

const captainSchema = new mongoose.Schema({
    username: {
        type: String,
        reqired: true
    },
    email: {
        type: String,
        reqired: true,
        unique: true
    },
    password: {
        type: String,
        reqired: true
    },
    statu: {
        type: String,
        reqired: true,
        enum: ["active", "inactive"],
        default: inactive
    },
    vehicle: {
        color: {
            type: String,
            reqired: true,
        },
        numberplate: {
            type: String,
            reqired: true,
        },
        capacity: {
            type: String,
            reqired: true,
        },
        vehicletype: {
            type: String,
            reqired: true,
            enum: ["car", "bike", "auto"]
        },
    },
    location: {
        ltd: {
            type: Number
        },
        lng: {
            type: Number
        }
    }

});

captainSchema.method.genareteToken = () => {
    return jwt.sign({
        id: this._id
    },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

captainSchema.method.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10)
}

captainSchema.method.comparePassword = async (password) => {
    return await bcrypt.compare(password, this.password)
}


const captainModel = mongoose.model("captain", captainSchema)

export default captainModel;