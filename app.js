const express= require("express");
const https= require("https");
const app= express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(request,response){
response.sendFile(__dirname+"/index.html");
  });
  app.post("/",function(request,response){
    const query=request.body.cityName;
    const apiKey="1b1dac32cf42d1115ea526f609f66a46";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url,function(res){
    console.log(res.statusCode);

    res.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const desc = weatherData.weather[0].description;
      const img = weatherData.weather[0].icon;
      const imgurl="http://openweathermap.org/img/wn/"+img+"@2x.png";
      response.write("<h1>Temperature is "+temp+" Celsius</h1>");
      response.write("<h1>Description is " +desc+ "</h1>");
      response.write("<img src=" +imgurl+ ">");
      response.send();
  });

});
});


app.listen(3000,function(){
  console.log("Server is running");
});
