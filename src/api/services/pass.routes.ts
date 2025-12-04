import axios from '../axios.settings'

export const checkPass = (password: string) => {
    return axios.get(`/pass/${password}`);
}