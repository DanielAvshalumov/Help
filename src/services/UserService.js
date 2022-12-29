import axios from "axios";

const USER_API = "http://localhost:8080/api/auth/";

class UserService {
    
    authSignUp(payload) {
        return axios.post(USER_API + "signup", payload);
    }

    authSignIn(payload, staySigned) {
        return axios.post(USER_API + "signin", payload)
            .then((response) => {
                if(response.data.accessToken && staySigned) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            })
    }

}

export default new UserService();