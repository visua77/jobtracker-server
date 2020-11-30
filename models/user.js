import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    email:{type:String, required:true,unique:true}, 
    password:{type:String, required:true, minlength:5},
    name: {type:String},
    avatar: String, 
/*     creator:String, 
    status:String, 
    
    createdAt:{
        type:Date, 
        default:new Date
    }  */

})

const PostUser = mongoose.model('users', userSchema)

export default PostUser