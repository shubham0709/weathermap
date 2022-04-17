function findWeather() {
    let city = document.querySelector("#city").value;
    if (city == '') {
        alert("enter a city name");
        return;
    }
    let forecast_div = document.querySelector("#forecast_div");
    forecast_div.style.display = "none";
    forecast_div.innerHTML = null;

    let showMap = document.querySelector("#gmap_canvas");
    showMap.src = `https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`

    let url1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5b17fc7c9fc3ba0e31ef0289e3525c01`
    fetch(url1).then(res => {
        return res.json();
    }).then(res => {
        displayData(res);
    }).catch(err => {
        console.log("this is my error : " + err);
    })

    function displayData(res) {
        min_temp = document.querySelector("#min_temp");
        max_temp = document.querySelector("#max_temp");
        wind = document.querySelector("#wind");
        weather = document.querySelector("#weather");
        sunrise = document.querySelector("#sunrise");
        sunset = document.querySelector("#sunset");
        weather_icon = document.querySelector("#weather_icon");
        city_name = document.querySelector("#city_name");
        sunrise_h3 = document.querySelector("#sunrise");
        sunset_h3 = document.querySelector("#sunset");

        min_temp.innerText = "Min-Temp : " + res.main.temp_min + " K";
        max_temp.innerText = "Max-Temp : " + res.main.temp_max + " K";
        wind.innerText = "Wind-speed : " + res.wind.speed + " Mph";
        weather.innerText = "Weather : " + res.weather[0].description;
        city_name.innerText = res.name;
        let icon = res.weather[0].icon
        weather_icon.src = `http://openweathermap.org/img/w/${icon}.png`
        sunrise = res.sys.sunrise;
        sunset = res.sys.sunset;

        let sunrise_date = new Date(sunrise * 1000);
        let sunset_date = new Date(sunset * 1000)
        sunrise_h3.innerText = "sun-rise : " + sunrise_date.toString().slice(0, 21);
        sunset_h3.innerText = "sun-set : " + sunset_date.toString().slice(0, 21);


        //api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}

    }
}

function forecast() {
    let city = document.querySelector("#city").value;
    if (city == '') {
        alert("enter a city name");
        return;
    }
    //let url2 = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=e4f4e925675a7ca136567e7bfa49a01c`
    let url1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5b17fc7c9fc3ba0e31ef0289e3525c01`
    fetch(url1).then(res => {
        return res.json();
    }).then(res => {
        forecastData(res.coord.lat, res.coord.lon);
    }).catch(err => {
        console.log("this is my error : " + err);
    })
        // < div class="forecast_elements" >
        //     <h2>MON</h2>
        //     <img src="http://openweathermap.org/img/w/03d.png" alt="">
        //     <h2>30 C</h2>
        //     <h3>20 C</h3>
        // </div>

    function forecastData(lat, lon) {
        let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&&appid=e4f4e925675a7ca136567e7bfa49a01c`
        fetch(url2).then(res => {
            return res.json();
        }).then(res => {
            showForecast(res);
        }).catch(err => {
            console.log("Fore cast err : " + err);
        });
    }
    function showForecast(res) {
        let arr = res.daily;
        console.log(arr);
        let forecast_div = document.querySelector("#forecast_div");
        forecast_div.innerHTML=null;
        arr.map((elem, index) => {
            forecast_div.style.display = "flex";
            
            let date = new Date(elem.dt*1000);
            let dayOfweek = date.toString().slice(0,4);

            let card = document.createElement("div");
            card.setAttribute("class","forecast_elements");
            forecast_div.append(card);

            let day = document.createElement('h2');
            day.innerText = dayOfweek;
            card.append(day);

            let image = document.createElement("img");
            image.src = `http://openweathermap.org/img/w/${elem.weather[0].icon}.png`
            card.append(image);

            let min_temp = document.createElement("h2");
            let temp = (elem.temp.min - 273).toFixed(2);
            min_temp.innerText = temp + " °C"
            card.append(min_temp);

            let max_temp = document.createElement("h2");
            temp = (elem.temp.max - 273).toFixed(2);
            max_temp.innerText = temp + " °C"
            card.append(max_temp);
            
        })
    }
}