var express=require("express");
var router=require("./router/router.js");
var app=express();

app.set("view engine","ejs");   

app.get("/",router.showIndex);
app.get("/addbook",router.addbook);
app.get("/doaddbook",router.doaddbook);
app.get("/edit",router.edit);

app.listen(9898);