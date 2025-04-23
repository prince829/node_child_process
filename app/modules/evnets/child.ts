process.on('message',(message)=>{
    console.log("Recived message from paent",message);
    if(process.send){

        process.send("Fuck off")
    }else{
        console.log("IPC connection not available");
        
    }
})