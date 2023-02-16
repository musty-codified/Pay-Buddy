import axios from 'axios';

const endPoint = axios.create({
    baseURL: 'http://localhost:8082/',
});

const token = localStorage.getItem("token");
endPoint.interceptors.request.use(config => {
    if (token) {
        config.headers.Authorization = `${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
});

export default endPoint;