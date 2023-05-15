import axios from 'axios';

export default async function editCard(_id, text, column){
    const body = {
        text,
        column: column
    }
    console.log(body)
    console.log(`http://localhost:3001/card/edit/${_id}`)
    return axios.put(
        `http://localhost:3001/card/edit/${_id}`,
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