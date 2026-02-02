const { create } = require('domain');
const http=require('http');
const PORT=4007;
const server=http.createServer((req,res)=>{

    // res.setHeader('Content-Type','text/html');
    // res.end('<h2>Hello from backend server</h2>');
    if(req.url=='/msg' && req.method=='GET'){
        res.setHeader('Content-Type','text/html');
        res.end('<h2>Hello message from node server</h2>');
    }


    if(req.url=='/data' && req.method=='GET'){
        const data={
            id:101,
            name:'Amit',
            course:'FSD'
        }
        res.setHeader('Content-Type','application/json');
        res.end(JSON.stringify(data));
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