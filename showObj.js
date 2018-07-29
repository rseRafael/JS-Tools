function dissectObj(obj, name="Obj", objText=null){
    let arr = [], type, prop, content, txt, objLength = 0, count = 0;
    if(typeof obj == "object"){
        for(prop in obj){
            objLength++;
        }
       
        if(objText == null){
            arr.push(["<li>", `(${typeof obj}) ${name}`]);
        }
        else{
            arr.push(["<li>", objText])
        }
        arr.push(["<ul>"]);       
        for(prop in obj){
            count++;
            type = typeof obj[prop];
            content = (type == "string" || type == "number" || type == "boolean" ) ? `= ${obj[prop]}`: ``;
            txt = `(${type}) ${name} [ ${prop} ] ${content}`;
            if(type == "object"){
                arr2 = dissectObj(obj[prop],prop ,txt);
                if(arr2[arr2.length - 1][0].search("</ul>") == -1){
                    arr2.push(["</ul>"]);
                }
                arr2.push(["</li>"]);
                for(prop of arr2){
                    arr.push(prop);
                }
            }
            else{
                element = ["<li>", txt, "</li>"];
                arr.push(element);
                if(count == objLength){
                    arr.push(["</ul>"]);
                }
            }
        }
    }
    return arr;
}

function showObj(obj, name){
    var arr = dissectObj(obj, name);
    var arr2 = [ ["<ul>"] ];
    arr = arr2.concat(arr);
    arr2 = [ ["</ul>"] ];
    arr  = arr.concat(arr2);
    return arr;
}


function showObjInHTML(obj, name, res){
    try{
        res.writeHead(202, {"Content-Type": "text/html"});
        arr = showObj(obj, name);
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
}
exports.showObj = showObj;
exports.showObjInHTML = showObjInHTML;