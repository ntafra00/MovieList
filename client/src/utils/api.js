import axios from "axios"

axios.defaults.withCredentials = true;

const API = axios.create({
    baseURL: "http://" + window.location.hostname + ":5000",
})

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            window.location.href = window.location.protocol + "//" + window.location.hostname + ":3000/login"
        }
    })

export default API;