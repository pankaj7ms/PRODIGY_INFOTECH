const input=document.querySelector(".input");
const search=document.querySelector(".search");
const temp=document.querySelector(".temp");
const city=document.querySelector(".city-name");
const humidity=document.querySelector(".humidity .value");
const wind=document.querySelector(".wind-speed .value");
const img=document.getElementById("image");
const weatherData= document.querySelector(".weather-data");
const mainDesc= document.querySelector(".main-desc");
const Err= document.querySelector(".disp-err");
search.addEventListener('click',()=>{
    let cityname1= input.value;
    getTemp(cityname1);
});

async function getTemp(abc){
    let cityname=abc;
    let limit=1;
    
    APIkey='my key here';
    const url=`http://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=${limit}&appid=${APIkey}`

    let resp= await fetch(url);
    let res= await resp.json();

    if(res.cod==='400'){
        Err.innerHTML="enter a city name";
    }
    else if(res.length===0){
        Err.innerHTML="invalid city name";
        return;
    } 
    else{
        Err.innerHTML="Loading...";
    }    
    
    let lat=res[0].lat;
    let lon=res[0].lon;
    const url2=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;

    let resp2= await fetch(url2);
    let res2= await resp2.json();

    const weatherIcon= res2.weather[0].icon;
    let imgUrl=`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    img.src=imgUrl;

    //object to store weather data
    const mydata= {};
    mydata.city= res2.name;
    mydata.temp= res2.main.temp;
    mydata.humidity= res2.main.humidity;
    mydata.wind= res2.wind.speed * 3.6;
    mydata.main= res2.weather[0].main;
    mydata.state= res[0].state;   
    mydata.country= res[0].country;

    showData(mydata);  
}

function showData(mydata){
    // disp the data
    Err.innerHTML="";   
    temp.innerHTML= `${mydata.temp} <sup>o</sup> C`;
    if(mydata.state===undefined){
        city.innerHTML= `${mydata.city}, ${mydata.country}`;
    }
    else{
        city.innerHTML= `${mydata.city}, ${mydata.state}, ${mydata.country}`;
    } 
    humidity.innerHTML= `${mydata.humidity} %`;
    wind.innerHTML= `${mydata.wind.toFixed(2)} km/h`;
    mainDesc.innerHTML= mydata.main;
    document.querySelector(".humidity h3").innerHTML='Humidity';
    document.querySelector(".wind-speed h3").innerHTML='Wind Speed';
}
