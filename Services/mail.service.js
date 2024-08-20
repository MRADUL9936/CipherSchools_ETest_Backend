import nodemailer from 'nodemailer'

const transporterFromEmailAuth =()=>{ 

   return nodemailer.createTransport({
    service: 'gmail', // or use another email service
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

}

const sendMail=async(transporter,testName,score,email)=>{

    try{

    const mailOptions = {
    from: process.env.EMAIL,
    to:email,
    subject: 'Test Result',
    text: `Thankyou for taking the test.\n 
           Test Name: ${testName} \n
           Your Score: ${score}`
        
  };

  await transporter.sendMail(mailOptions);
  console.log("sent mail securely")
  
    }catch(err){
        console.log("Error ::mail.service.js :: Error sending email")
        throw err
    }
  
}
export {transporterFromEmailAuth, sendMail}