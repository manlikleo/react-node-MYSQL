import axios from 'axios';

const instance = axios.create({
    baseURL: "http//localhost:8080/api",
    headers: {
        "Content-type":"application/json"
    }
});

export default {

    getAll : () => instance({

        'method':'GET',
        'url' : '/tutorials',
        'params':{
            'search':'paramter'
        },
    })
    ,

    get : (id) => instance({

        'method':'GET',
        'url' : `/tutorials/${id}`,
        'params':{
            'search':'paramter'
        },
    }),

    create : () => instance({

        'method':'POST',
        'url' : '/tutorials',
        'data':{
            "title ":"tutorial.title",
            "description":"tutorial.description"
        },
    })



}

    // const get = id => {
    //     return Http.get()
    // };

    // const create = data => {
    //     return Http.post("tutorials",data)
    // }

    // const update = (id,data) => {
    //     return Http.put(`/tutorials/${id}`,data)
    // };

    // const remove = id => {
    //     return Http.delete(`/tutorials/${id}`)
    // };

    // const deleteAll = () => {
    //     return Http.delete(`/tutorials`);
    // }
    
    // const findByTitle = (title) => {
    //     return Http.get(`/tutorials/${title}`);
    // }



