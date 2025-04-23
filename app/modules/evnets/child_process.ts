  import {exec, execFile, spawn} from 'node:child_process'

  /****************Swapn ******************* */
    // const child=spawn('ls',['-lh','/usr']);//TO fetch file
    // const child=spawn('df',['-h']);//To fetch disk use
    const child=spawn('cat',['./.env']);//To read file
    child.stdout.on('data',(data)=>{
        console.log("stdOut",data.toString());
        
    });
    child.stderr.on("error",(error)=>{
        console.log("stdErr",error);
        
    });
    child.on("close",(code)=>{
        console.log("Process closed with code:",code);
        
    })
    /****************Swapn ******************* */
    /****************Child Process Exec ******************* */
    exec('ls -lh /usr',(error,_stdout,stderr)=>{
        if(error){
            console.error(error);
            return;
        };
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
          }
            // console.log("Exex Out", stdout.toString());
    })
    /****************Child Process Exec ******************* */

     /****************Child Process ExecFile******************* */
     execFile('ls',['-lh','/usr'],(error,stdout,stderr)=>{
        //it's not shell command like exec or swapn tht's it is being more squre here ls command didn't lookup in shell it will direct execute
        if(error){
            console.error(error);
            return;
        };
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
          }
            console.log("ExecFile Out", stdout.toString());
    })
    /****************Child Process ExecFile ******************* */