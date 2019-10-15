import Axios from 'axios';
const baseUrl = 'http://localhost:3001';

const getAll = () => {
    return Axios.get(`${baseUrl}/persons`)
}

const create = newObject => {
    return Axios.post(`${baseUrl}/persons`, newObject)
}

const update = (id, newObject) => {
    return Axios.put(`${baseUrl}/${id}`,newObject)
}

const deleteNote = (id) => {
    return Axios.delete(`${baseUrl}/${id}`)
}

export default {
    getAll,
    create,
    update,
    deleteNote
}