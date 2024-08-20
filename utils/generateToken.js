import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie=(userId,res)=>{

  const token=jwt.sign({userId}, process.env.JWTSECRET
    ,{expiresIn:'30d'});

    res.cookie("ETest",token,{
        maxAge:30*24*60*60*1000,
            httpOnly:true,
            sameSite:"strict"
        })
        console.log("cookies set successfully")
}

export default generateTokenAndSetCookie;