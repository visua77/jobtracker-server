import jwt from 'jsonwebtoken'

export const auth = (req, res, next)=> {
    
    let token = req.header("x-auth-token")
    
    try{

    if(!token){
    res.status(401).json({msg:"Not authorized."})
}

    let verified = jwt.verify(token, process.env.JWT_SECRET)

    if(!verified){
    res.status(401).json({msg:"Verification failed."})
}

    req.user = verified.id

next()

} catch(err){
    res.status(500).json({error:err.message})
}

}