var express=require('express')
var router=express.Router()
var pool=require("./pool")
var upload=require("./multer")

router.get("/displayallfinalproduct", function (req, res, next) {
  pool.query("select P.*,(select categoryname from categories C where C.categoryid=P.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=P.subcategoryid) as subcategoryname,(select color from colors Col where Col.colorid=P.colorid) as color,(select model from models Mo where Mo.modelid=P.modelid) as model,(select productname from product Po where Po.productid=P.productid) as productname,(select companyname from company Co where Co.companyid=P.companyid) as companyname from finalproduct P", function (error, result) {
    if (error) {
      res.status(500).json([]);
    } else {

      res.status(200).json({ data: result });
    }
  });
});


router.get("/displayallfinalproducttrending", function (req, res, next) {
  pool.query("select P.*,(select categoryname from categories C where C.categoryid=P.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=P.subcategoryid) as subcategoryname,(select color from colors Col where Col.colorid=P.colorid) as color,(select model from models Mo where Mo.modelid=P.modelid) as model,(select productname from product Po where Po.productid=P.productid) as productname,(select companyname from company Co where Co.companyid=P.companyid) as companyname from finalproduct P where P.productstatus='Trending'", function (error, result) {
    if (error) {
      res.status(500).json([]);
    } else {

      res.status(200).json({ data: result });
    }
  });
});


router.post("/displayallfinalproductbysubcategoryid", function (req, res, next) {
  console.log(req.body)
  pool.query("select P.*,(select categoryname from categories C where C.categoryid=P.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=P.subcategoryid) as subcategoryname,(select color from colors Col where Col.colorid=P.colorid) as color,(select model from models Mo where Mo.modelid=P.modelid) as model,(select productname from product Po where Po.productid=P.productid) as productname,(select companyname from company Co where Co.companyid=P.companyid) as companyname from finalproduct P where P.subcategoryid=?",[req.body.subcategoryid], function (error, result) {
    if (error) {
      res.status(500).json([]);
    } else {

      res.status(200).json({ data: result });
    }
  });
});


router.post("/displayallfinalproductbyprice", function (req, res, next) {
  console.log(req.body)
  pool.query("select P.*,(select categoryname from categories C where C.categoryid=P.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=P.subcategoryid) as subcategoryname,(select color from colors Col where Col.colorid=P.colorid) as color,(select model from models Mo where Mo.modelid=P.modelid) as model,(select productname from product Po where Po.productid=P.productid) as productname,(select companyname from company Co where Co.companyid=P.companyid) as companyname from finalproduct P where P.subcategoryid=? and  P.price between ? and ?",[req.body.subcategoryid,req.body.min,req.body.max], function (error, result) {
    if (error) {
      res.status(500).json([]);
    } else {

      res.status(200).json({ data: result });
    }
  });
});






router.post('/savemorepictures',upload.any(),function(req,res){

    console.log(req.body)
    console.log(req.files)
    var q="insert into morepictures(finalproductid,image)values ?"
    pool.query(q,[req.files.map((item)=>[req.body.finalproductid,item.filename])],function(error,result){

     if(error)
     {
        return res.status(500).json({result:false})

     }
     else
     {
      return res.status(200).json({result:true})

     }
    
    })
  }
)




router.post('/finalproductsubmit',upload.single('picture'),function(req,res){
 try{
   console.log(req.body)
   console.log(req.file)
   pool.query("insert into finalproduct(categoryid,subcategoryid,companyid,productid,colorid,modelid,price,offerprice,stock,size,description,picture,productstatus)values(?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.companyid,req.body.productid,req.body.colorid,req.body.modelid,req.body.price,req.body.offerprice,req.body.stock,req.body.size,req.body.description,req.file.originalname,req.body.productstatus],function(error,result){
   if(error)
   {console.log(error)
   res.status(500).json({result:false})
   }
   else
   {console.log("Result",result.insertId)
    res.status(200).json({result:true,finalproductid:result.insertId})
   }
   })
 } 
catch(e)
{    console.log("Error:",e)
    res.status(500).json({result:false})
}
})

router.post("/updatefinalproductdata",function(req,res){
  try{
    pool.query("update finalproduct set categoryid=?,subcategoryid=?,companyid=?,productid=?,colorid=?,modelid=?,price=?,offerprice=?,stock=?,size=?,description=? where finalproductid=?",[req.body.categoryid,req.body.subcategoryid,req.body.companyid,req.body.productid,req.body.colorid,req.body.modelid,req.body.price,req.body.offerprice,req.body.stock,req.body.size,req.body.description,req.body.finalproductid],function(error,result){
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

router.post('/finalproducteditpicture',upload.single('picture'),function(req,res){
  pool.query("Update finalproduct set picture=? where finalproductid=?",
  [req.file.originalname,req.body.finalproductid],function(error,result){
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

router.post('/deletefinalproduct',function(req,res){
  try{
    pool.query("delete from finalproduct where finalproductid=?",[req.body.finalproductid],function(error,result){
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
module.exports=router
