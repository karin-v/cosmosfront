import axios from "axios";

const API_URL = "http://localhost:8080/api/v1.0/routes";

export default {

    sendGetRoutesRequest() {
        return axios.get(API_URL);
    }
}