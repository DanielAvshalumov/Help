import axios from "axios";

const base = "http://localhost:8080/api/emotions/";

class EmotionService {

    createEmotion(userId, body) {
        return axios.post(base+`${userId}`, body, {headers:{'Content-Type': 'application/json'}});
    }

    getAllEmotions(pathId) {
        return axios.get(base+`${pathId}`, {headers:{'Content-Type' : 'application/json'}});
    }
}

export default new EmotionService();