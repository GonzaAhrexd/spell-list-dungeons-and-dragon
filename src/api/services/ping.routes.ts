import axios from '../axios.settings'

export const pingServer = () => {
    return axios.get('/ping');
}

