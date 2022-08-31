import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherApp = () => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [input, setInput] = useState("");

    let componentMounted = true;

    useEffect(() => {
        searchWeather();
    }, [search]);
    

    async function searchWeather () {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=8a810263582a03ce20027664c49519cb`);
    
        if (componentMounted) {
            console.log(response);
            setData(response);
        }
        return () => {componentMounted = false;}
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearch(input);
        setInput("");
    }


    let temp = (data.data?.main.temp - 273.15).toFixed(2);
    let tempMin = (data.data?.main.temp_min - 273.15).toFixed(2);
    let tempMax = (data.data?.main.temp_max - 273.15).toFixed(2);
    let weatherCondition = data.data?.weather[0].main;

    let currentDate = new Date();
    let day = currentDate.toLocaleString('default', { weekday: 'long'})
    let date = currentDate.getDate();
    let year = currentDate.getFullYear();
    let month = currentDate.toLocaleString('default', {month: 'long'});
    let hour = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();


  return (
    <>
        <div className='flex justify-center items-center h-screen'>
            <div className={`bg-[url(https://source.unsplash.com/600x900/?${weatherCondition})] p-8 rounded-md bg-opacity-50`}>
                <div className='text-center'>
                    <form onSubmit={handleSubmit}>
                        <input className='border-2 rounded-md border-slate-700 p-3' value={input} onChange={e => setInput(e.target.value)} placeholder='Search City'></input>
                        <button type='submit' className='bg-slate-800 ml-2 text-white p-3 rounded'><i class="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                </div>

                <div className='p-6 text-center text-white bg-opacity-50 bg-slate-600 mt-4'>
                    <div className='mb-6 flex flex-col justify-evenly'>
                        <h2 className='text-5xl font-bold mb-2'>{data.data?.name}</h2>
                        <p className='font-semibold text-2xl my-3'>{day}, {month} {date}, {year}</p>
                        <p className='text-lg'>{hour} : { minutes } : { seconds }</p>
                    </div>
                    <hr/>
                    { data && data (
                        <div className='mt-4'>
                        <i class="fa-solid fa-cloud fa-4x"></i>
                        <h3 className='text-3xl font-bold'>{temp}&deg;C</h3>
                        <h5 className='text-xl my-3 font-semibold'>{weatherCondition}</h5>
                        <p className='text-lg font-medium'>{tempMin}&deg;C | {tempMax}&deg;C</p>
                    </div>
                    )}
                    
                </div>

            </div>
            
        </div>
    </>
  )
}

export default WeatherApp;