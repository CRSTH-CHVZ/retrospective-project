import axios from 'axios';

export default async function postCard(text, columnId){
    const body = {
        text,
        columnId,
    }
    return axios.post(
        'http://localhost:3001/card/new',
        body,
        {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then( (response) => {
            console.log(response)
            return response.data;
        })
}