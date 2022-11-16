var express=require('express')
var router=express.Router()
var pool=require('./pool')
var upload=require('./multer')

router.post('/subcategorysubmit',upload.single('icon'),function(req,res){
    try{
        console.log(req.body)
        console.log(req.file)
      pool.query("insert into subcategories(categoryid,subcategoryname,description,icon) values(?,?,?,?)",[req.body.categoryid,req.body.subcategoryname,req.body.description,req.file.originalname],function(error,result){
         if(error){
             console.log(error)
             res.status(500).json({result:false})
         }else{
            res.status(200).json({result:true})
         }       
      })
    }catch(e){
        console.log("Error : ",e)
        res.status(500).json({result:false})
    }
})

router.get('/displayallsubcategory',function(req,res){
    try{
       pool.query("select S.*,(select categoryname from categories C where C.categoryid=S.categoryid) as categoryname from subcategories S",function(error,result){
           if(error){
               res.status(500).json({data:[]})
           }else{
               res.status(200).json({data:result})
           }
       })
    }catch(e){
        console.log("Error : ",e)
        res.status(500).json({result:[]})         
    }
})


router.post('/displayallsubcategorybycategory',function(req,res){
    console.log(req.body)
    try{
       pool.query("select S.*,(select categoryname from categories C where C.categoryid=S.categoryid) as categoryname from subcategories S where S.categoryid=?",[req.body.categoryid],function(error,result){
           if(error){
               res.status(500).json({data:[]})
           }else{
               res.status(200).json({data:result})
           }
       })
    }catch(e){
        console.log("Error : ",e)
        res.status(500).json({result:[]})         
    }
})




router.post('/updatesubcategorydata',function(req,res){
    try{
        console.log(req.body)
        console.log(req.file)
      pool.query("update subcategories set categoryid=?,subcategoryname=?,description=? where subcategoryid=?",[req.body.categoryId,req.body.subCategoryName,req.body.description,req.body.subCategoryId],function(error,result){
         if(error){
             console.log(error)
             res.status(500).json({result:false})
         }else{
            res.status(200).json({result:true})
         }       
      })
    }catch(e){
        console.log("Error : ",e)
        res.status(500).json({result:false})
    }
})

router.post('/subcategoryeditpicture',upload.single('icon'),function(req,res){
    try{
        console.log(req.body)
        console.log(req.file)
      pool.query("update subcategories set icon=? where subcategoryid=?",[req.file.originalname,req.body.subCategoryId],function(error,result){
         if(error){
             console.log(error)
             res.status(500).json({result:false})
         }else{
            res.status(200).json({result:true})
         }       
      })
    }catch(e){
        console.log("Error : ",e)
        res.status(500).json({result:false})
    }
})

module.exports=router