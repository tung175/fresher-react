import axios from './axios';

const fetchAllUser = (page) => {
    return axios.get(`/api/users?page=${page}`)
}

const postCreateUser = (name, job) => {
    return axios.post("/api/users", {name, job})
}

const putUpdateUser = ( name, job) => {
    return axios.put(`/api/users/`, {name, job})
}

const deleteAUser = (id) => {
    return axios.delete(`/api/users/${id}`)
}

const postLogin = (email, password) => {
    return axios.post("/api/login/", {email, password})
}
export {fetchAllUser, postCreateUser, putUpdateUser, deleteAUser, postLogin}