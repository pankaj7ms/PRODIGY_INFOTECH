const timeInfo=document.querySelector(".time");
const start=document.querySelector(".start-btn");
const stop=document.querySelector(".stop-btn");
const reset=document.querySelector(".reset-btn");

let [hours,minutes,seconds,milliseconds]=[0,0,0,0];
let interval;

function increaseTime(){
    milliseconds++;
    if(milliseconds===60){
        milliseconds=0;
        seconds++;
        if(seconds===60){
            seconds=0;
            minutes++;
            if(minutes===60){
                minutes=0;
                hours++;
            }
        }
    }
    let strHours= String(hours);
    let strMin= String(minutes);
    let strSec= String(seconds);
    let strMilSec= String(milliseconds);
    strHours=strHours.padStart(2,'0');
    strMin=strMin.padStart(2,'0');
    strSec=strSec.padStart(2,'0');
    strMilSec=strMilSec.padStart(2,'0');

    timeInfo.innerHTML=`${strHours} : ${strMin} : ${strSec} : ${strMilSec}`
}

function startWatch(){
    interval= setInterval(increaseTime,1);
}

function stopWatch(){
    clearInterval(interval);
    timeInfo.innerHTML=`${strHours} : ${strMin} : ${strSec} : ${milliseconds}`;
}

function resetWatch(){
    [hours,minutes,seconds,milliseconds]=[0,0,0,0];
    clearInterval(interval);
    timeInfo.innerHTML="00:00:00:00";
}

start.addEventListener('click',startWatch);
stop.addEventListener('click',stopWatch);
reset.addEventListener('click',resetWatch);
