var express=require('express')
var router=express.Router()
var pool=require("./pool")
var upload=require("./multer")
router.post('/companysubmit',upload.single('icon'),function(req,res){
 try{
   console.log(req.body)
   console.log(req.file)
   pool.query("insert into company(companyname,contactperson,companycontactno,companyemailid,address1,address2,country,state,city,pincode,logo)values(?,?,?,?,?,?,?,?,?,?,?)",
  [req.body.companyname,
   req.body.contactperson,
   req.body.companycontactno,
   req.body.companyemailid,
   req.body.address1,
   req.body.address2,
   req.body.country,
   req.body.state,
   req.body.city,
   req.body.pincode,
   req.file.originalname],function(error,result){
    console.log(error)
   if(error)
   { console.log(error)
   res.status(500).json({result:false})
   
   }
   else
   {
    res.status(200).json({result:true})
   }
   })
 } 
catch(e)
{    console.log("Error:",e)
    res.status(500).json({result:false})
}
})
router.get('/displayallcompany',function(req,res){
  try{
    pool.query("select * from company",function(error,result){
      if(error)
      { res.status(500).json({data:[]})}
      else
      { res.status(200).json({data:result})
    }
  })
 }
  catch(e)
  {
    console.log("Error:",e)
    res.status(500).json({result:[]})
  }
})
router.post('/upadatecompanydata',function(req,res){
  pool.query("update company set companyname=? contactperson=? companycontactno=? companyemailid=? address1=? address=? country=? state=? city=? pincode=? where companyid=?",
  [req.body.companyId,
   req.body.companyName,
   req.body.contactPerson,
   req.body.companContactNo,
   req.body.companyEmailId,
   req.body.address1,
   req.body.address2,
   req.body.country,
   req.body.state,
   req.body.city,
   req.body.pincode,
   req.file.originalname])
    {
      if(error)
      { res.status(500).json({result:false})}
      else
      { res.status(200).json({result:true})}
    }
})
router.post('/companyeditpicture',upload.single('logo'),function(req,res){
  try{
    console.log(req.body)
    console.log(req.file)
    pool.query("update company set logo=? where companyid=?",[req.file.originalname,req.body.companyId],function(error,result){
    if(error)
    { console.log(error)
    res.status(500).json({result:false})
    }
    else
    {
     res.status(200).json({result:true})
    }
    })
  } 
 catch(e)
 {    console.log("Error:",e)
     res.status(500).json({result:false})
 }
 })
module.exports=router