import axios from "axios";
import {getAuthHeaders} from "./AuthHeaders.js";

const BASE_URL = 'http://localhost:8080/api/goals';

export default class GoalService {
    static async getAll() {
        const response = await axios.get(BASE_URL, getAuthHeaders());
        return response.data;
    }

    static async getById(id) {
        const response = await axios.get(`${BASE_URL}/${id}`, getAuthHeaders());
        return response.data;
    }

    static async createGoal(goalData) {
        const response = await axios.post(BASE_URL, goalData, getAuthHeaders());
        return response.data;
    }

    static async updateGoal(id, goalData) {
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, goalData, getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error("Error updating goal:", error);
            throw error;
        }
    }

    static async deleteGoal(id) {
        try {
            await axios.delete(`${BASE_URL}/${id}`, getAuthHeaders());
        } catch (error) {
            console.error("Error deleting goal:", error);
            throw error;
        }
    }
}
