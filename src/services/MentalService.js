import axios from "axios"

const base = "http://localhost:8080/api/mental/";

class MentalService {

    createActivity(id, body) {
        return axios.post(base+`${id}`, body, {headers:{'Content-Type':'application/json'}});
    }

}

export default new MentalService();