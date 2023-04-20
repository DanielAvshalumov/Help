import axios from "axios"

const base = "http://localhost:8080/api/mental/";

class MentalService {

    createActivity(id, body) {
        return axios.post(base+"activity/"+`${id}`, body, {headers:{'Content-Type':'application/json'}});
    }

    getAllActivity(id) {
        return axios.get(base+"activity/"+`${id}`, {headers:{'Content-Type':'application/json'}});
    }

    deleteActivity(activityId) {
        return axios.delete(base+"activity/"+`${activityId}`, {headers:{'Content-Type':'application/json'}});
    }

}

export default new MentalService();