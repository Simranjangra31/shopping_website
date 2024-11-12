let express=require('express');
let bodyparser=require('body-parser');
let session=require('express-session');
// let bcrypt=require('bcrypt');
let multer=require('multer');
let path=require('path');
let mysql=require('mysql');
let url=require('url');
const { data } = require('jquery');


let con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"website"
});

let app=express();
// let con=require('./connection');
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine','ejs');

app.set("views",path.resolve("./views"));
// app.post("/additems",(req,res)=>{
//     let p=req.body.p;
// });


// let p="";
let storage=multer.diskStorage({
    destination:function(req,file,cb){
     let p=req.body.category;
        // console.log(`This is multer calling for folder ${p}`);
        return cb(null,`./public/uploads/${p}`);
    
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`);
    }
});

const upload=multer({
    storage:storage
});

app.post("/add",upload.single("image"),(req,res)=>{
    console.log(req.file);
    
    let p=req.body.category;
    // console.log(`I'm floder ${p}`);
    let id=req.body.id;
    let name=req.body.nm;
    let  price=req.body.price;
    let img="/uploads/"+p+"/"+req.file.filename;
   
console.log(img);
     con.connect((req,res)=>{
       
        const data="insert into "+p+" values('"+img+"','"+name+"','"+price+"','"+id+"')";
        con.query(data,(err,result)=>{
            if (err) throw err;
            console.log("data stored...");
        });
   
    });
    res.redirect("/additems");
});

app.get("/suit",(req,res)=>{
    let dt1="select *from suit";
    con.query(dt1,(err,result)=>{
        if(err) throw err;
        res.render("suit",{category:result});
    });
});

// app.get("/party",(req,res)=>{
//     let dt2="select *from party";
//     con.query(dt2,(err,result)=>{
//         if(err)throw err;
//         res.render("party",{party:result});
//     });
// });

// app.get("/western",(req,res)=>{
//     let dt3="select *from suit";
//     con.query(dt3,(err,result)=>{
//         if(err)throw err;
//         res.render("western",{western:result});
//     });
// });

// app.get("/saree",(req,res)=>{
//     let dt4="select *from saree";
//     con.query(dt4,(err,result)=>{
//         if(err)throw err;
//         res.render("saree",{saree:result});
//     });
// });
// app.get("/dupatta",(req,res)=>{
//     let dt5="select *from dupatta";
//     con.query(dt5,(err,result)=>{
//         if(err)throw err;
//         res.render("dupatta",{dupatta:result});
//     });
// });
// app.get("/lehanga",(req,res)=>{
//     let dt6="select *from lehanga";
//     con.query(dt6,(err,result)=>{
//         if(err)throw err;
//         res.render("lehanga",{lehanga:result});
//     });
// });







app.post('/submit',(req,res)=>{
    con.connect((err)=>{
        if(err) throw err;
        console.log("connected");
        let name=req.body.nm;
        let pno=req.body.num;
        let ema=req.body.em;
        let pass=req.body.pswrd;
        let dt=req.body.date;
        let st=req.body.state;
        const qry="insert into login values('"+name+"','"+pass+"','"+pno+"','"+ema+"','"+dt+"','"+st+"')";
        con.query(qry,(err,result,fields)=>{
            if(err)throw err;
            console.log("data stored successfully");
    
        });

       

        const qr="select *from login";
        con.query(qr,(err,result)=>{
            if(err) throw err;
            console.log(result);
            

        });
       
    })
    res.redirect('/signup');
});

app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/additems',(req,res)=>{
    res.render('additems');
});

app.get('/suit',(req,res)=>{
    res.render('suit');
});

app.get('/party',(req,res)=>{
    res.render('party');
});

app.get('/lehanga',(req,res)=>{
    res.render('lehanga');
});

app.get('/dupatta',(req,res)=>{
    res.render('dupatta');
});

app.get('/western',(req,res)=>{
    res.render('western');
});

app.get('/saree',(req,res)=>{
    res.render('saree');
});
app.get('/login',(req,res)=>{
    res.render('login');
});

app.get('/signup',(req,res)=>{
    res.render('signup');
});

app.listen(4444);