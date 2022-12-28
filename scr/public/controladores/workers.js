var w_session = new window.Worker('w_session.js');

w_session.addEventListener('message',wmess);

function wmess(e){
    console.log(e.data);
   }

export default {

    workerSession(){
       
       w_session.postMessage({mess:"intelagro"});
        
    },
   
}