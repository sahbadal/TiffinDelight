import mongoose from 'mongoose';
import { MONGODB_URI } from './envConfig.js';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`${MONGODB_URI}/mytiffin`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
