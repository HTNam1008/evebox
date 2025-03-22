import axios from 'axios';

export const fetchProvinces = async () => {
    try {
        const response = await axios.get('https://provinces.open-api.vn/api/p/');
        return response.data || [];
    } catch (error) {
        console.error("Error fetching provinces:", error);
        return [];
    }
};
