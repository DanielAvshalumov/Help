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

    createJourney(activityId, reach) {
        return axios.post(base+"journey/"+`${activityId}`, reach, {headers:{'Content-Type':'application/json'}});
    }

    updateJourney(body, reach) {
        return axios.put(base+`journey/${body.id}?reach=${reach}`, body, {headers:{'Content-Type':'application/json'}});
    }

}

export default new MentalService();