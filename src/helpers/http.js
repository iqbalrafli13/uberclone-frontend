import axios from "axios"

const http = ()=>{
    let option = {
        baseURL:'http://uberclone-backend.test',
        headers:{}
    }

    if(localStorage.getItem('token')){
        option.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    return axios.create(option)
}

export default http