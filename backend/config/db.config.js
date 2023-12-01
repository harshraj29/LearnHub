import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const connectToDb = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    .then((conn) => {console.log(`Connected To MongoDb`);})
    .catch((err) => {console.log(`error in connected db: ${err.message}`);})
}

export default connectToDb;