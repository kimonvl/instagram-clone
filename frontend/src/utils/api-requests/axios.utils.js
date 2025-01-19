import axios from "axios";

export const sendAxiosPost = async (endpoint, data) => {
    return await axios.post(`http://localhost:8000/api/v1/${endpoint}`, data, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
}