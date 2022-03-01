const User =require('../../model/admin')
const Query =require('../../model/Query')
const bcrypt = require('bcrypt');
const fs =require('fs')
const jwt =require('jsonwebtoken')
const SecretKey ="vhdscsjfcsufjscvsvcsakvcMcvgwgad"
const  {validationResult, body} = require('express-validator');
const { ConnectionStates } = require('mongoose');
const { json } = require('body-parser');



exports.userPanel =async(req,res,next)=>{
      const data = await Query.find({users:req.data.userId}).populate('users','-role')
      console.log(data)
      const admin =await User.findOne({role:'admin'})
      console.log(req.data)
      console.log('admin',admin)
      res.render('home',{
           user:req.data,
           data:data,
           admin:admin
      })
  }

 exports.signupPage =async(req,res,next)=>{
     res.render('signup')
 }


exports.signup =async(req,res,next)=>{
     try{   
          const {name,email,password,PasswordCofirm} =req.body
          
          const user = await User.findOne({email:email})
               if(!user){
                    const newuser = new User({name,email,Password:password,PasswordCofirm})
                    await newuser.save()
                    res.status(201).json({
                         msg:'User Login SucessFully'
                    })
               }else{
                    res.status(401).json({
                         msg:'User is already exists'
                    })
               }
  
          
     }catch(err){
         res.status(500).json({
              msg:"Internal server Error"
         })
     }

}

exports.LogInpage =(req,res,next)=>{
     res.render('login',{
          message:'' 
     })
 }

exports.login =async(req,res,next)=>{
      try{ 
                  console.log(req.body)
                    const {email,password} =req.body

                    if(!email || !password){
                         res
                         .send(400)
                         .json({
                              message:'please provide the email && password',
                              satusCode:400
                         })
                    }
                    const user =await User.findOne({
                         $and:[
                              {email:email},
                              {role:'user'}
                              ]
                    }).select('+Password')
                    console.log(user)
                    if(!user){
                         res.status(401).json({
                              message:'Invalid login credentials',
                         })
                    }
                    const correct = await user.correctPassword(password,user.Password)
                    console.log(correct,"vikas")
                    if(correct==true){
                        var token = jwt.sign({
                            userId:user.id,
                            name:user.name,
                            email:user.email
                       },SecretKey,{ expiresIn :'1h' })
                           console.log(token)

                            res.status(200).json({
                                 token
                            })
        
                    }else{
                         res.status(401).json({
                              satusCode:401,
                              message:'Invalid login credentials',
                         })
                    }  
                    
      }catch(err){
          res.render('login',{
               message:'intnal server Error'
            })
      }
}


exports.dashboard =async(req,res,next)=>{
     try{
          const id =req.data.userId
          const UserData =awaitUser.findOne({_id:id})
         if(!UserData){
             res.status(401).json({satusCode:401,message:'Unauthorized admin '})
         }else{
             res.status(201).json({satusCode:201,message:'Authorized Admin', UserData})
         }
            
     }catch(err){
          res.status(500).json({
               satusCode:500,
               message:'Failed && Internal Server Error and Please Try Again',
     
          })
     }
}

exports.getChangePassword =(req,res,next)=>{
     res.render('changePasssword')
}


 exports.ChangePassword  =async(req,res,next)=>{
   try{
        console.log(req.data)
         console.log(req.body)
         const {oldPassword,newPassword,confirmNewpassword}=req.body
      if(newPassword===confirmNewpassword){

            if(oldPassword!=newPassword){
               const admin = await User.findById({_id:req.data.userId}).select('+Password')
                admin.Password =newPassword
                admin.PasswordCofirm=confirmNewpassword
                await admin.save()
                res.status(201).json({
                     message:'Password changed SucessFully'
                })
            }
      }else{
           res.status(405).json({
                statuscode:405,
                message:"New Password and confirm password are not same "
           })
      }         
   }catch(err){
        console.log(err)
              res.status(400).json({
                   status:"fail",
                   HowToCreateUsreSignup:req.requestTime,
                   data:{
                     err
                   }
              })
        }
 }

exports.logout=async(req,res,next)=>{
  
          res.redirect('/login')  
}



exports.Query =async(req,res,next)=>{
   try{
        console.log(req.data)
       let files =req.files.avatar
       var mutliplefiles =[]
        files.map((file,index)=>{
          mutliplefiles.push(file.filename)
        })
     
     const {Create,Review,Payroll,End_of_Service,Policy_and_Procedure,Talent_Acquisition,Training_and_Coaching} =req.body

     const data= {   users:req.data.userId,Create,Review,Payroll,End_of_Service,Policy_and_Procedure,Talent_Acquisition,Training_and_Coaching,avatar:mutliplefiles}
     const query = await new Query(data)
     query.save()
      res.redirect('/user')

   }catch(err){
        res.sendStatus(500)
   }
     
}



exports.getView=async(req,res,next)=>{
     try{
           console.log(req,data)
           console.log(req.params.id,"vikas")
            const query = await Query.findOne({_id:req.params.id})
            console.log(query.avatar)
           res.render('view',{
             data:query.avatar
           })

     }catch(err){
          res.sendStatus(500)
     }
} 



exports.getProfile =(req,res,next)=>{
     console.log(req.data)
    res.render('profile',{
         user:req.data
    })
}

exports.updateProfile =async(req,res,next)=>{
  const email =req.data.email
  console.log(email)
    await User.findOneAndUpdate({email:email},req.body,(err,data)=>{
       if(err){
            console.log(err)
       }else{
            console.log('profile is updayted sucessfully',data)
       }
  })
}