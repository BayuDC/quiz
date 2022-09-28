import axios from 'axios';

export default axios.create({
    baseURL: import.meta.env.PROD ? '/api' : 'http://localhost:8080/api',
    withCredentials: true,
});
