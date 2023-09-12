const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const ejs=require("ejs");
const https=require("https");
app.set('view engine','ejs');
let temp;
let speed;
let cityName;
let weatherDescription;
let icon;
let imageUrl;
let temp_max;
let temp_min;
let feels_like;
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res)
{
//  res.send("server is runnig at port 3000");
   res.sendFile(__dirname+"/index.html");
})
app.post("/",function(req,res)
{
  console.log(req.body.cityName);
  console.log("post request recived ");

  const query=req.body.cityName;
  const appid="f033119c3185a60c36b76cffda325b68";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&APPID="+appid+"&units=metric";
  https.get(url,function(response)
  {
  console.log(response.statusCode)
  response.on("data",function(data)
  {
  const weatherData=JSON.parse(data);
   temp=weatherData.main.temp;
   speed=weatherData.wind.speed;
   temp_max=weatherData.main.temp_max;
   temp_min=weatherData.main.temp_min;
   feels_like=weatherData.main.feels_like;
   
  console.log(speed);
   weatherDescription=weatherData.weather[0].description;
   cityName=weatherData.name;
   icon=weatherData.weather[0].icon;
//  const tempmin=weatherData.main.temp_min;
//  const tempmax=weatherData.main.temp_max;
//  console.log(icon);
  imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png"
  console.log(cityName)
//  res.write("the temperature in "+cityName+" is "+temp+" degree celsius.")
//  res.write("minimum and maximum temps are "+tempmax+","+tempmin)

    res.redirect("/data");

  //res.send("<p>the temperature in "+cityName+" is "+temp+" degree celsius.</p><br>");
  })
  })

})
/*
//https

*/
//  res.render("data",{temp:temp,speed:speed,cityName:cityName,weatherDescription:weatherDescription});
app.get("/data",function(req,res)
{
   res.render("data",{temp:temp,cityName:cityName,weatherDescription:weatherDescription,imageUrl:imageUrl,temp_min:temp_min,temp_max:temp_max,feels_like:feels_like});
})
app.listen(3000,function()
{
  console.log("server is runnig on port 3000.");
})



/*
app.get("/about",function(req,res)
{
  res.render("about",{Content_page:aboutContent});
})
*/
/*
res.render("data",{temp:temp,speed:speed,cityName:cityName,weatherDescription:weatherDescription});
res.sendFile(__dirname+"data.ejs")
*/
