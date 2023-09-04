import axios from 'axios';

const client = axios.create({

    API_URL: "http://127.0.0.1:8000/getusers"
});

export default client;