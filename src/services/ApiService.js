import axios from 'axios';
import ApiConfig from '../configs/ApiConfig';

const ApiService = axios.create({
    baseURL: ApiConfig.baseURL,
});

export default ApiService;