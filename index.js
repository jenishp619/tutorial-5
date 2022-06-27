const http = require("http");
const app = require("./app");

const port = process.env.PORT ||5000;

console.log(port);

const server = http.createServer(app);

server.listen(port,()=>{
    console.log("listening on"+port);
})