import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie=(userId,res)=>{

  const token=jwt.sign({userId}, process.env.JWTSECRET
    ,{expiresIn:'30d'});
    console.log(token)
    res.cookie("ETest",token,{
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: false,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production', // Only set to true in production
    })
        console.log("cookies set successfully")
}

export default generateTokenAndSetCookie;