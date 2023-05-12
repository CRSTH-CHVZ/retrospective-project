import axios from 'axios';

export default async function getCols(){
    return axios({
        url: 'http://localhost:3001/columns',
        method: 'GET',
    })
        .then( (response) => {
            return response.data;
        })
}