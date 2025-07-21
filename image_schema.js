import mongoose from 'mongoose'

const ImageSchema=new mongoose.Schema({
    filename:String,
    public_id:String,
    img_Url:String
})

const File=mongoose.model('clouinary',ImageSchema)

export default File;