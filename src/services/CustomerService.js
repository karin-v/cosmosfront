import axios from "axios";

const API_URL = "http://localhost:8080/api/v1.0/register";

export default {

    sendPostCustomerRequest(customerDto) {
        return axios.post(API_URL, customerDto);
    }
}