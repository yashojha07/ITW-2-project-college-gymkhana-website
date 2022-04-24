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
    res.render('contact')
});
router.post('/submit',(req,res)=>{
    
   MongoClient.connect(url , (err,db)=>{
       if(err){
           throw err;
       }
       const dbo = db.db('iiitn_gymkhana');

       const obj = {
           name: req.body.name,
           email: req.body.email,
           contact: req.body.contact,
           text: req.body.feedback
       }

       dbo.collection('feedbackformdata').insertOne(obj,(err,result)=>{
           if(err){
                throw err
           };
            db.close();
       })
      
   })
   
   res.redirect('/contact/feedbackers');
})

router.get('/feedbackers',(req,res)=>{
    MongoClient.connect(url , (err,db)=>{
       if(err){
           throw err;
       }
       const dbo = db.db('iiitn_gymkhana');

       dbo.collection('feedbackformdata').find({}).toArray((err,result)=>{
           if(err) throw err;

           res.render('submit',{result});
           db.close();
       })
      
   })
})

module.exports = router