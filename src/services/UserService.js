import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/users";

class UserService {

    getAllUsers() {
        return axios.get(USER_API_BASE_URL);
    }

    getUserByUserName(username) {
        return axios.get(USER_API_BASE_URL + "/" + username)
            .catch(error => {
                console.log("error:",error);
            })
    }

    saveUser(user) {
        return axios.post(USER_API_BASE_URL, user);
    }

}

export default new UserService();