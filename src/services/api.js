import Axios from 'axios';


const api = Axios.create({
    baseURL: 'https://economia.awesomeapi.com.br/json'
})

export default api;