import axios from "./axios";

export const getLessons = async () => {
    const response = await axios.get("/collection/lessons");
    return response.data;
}


