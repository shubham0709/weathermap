function findWeather() {
    let city = document.querySelector("#city").value;
    if (city == '') {
        alert("enter a city name");
        return;
    }
    let showMap = document.querySelector("#gmap_canvas");
    showMap.src = `https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5b17fc7c9fc3ba0e31ef0289e3525c01`
    fetch(url).then(res => {
        return res.json();
    }).then(res => {
        console.log(res);
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
        sunrise_h3= document.querySelector("#sunrise");
        sunset_h3= document.querySelector("#sunset");

        min_temp.innerText = "Min-Temp : " + res.main.temp_min+" K";
        max_temp.innerText = "Max-Temp : " + res.main.temp_max+ " K";
        wind.innerText = "Wind-speed : " + res.wind.speed + " Mph";
        weather.innerText = "Weather : " + res.weather[0].description;
        city_name.innerText = res.name;
        let icon = res.weather[0].icon
        weather_icon.src = `http://openweathermap.org/img/w/${icon}.png`
        sunrise = res.sys.sunrise;
        sunset = res.sys.sunset;

        let sunrise_date = new Date(sunrise * 1000);
        let sunset_date = new Date(sunset * 1000)
        sunrise_h3.innerText = "sun-rise : "+sunrise_date.toString().slice(0,21);
        sunset_h3.innerText = "sun-set : "+sunset_date.toString().slice(0,21);

        console.log("lets see this",sunrise_date.getHours());
    }
}