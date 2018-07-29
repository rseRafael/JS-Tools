const express = require("express");
const app = express();
const showObjInHTML = require("./showObj").showObjInHTML;

const http = require("http");
const pdf2image =require("pdf2image");

app.get("/request", (req, res)=>{
    showObjInHTML(req, "Request", res);
});
app.get("/response", (req, res)=>{
    showObjInHTML(res, "Response", res);
});
app.get("/http", (req, res)=>{
    showObjInHTML(http, "Http", res);
});
app.get("/pdf2image", (req, res)=>{
    showObjInHTML(pdf2image, "Pdf2Image", res);
});


app.get("/", (req, res)=>{
    res.writeHead(202, {"Content-Type": "text/html"});
    let content = `
    <a href="/request">Request</a>
    <a href="/response">Response</a>
    <a href="/http">Http</a>
    <a href="/pdf2image">Pdf2Image</a>
    `;
    res.end(content);
});
app.listen(9090, ()=>{
    console.log("http://localhost:9090/")
});