require("dotenv").config();
const express =require("express");
const bodyparser =require("body-parser");
const request =require("request");
const https=require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname +"/signup.html");
});
app.post("/",function(req,res){
  const firstname= req.body.fname;
const lastname= req.body.lname;
const email= req.body.email;


const data={
  members:[
    {
      email_address : email,
      status:"subscribed",
      Name:"firstname "+"lastname"
      // merge_feilds:{
        // FNAME :firstname,
        // LNAME :lastname
      // }
    }
  ]
};
 var jsonData= JSON.stringify(data);
 const url =process.env.API_ID
 const option={
   method: "POST",
   auth:process.env.AUTH_ID
 }
 const request=https.request(url ,option,function(response){
   if (response.statusCode=== 200){
       res.sendFile(__dirname +"/success.html");
   }else{
       res.sendFile(__dirname +"/failure.html");
   }
   response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})
request.write(jsonData);
request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/")
});
app.listen(process.env.POST || 3000,function(){
  console.log("server is running on port 3000");
});
