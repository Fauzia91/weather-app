//two variables to attach to two elements, button variable with even listener 
//click even listener will return city

var buttonEl = document.querySelector("#searchBtn")
var inputEl = document.querySelector("#inputSearch")
var apiKey = "0c99b416b34685d632710484332adc13";
var cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || []
var historyEl = document.querySelector("#history")

function renderHistory() {
    historyEl.innerHTML = '';
    let cityHistory = JSON.parse(localStorage.getItem("cityHistory"));

    if (!cityHistory) {
        cityHistory = []
    }
    console.log("cityHistory:", cityHistory)
   

    cityHistory.map(city =>{

        var createButton = document.createElement('button')
        createButton.innerText= city;
        createButton.addEventListener("click", function(e){
            //New york County
            currentWeather(e.target.textContent) //i am passing a city

        })
        

        historyEl.appendChild(createButton);
    })
    //console.log(cityHistory)
    // for(let i= 0; i < cityHistory.length ; i++){
    //     console.log(cityHistory[i])
    // }
}
//http://api.openweathermap.org/geo/1.0/direct?q=new+york&appid=0c99b416b34685d632710484332adc13
//?key=value&key=value
renderHistory()
function currentWeather(searchHistoryValue) {
     city = inputEl.value; 
     if (typeof searchHistoryValue ===
        'string') {
            city = searchHistoryValue;
        } 
    

console.log ("q:",city)
query = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;



// let cityList = [];
// cityList.push(city)
// localStorage.setItem("cityList", cityList);
// cityList= localstorage.getItem("cityList");







fetch(query)
.then((response) => response.json()) //convert str to json
.then((data) => {
    let lat = data[0].lat;
    let lon = data[0].lon;
    var searchedCity = data[0].name
    cityHistory.push(searchedCity)
    localStorage.setItem("cityHistory", JSON.stringify(cityHistory))
    
    
    renderHistory();
    
    
    
    console.log( data)
    //fetch current weather
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    .then((response) => response.json()) //convert str to json
    .then((data) => {
        //console.log("current weather:", data)
        /*weather conditions, the temperature, the humidity, and the the wind speed*/
        //console.log(data.main.temp,data.main.humidity, data.wind.speed, data.weather[0].icon)
        let weatherContainer = document.querySelector("#weatherContainer");
        weatherContainer.textContent = "";

        let tempEl = document.createElement("p");
        tempEl.textContent = data.main.temp + "°F";


        let humidityEl = document.createElement("p");
        humidityEl.textContent = "humidity:" + data.main.humidity;

        let windEl = document.createElement("p");
        windEl.textContent = "wind speed:"+ data.wind.speed;

        let imgEl = document.createElement("img");
        imgEl.setAttribute("src", `https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${data.weather[0].icon}.png
        `)

        
        weatherContainer.appendChild(tempEl);
        weatherContainer.appendChild(imgEl);
        weatherContainer.appendChild(humidityEl);
        weatherContainer.appendChild(windEl);



        //five day forcast
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
        ).then(response => response.json())
        .then(data => {
                console.log("fiveday:",data.list[0])
                let fiveDayEl = document.querySelector("#fiveDayContainer");

                for(let i= 0; i < 5 ; i++){
                    console.log( data.list[(i * 8)] );//0,8,16,24,32
                    let day = data.list[(i * 8)];

                    let dateEl = document.createElement("p");
                    dateEl.textContent = day.dt_txt;

                    let tempEl = document.createElement("p");
                    tempEl.textContent = day.main.temp + "°F";
            
            
                    let humidityEl = document.createElement("p");
                    humidityEl.textContent = "humidity:" + day.main.humidity;
            
                    let windEl = document.createElement("p");
                    windEl.textContent = "wind speed:"+ day.wind.speed;
            
                    let imgEl = document.createElement("img");
                    imgEl.setAttribute("src", `https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${day.weather[0].icon}.png
                    `)

                    let divEl = document.createElement("div");

                    divEl.appendChild(dateEl);
                    divEl.appendChild(tempEl);
                    divEl.appendChild(imgEl);
                    divEl.appendChild(humidityEl);
                    divEl.appendChild(windEl);

                    fiveDayEl.appendChild(divEl)
                }

                








        })








    })











});



}

buttonEl.addEventListener ("click",currentWeather)