const { create } = require('domain');
const sum=require('./fetchData');
const http=require('http');
const PORT=4007;
const server=http.createServer(async(req,res)=>{

    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // res.setHeader('Content-Type','text/html');
    // res.end('<h2>Hello from backend server</h2>');
    if(req.url=='/msg' && req.method=='GET'){
        res.setHeader('Content-Type','text/html');
        res.end('<h2>Hello message from node server</h2>');
    }


    if(req.url=='/data' && req.method=='GET'){
        // const data={
        //     id:101,
        //     name:'Amit',
        //     course:'FSD'
        // }
        res.setHeader('Content-Type','application/json');
        const sumData=await sum();
        res.end(JSON.stringify({msg:sumData}));
    }

    if(req.url=='/data' && req.method=='POST'){
         const data={
            id:101,
            name:'Amit',
            course:'FSD'
        }
        res.setHeader('Content-Type','application/json');
        res.end(JSON.stringify(data));
    }

    if(req.url=='/data' && req.method=='DELETE'){
         const data={
            message: 'Resource deleted successfully'
        }
        res.setHeader('Content-Type','application/json');
        res.end(JSON.stringify(data));
    }

})
server.listen(PORT,()=>{
    console.log(`Server is available on port ${PORT}`);
})