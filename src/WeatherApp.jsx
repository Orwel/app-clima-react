import './WeatherApp.css'
import { useState } from 'react'
import { API_KEY } from './config.js'; // Asegúrate de que la ruta sea correcta
export const WeatherApp = () => {

    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    API_KEY 
    const difKelvin = 275.15

    const fetchWheaterData = async () => {
        try {
            const response = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
            const data = await response.json()
            setWeatherData(data)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }


    const handleCityChange = (e) => {
        setCity(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchWheaterData()
        console.log(city)
    }

    return (
        <div className="container">
            <h1>Aplicación clima</h1>
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder="Ingresa una ciudad"
                value={city}
                onChange={handleCityChange}
                >

                </input>
                <button 
                type="submit"
                >
                    Buscar</button>
                    </form>

{weatherData && (
    <div className="weather-data">
        <h2>{weatherData.name}, {weatherData.sys.country} {weatherData.coord.lat}</h2>
        <p>La temperatura actual es: {Math.floor(weatherData.main.temp - difKelvin)} ºC {weatherData.sys.id} </p>
        <p>Temperatura actual: {(weatherData.main.temp - difKelvin).toFixed(2)}°C</p>
        <p>La condición metereológica actual: {weatherData.weather[0].description}</p>
        <img 
        src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} 
        alt="weather icon"/>
    </div>
)}
</div>
);
}
