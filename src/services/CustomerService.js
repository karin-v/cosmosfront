import axios from "axios";

const API_URL = "http://localhost:8080/api/v1.0";

export default {

    sendRegisterCustomerRequest(customerDto) {
        return axios.post(API_URL + "/register", customerDto);
    },

    sendLoginRequest(firstName, lastName) {
        return axios.post(API_URL + "/login", {
            firstName: firstName,
            lastName: lastName
        });
    }
}