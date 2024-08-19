import axios from "axios"

const axiosInstance = axios.create({
    baseURL: process.env.RAPIDAPI_GT_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "x-rapidapi-key": `${process.env.RAPIDAPI_KEY}`,
        "x-rapidapi-host": `${new URL(process.env.RAPIDAPI_GT_BASE_URL as string).host}`
    }
})

export default axiosInstance