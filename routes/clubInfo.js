const express = require('express');
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const router = express.Router();

router.use(bodyParser.urlencoded({
   extended: true
}));

router.use(bodyParser.json());

router.get('/',(req,res)=>{
    res.render('clubinfo');
})

router.post('/events',(req,res)=>{
 MongoClient.connect(url , (err,db)=>{
       if(err){
           throw err;
       }
       const dbo = db.db('iiitn_gymkhana');

       const obj = {
           name: req.body.name,
           club: req.body.society,
           startDate: req.body.startDate,
           endDate: req.body.endDate
       }
      
       dbo.collection('Eventdata').insertOne(obj,(err,result)=>{
           if(err){
                throw err;
           };
           
            db.close();
       })
      
   })
   res.redirect('/clubInfo');
   
})

module.exports = router;