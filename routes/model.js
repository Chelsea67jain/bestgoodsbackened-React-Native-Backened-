var express=require('express');
var router=express.Router();
var pool=require("./pool");
var upload=require("./multer");

router.post('/modelsubmit',upload.single('picture'),function(req,res){
    try{
      console.log(req.body)
      console.log(req.file)
     pool.query("insert into models(categoryid,subcategoryid,companyid,productid,model,size,weight,picture) values(?,?,?,?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.companyid,req.body.productid,req.body.model,req.body.size,req.body.weight,req.file.originalname],function(error,result){
         if(error)
         {
           console.log(error)
           res.status(500).json({result:false})
         }
         else

         {
           res.status(200).json({result:true})
         }
     })
    }
    catch(e)
    {
        console.log("Error:",e)
        res.status(500).json({result:false})
    }
   })

   router.get('/displayallmodel',function(req,res){
    try{
      pool.query("select P.*,(select categoryname from categories C where C.categoryid=P.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=P.subcategoryid) as subcategoryname,(select productname from product N where N.productid=P.productid) as productname,(select companyname from company Co where Co.companyid=P.companyid) as companyname from models P",function(error,result){
        if(error)
        {
          res.status(500).json({data:[]})
        }
        else{
          res.status(200).json({data:result})
         
        }
      })
    }
    catch(e)
    {
      console.log("ERROR:",e)
      res.status(500).json({data:[]})
    }
  })

  
  router.post('/displayallmodelbycompany',function(req,res){
    try{
      pool.query("select P.*,(select categoryname from categories C where C.categoryid=P.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=P.subcategoryid) as subcategoryname,(select productname from product N where N.productid=P.productid) as productname,(select companyname from company Co where Co.companyid=P.companyid) as companyname from models P where P.companyid=?",[req.body.companyid],function(error,result){
        if(error)
        {
          res.status(500).json({data:[]})
        }
        else{
          res.status(200).json({data:result})
         
        }
      })
    }
    catch(e)
    {
      console.log("ERROR:",e)
      res.status(500).json({data:[]})
    }
  })


  
  
  router.post("/updatemodeldata",function(req,res){
    try{
      pool.query("update models set categoryid=?,subcategoryid=?,companyid=?,productid=?,model=?,size=?,weight=? where modelid=?",[req.body.categoryId,req.body.subcategoryId,req.body.companyId,req.body.productId,req.body.model,req.body.size,req.body.weight,req.body.modelId],function(error,result){
        console.log(result)
        if(error)
        {
          res.status(500).json({result:false})
        }
        else{
          res.status(200).json({result:true})
         
        }
      })
  
    }
    catch(e){
      res.status(500).json({result:false})
    }
  })

  router.post('/modeleditpicture',upload.single('picture'),function(req,res){
    pool.query("Update model set picture=? where modelid=?",
    [req.file.originalname,req.body.modelId],function(error,result){
      try{
        console.log(req.body)
        console.log(req.file)
         if(error)
         {
             res.status(500).json({result:false})
         }
         else{
             res.status(200).json({result:true})
         }
      }
      catch(e)
      {
         console.log("Error:",e)
         res.status(500).json({result:false})
      }
    })
    })

    router.post('/deletemodel',function(req,res){
      try{
        pool.query("delete from model where modelid=?",[req.body.modelid],function(error,result){
        console.log(error)
        console.log(result)
          if(error)
          {
            res.status(500).json({result:false})
          }
          else{
            res.status(200).json({result:true})
          }
        })
      }
      catch(e){
        console.log("Error :",e)
        res.status(500).json({result:false})
      }
      })
    

   module.exports=router;