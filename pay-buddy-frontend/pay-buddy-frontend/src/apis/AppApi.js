import axios from 'axios';

const endPoint = axios.create({
    baseURL: 'http://localhost:8082/',
});
//const token ="eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvbGFtaWM2OTVAZ21haWwuY29tIiwiZXhwIjoxNjc2MzE3OTk4LCJpYXQiOjE2NzYyMzE1OTh9.LRt2ADAuzmgCWVWWC3Hx2YoMnyqjLGV6zs6BK0a9e8I";
const token = localStorage.getItem("token");
endPoint.interceptors.request.use(config => {
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
});

export default endPoint;