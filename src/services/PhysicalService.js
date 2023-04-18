import axios from "axios";

const base = "http://localhost:8080/api/physical/"

class PhysicalService {

    createPhysical(id, body) {
        return axios.post(base+`${id}`, body, {headers:{'Content-Type':'application/json'}});
    }

    getPhysical(id) {
        return axios.get(base+`${id}`, {headers:{'Content-Type':'application/json'}});
    }

    getUserPhysical(id) {
        return axios.get(base+`${id}`+"/user", {headers:{'Content-Type':'application/json'}});
    }

    updatePhysical(id,mealId) {
        return axios.put(base+`${id}?mealId=${mealId}`, {headers:{'Content-Type':'application/json'}});
    }

    saveMeal(id,body) {
        return axios.post(base+`meal/${id}`, body, {headers:{'Content-Type':'application/json'}});
    }

    getMeals(id) {
        return axios.get(base+`${id}/meals`, {headers:{'Content-Type':'application/json'}});
    }

    removeMeal(id) {
        return axios.delete(base+`meal/${id}`, {headers:{'Content-Type':'application/json'}});
    }
}

export default new PhysicalService();