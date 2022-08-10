import axios from 'axios';

export default axios.create({
    baseURL: import.meta.env.PROD ? '/api' : 'http://127.0.0.1:8080/api',
    withCredentials: true,
});
