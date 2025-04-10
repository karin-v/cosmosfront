import axios from "axios";

const API_URL = "http://localhost:8080/api/v1.0";

export default {

    sendBooking(reservationDto) {
        return axios.post(`${API_URL}/booking`, reservationDto);
    },

    getBookingsByCustomerId(customerId) {
        return axios.get(`${API_URL}/bookings/${customerId}`);
    }
};