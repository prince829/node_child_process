import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import { config } from "./app/config/config.js";
// import { stderr } from "node:process";
import {fork} from 'node:child_process';
import { join } from "node:path";
const app=express();

async function Instane() {
    app.use(cors({
        methods: "GET,POST,PUT,PATCH",
        allowedHeaders:"token, content-type,COntentType",
        origin(requestOrigin, callback) {
            if(requestOrigin==undefined){
                return callback(null,true)
            }else{
                return callback(new Error("Not allowed by cors"),false)
            }
        },
    }));
    app.use(bodyParser.urlencoded({
        limit:'50mb',
        extended: true,
        parameterLimit:500
    }))

         /****************Child Process Fork******************* */
        const childFork=fork(join(process.cwd(),'app/modules/evnets/child.js'))
        childFork.send('Hello, Child!');
        childFork.on("message",(message)=>{
           console.log("Message from child",message);
           
        })
        /****************Child Process Fork ******************* */
}
const onError=async(error:any)=>{
    const port = 3000;
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(0);
            break;
        default:
      
}
}
(async()=>{
    try{
        Instane().then(async()=>{
              app.listen(config.server.port);
              app.on("error",onError);
              console.log("Server has started")
        })
    }catch(err){
        console.error(err);
        process.exit(1)
    }

})()