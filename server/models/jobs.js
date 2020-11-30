import mongoose from 'mongoose'

const jobsSchema = mongoose.Schema({
    title:{type:String, required:true,},
    description:{type:String, required:true, minlength:12},
    status:{type:String, required:true, default:'Green'},
    note:{type:String},
    createdAt: {
        type: Date,
        default: Date.now
    },
    userId:{type:String, required:true}
})

const job = mongoose.model('jobs', jobsSchema)

export default job