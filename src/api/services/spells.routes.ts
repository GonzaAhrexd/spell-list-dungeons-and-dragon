import axios from '../axios.settings'

export const getSpells = () => {
    return axios.get('/spells');
}

export const addNewSpell = (spellData: any) => {
    return axios.post('/spells', spellData);
}

export const getSpellsByUser = (username: string) => {
    return axios.get(`/spells/${username}`);
}

export const deleteSpell = (id: string, password: string) => {
    return axios.delete(`/spells/${id}/${password}`);
}
export const editSpell = (spellData: any) => {
    return axios.put(`/spells/`, spellData);
}