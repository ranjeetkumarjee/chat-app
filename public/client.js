const socket = io()


let textarea=document.querySelector('#textipt');
let messageArea=document.querySelector('.message_area')
let name;
do
{
    name =prompt('enter your name')
}while(!name);

let musicRcv= new Audio('receiving.mp3');
let musicSent=new Audio('sent.mp3');

let submitBtn=document.getElementById('send-btn');

submitBtn.addEventListener('click',()=>{
    let texval=document.getElementById('textipt').value;
        if(texval){
            sendMessage(texval);
        }
})


window.addEventListener('keyup',(e)=>{
    if(e.key ==='Enter'){
        if(e.target.value){
            sendMessage(e.target.value);
        }
    }
})

function sendMessage(message){
    let msg={
        user:name ,
        message:message.trim()
    }

    // message appent
    appendMessage(msg,'outgoing')

    textarea='';

    scrolltobottom()
    let texval=document.getElementById('textipt').value='';

    // send to server via socket
    socket.emit('message',msg)


}


function  appendMessage(msg, type){
    let mainDiv =document.createElement('div')
    let className=type
    mainDiv.classList.add(className,'message')

    let markup=`
    <h4>${msg.user}</h4>
    <p>${msg. message}</p>
   `
    mainDiv.innerHTML= markup

    messageArea.appendChild(mainDiv)
    if(type=='incoming'){
        musicRcv.play();
    }else{
        musicSent.play();
    }
}

// receive message

socket.on('message',(msg)=>{
    appendMessage(msg, 'incoming') 

    scrolltobottom()
})

function scrolltobottom(){
    messageArea.scrollTop=messageArea.scrollHeight
}