const http=require('http');
const sum=require('./fetchData');
const fs=require('fs').promises
const path=require('path')
const {writeData,readData,deleteFile,fileReadAsync}=require('./usefsmodule');

const PORT=4007;
const STUDENT_FILE_PATH=path.join(__dirname,'student.json');
const CART_FILE_PATH=path.join(__dirname,'cart.json');

function normalizeEmail(value){
  return String(value || '').trim().toLowerCase();
}

async function readJsonFile(filePath,fallbackValue){
  try {
    const fileData=await fs.readFile(filePath,{encoding:'utf-8'});
    return JSON.parse(fileData || JSON.stringify(fallbackValue));
  } catch (error) {
    return fallbackValue;
  }
}

async function writeJsonFile(filePath,data){
  await fs.writeFile(filePath,JSON.stringify(data,null,2));
}

const server=http.createServer( async(req,res)=>{
const requestUrl=new URL(req.url,`http://${req.headers.host}`);
const pathname=requestUrl.pathname;
//     res.setHeader('Content-Type','text/html');
// res.end("<h2 style=color:red>Hello, Welcome to Node Server</h2>");
  res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

if(req.method==='OPTIONS'){
    res.statusCode=204;
    res.end();
    return;
}
     
if(req.url=='/msg' && req.method=="GET"){
    res.setHeader('Content-Type','text/html');
    res.end("<h1>Welcome message from Node Server</h1>");
}

if(req.url=='/data' && req.method=="GET"){
  
res.setHeader('Content-Type','application/json');
   const sumData=await sum();
     res.end(JSON.stringify({msg:sumData}))
   
}

if(req.url=='/writeData' && req.method=="GET"){
  
res.setHeader('Content-Type','application/json');
   const sumData=writeData();
     res.end(JSON.stringify({msg:sumData}))
   
}

if(req.url=='/readData' && req.method=="GET"){
  
res.setHeader('Content-Type','application/json');
   const sumData=readData();
     res.end(JSON.stringify({msg:sumData}))
   
}

if(req.url=='/deleteFile' && req.method=="GET"){
  
res.setHeader('Content-Type','application/json');
   const sumData=deleteFile();
     res.end(JSON.stringify({msg:sumData}))
   
}
if(req.url=='/readFileAsync' && req.method=="GET"){
  
res.setHeader('Content-Type','application/json');
   const sumData=await fileReadAsync()
     res.end(JSON.stringify({msg:sumData}))
   
}

if(req.url=='/students' && req.method=="GET"){
  try {
    const fdata=await fs.readFile(STUDENT_FILE_PATH,{encoding:'utf-8'});
    const arr=JSON.parse(fdata || '[]');
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify({students:arr}));
  } catch (error) {
    res.statusCode=500;
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify({msg:'Unable to read student data'}));
  }
}

if(pathname=='/cart' && req.method=="GET"){
  const email=normalizeEmail(requestUrl.searchParams.get('email'));

  if(!email){
    res.statusCode=400;
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify({msg:'email is required'}));
    return;
  }

  const cartMap=await readJsonFile(CART_FILE_PATH,{});
  const cartItems=Array.isArray(cartMap[email]) ? cartMap[email] : [];
  res.setHeader('Content-Type','application/json');
  res.end(JSON.stringify({cart:cartItems}));
  return;
}

if(pathname=='/cart/add' && req.method=="POST"){
  let body='';
  req.on('data',chunk=>{
    body+=chunk;
  });

  req.on('end',async()=>{
    let parsedBody;
    try {
      parsedBody=JSON.parse(body || '{}');
    } catch (error) {
      res.statusCode=400;
      res.setHeader('Content-Type','application/json');
      res.end(JSON.stringify({msg:'Invalid request body'}));
      return;
    }

    const email=normalizeEmail(parsedBody.email);
    const product=parsedBody.product || {};

    if(!email){
      res.statusCode=400;
      res.setHeader('Content-Type','application/json');
      res.end(JSON.stringify({msg:'email is required'}));
      return;
    }

    if(!product.id || !product.title || product.price===undefined){
      res.statusCode=400;
      res.setHeader('Content-Type','application/json');
      res.end(JSON.stringify({msg:'valid product details are required'}));
      return;
    }

    const cartMap=await readJsonFile(CART_FILE_PATH,{});
    const userCart=Array.isArray(cartMap[email]) ? cartMap[email] : [];
    const productId=Number(product.id);
    const existingItem=userCart.find(item=>Number(item.id)===productId);

    if(existingItem){
      existingItem.qty=Number(existingItem.qty || 1)+1;
    }else{
      userCart.push({
        id:productId,
        title:String(product.title),
        price:Number(product.price),
        image:String(product.image || ''),
        category:String(product.category || ''),
        qty:1
      });
    }

    cartMap[email]=userCart;
    await writeJsonFile(CART_FILE_PATH,cartMap);
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify({msg:'added',cart:userCart}));
  });
  return;
}

if(pathname=='/cart/update' && req.method=="POST"){
  let body='';
  req.on('data',chunk=>{
    body+=chunk;
  });

  req.on('end',async()=>{
    let parsedBody;
    try {
      parsedBody=JSON.parse(body || '{}');
    } catch (error) {
      res.statusCode=400;
      res.setHeader('Content-Type','application/json');
      res.end(JSON.stringify({msg:'Invalid request body'}));
      return;
    }

    const email=normalizeEmail(parsedBody.email);
    const productId=Number(parsedBody.productId);
    const qty=Number(parsedBody.qty);

    if(!email || Number.isNaN(productId) || Number.isNaN(qty) || qty<0){
      res.statusCode=400;
      res.setHeader('Content-Type','application/json');
      res.end(JSON.stringify({msg:'email, productId and valid qty are required'}));
      return;
    }

    const cartMap=await readJsonFile(CART_FILE_PATH,{});
    const userCart=Array.isArray(cartMap[email]) ? cartMap[email] : [];
    const updatedCart=userCart
      .map(item=>Number(item.id)===productId ? {...item,qty} : item)
      .filter(item=>Number(item.qty)>0);

    cartMap[email]=updatedCart;
    await writeJsonFile(CART_FILE_PATH,cartMap);
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify({msg:'updated',cart:updatedCart}));
  });
  return;
}
// if(req.url=='/data' && req.method=="POST"){
//    res.setHeader('Content-Type','application/json');
//     res.end(JSON.stringify({msg:"Post method for data insertion"})); 
// }

if(req.url=='/register' && req.method=="POST"){

  let arr=[]
  let body="";
  req.on('data',chunk=>{
    body+=chunk
  })

  req.on('end',async()=>{
  let parsedBody;
  try {
    parsedBody = JSON.parse(body || "{}");
  } catch (error) {
    res.statusCode = 400;
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify({msg:"Invalid request body"}));
    return;
  }

  const {name,email,password}=parsedBody;
  if(!name || !email || !password){
    res.statusCode = 400;
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify({msg:"name, email and password are required"}));
    return;
  }
  // console.log(name+email+password)
        try {
          const fdata=await fs.readFile(STUDENT_FILE_PATH,{encoding:'utf-8'})
          arr=JSON.parse(fdata || '[]');
        } catch (error) {
          arr=[];
        }

               const status=arr.find(ele=>ele.email==email)

               if(status){
                res.setHeader('Content-Type','application/json');
 
              res.end(JSON.stringify({msg:"Student already hai "}))
               }else{
                arr.push({name,email,password})
               await fs.writeFile(STUDENT_FILE_PATH,JSON.stringify(arr,null,2));
                 res.setHeader('Content-Type','application/json');
 
              res.end(JSON.stringify({msg:"Student registered ho gya !!!"}))
               }
  
      })
  

   
}

if(req.url=='/login' && req.method=="POST"){

    let arr=[]
  let body="";
  req.on('data',chunk=>{
    body+=chunk
  })

  req.on('end',async()=>{
let parsedBody;
  try {
    parsedBody = JSON.parse(body || "{}");
  } catch (error) {
    res.statusCode = 400;
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify({msg:"Invalid request body"}));
    return;
  }

const email=normalizeEmail(parsedBody.email);
const password=(parsedBody.password || '').trim();
if(!email || !password){
  res.statusCode = 400;
  res.setHeader('Content-Type','application/json');
  res.end(JSON.stringify({msg:"email and password are required"}));
  return;
}
    const fdata=await fs.readFile(STUDENT_FILE_PATH,{encoding:'utf-8'})
           arr=JSON.parse(fdata || '[]');

const status=arr.find(ele=>String(ele.email || '').trim().toLowerCase()==email && String(ele.password || '').trim()==password) 
       if(status){
        res.setHeader('Content-Type','application/json');
 
  res.end(JSON.stringify({msg:"success"}))
       }else{
         res.setHeader('Content-Type','application/json');
 
    res.end(JSON.stringify({msg:"Invalid user"}))
       }
  })

}

})

server.listen(PORT,()=>{
    console.log(`Service is available at ${PORT}`)
})