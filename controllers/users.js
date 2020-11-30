import PostUser from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const getUsers = async (req,res)=> {
    try{
        const users = await PostUser.find()
        res.status(200).json(users)
    }
    catch (error){
        res.status(404).json({message:error.message})
        
    }
}

export const createUser = async (req, res)=> {

        //const user = req.body
        //const savedUser = new PostUser(user)
        let {email, password, password2, name, avatar} = req.body
    try{
        
        //validate
         if(!email || !password || !password2 || !name){
            res.status(400).json({msg: "Not all fields has been entered."})
        }
        if (password.length < 5){
            res.status(400).json({msg: "Password must be longer than 5 characters."})
        }
        if (password !== password2){
            res.status(400).json({msg: "Both passwords must be the same."})
        } 

        const existingUser = await PostUser.findOne({email})
        if(existingUser){
            res.status(400).json({msg: "This user already exists"})
        }

        if(!name){
            name = email
        }

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)
        //console.log(passwordHash)
    
        const newUser = new PostUser({
            email,
            password: passwordHash,
            name,
            avatar
        })
        
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)  
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
} 


export const loggingIn = async (req, res)=> {
    try{
        
        const { email, password} = req.body
        
        //validation
        if (!email || !password){
            res.status(400).json({msg: "Not all fields have been entered."})
        }
        const user = await PostUser.findOne({email:email})
        if(!user){
            res.status(400).json({msg: "No account with this email in the database."})
        }

        console.log(user.password)
        const isMatch = await bcrypt.compare(password, user.password)
         
         if (!isMatch) {
            res.status(400).json({msg: "Invalid credentials."})
        }  
         const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        res.json({
            token, 
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                avatar:user.avatar
            }
        }) 
    }catch (err) {
        res.status(500).json({msg: err.message})

    }
}

export const deleteUser = async (req,res)=> {
   try{
       const deletedUser = await PostUser.findByIdAndDelete(req.user)
       res.json(deletedUser)
   }catch (err) {
       res.status(500).json({error: err.message})
   }
}

export const tokenValid = async (req, res) => {
    
    try{
        const token = req.header('x-auth-token')
        if (!token){
            return res.json(false)
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if (!verified){
            return res.json(false)
        }
        const user = await PostUser.findById(verified.id)
        if (!user) {
            return res.json(false)
        }
        res.json(true)
        }catch (err){
        res.status(500).json({error: err.message})    
        }
}


export const getUser = async (req, res)=> {
    const user = await PostUser.findById(req.user)
    res.json({name: user.name, 
    id: user._id,
    email: user.email,
    avatar: user.avatar}
    )
}


const seedDB = async() => {
    //Deletes every post in the user-db
    await PostUser.deleteMany()
}

//seedDB()