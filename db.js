import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();


try {
    
mongoose.connect(process.env.MONGO_URI ,
    {
        dbName:"Image_Uploader"
    }
).then(()=>console.log('mongoose connected'))
} catch (error) {
    console.log(error)
    
}

export default mongoose;

