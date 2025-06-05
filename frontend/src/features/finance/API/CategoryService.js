import axios from "axios";
import {getAuthHeaders} from "./AuthHeaders.js";

const BASE_URL = 'http://localhost:8080/api/categories';

export default class CategoryService {
    static async getAll() {
        const response = await axios.get(BASE_URL, getAuthHeaders());
        return response.data;
    }

    static async getById(id) {
        const response = await axios.get(`${BASE_URL}/${id}`, getAuthHeaders());
        return response.data;
    }

    static async create(categoryData) {
        try {
            const response = await axios.post(BASE_URL, categoryData, getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error("Error creating category:", error);
            throw error;
        }
    }

    static async update(id, categoryData) {
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, categoryData, getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error("Error updating category:", error);
            throw error;
        }
    }

    static async delete(id) {
        try {
            await axios.delete(`${BASE_URL}/${id}`, getAuthHeaders());
        } catch (error) {
            console.error("Error deleting category:", error);
            throw error;
        }
    }
}
