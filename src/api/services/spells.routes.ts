import axios from '../axios.settings'

export const getSpells = () => {
    return axios.get('/spells');
}

