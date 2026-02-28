import axios from '../axios.settings'

export const getSpells = () => {
    return axios.get('/spells');
}

export const addNewSpell = (spellData: any) => {
    return axios.post('/spells', spellData);
}

export const getSpellsByUser = async (username: string) => {
    const response = await axios.get(`/spells/${username}`);
    return response.data;
}

export const deleteSpell = (id: string, password: string) => {
    return axios.delete(`/spells/${id}/${password}`);
}
export const editSpell = (spellData: any) => {
    return axios.put(`/spells/`, spellData);
}

export const getRunesByUser = async (username: string) => {
    const response = await axios.get(`/spells/runes/${username}`);
    return response.data;
}