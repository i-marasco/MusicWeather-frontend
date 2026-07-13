import axios from "axios";

const API_URL = "http://127.0.0.1:8000/weather";


export function getWeatherHistory(startDate = null, endDate = null) {
  return axios.get(`${API_URL}/history`, {
    params: {
      start_date: startDate,
      end_date: endDate,
    },
  });
}


export function getWeatherDaily(startDate = null, endDate = null) {
  return axios.get(`${API_URL}/daily`, {
    params: {
      start_date: startDate,
      end_date: endDate,
    },
  });
}
