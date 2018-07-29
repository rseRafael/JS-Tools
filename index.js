const express = require("express");
const app = express();
const showObj = require("./showObj").showObj;

app.use((req, res, next)=>{
    res.writeHead(202, {"Content-Type": "text/html"});
    next();
});

app.get("/app", (req, res)=>{
    try{
        arr = showObj(app, "App");
        for(var e of arr){
            res.write(e.join(""));
        }
        res.write("<h4>fim!</h4>");
        res.end();
    }
    catch(Err){
        console.log(Err);
        res.send("<h4>Some error has occurred</h4>");

    }
});
app.listen(9090, ()=>{
    console.log("http://localhost:9090/")
})