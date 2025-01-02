import mongoose from "mongoose";

function connectToDataBase() {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log(`MongoDB Connect SucessFully`)
        }).catch(err => console.log(err))
}

export default connectToDataBase;