import axios from "axios";

export default async function deleteCard(_id) {
    console.log(`http://localhost:3001/card/delete/${_id}`)
    return axios.delete(
        `http://localhost:3001/card/delete/${_id}`,
    )
                .then((response) => {
                    console.log(response)
                    return response.data;
                })
}