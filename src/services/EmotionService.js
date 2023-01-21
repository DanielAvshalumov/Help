import axios from "axios";

const base = "http://localhost:8080/api/emotions/"

class EmotionService {

    createEmotion(userId, emotion) {
        return axios.post(base+`${userId}`, emotion, {headers:{'Content-Type': 'application/json'}});
    }

}

export default new EmotionService();