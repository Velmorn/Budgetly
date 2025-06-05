import axios from "axios";
import {getAuthHeaders} from "./AuthHeaders.js";

const BASE_URL = 'http://localhost:8080/api/budgets';

export default class BudgetService {
    static async getAll() {
        const response = await axios.get(`${BASE_URL}`, getAuthHeaders());
        return response.data;
    }

    static async getById(id) {
        const response = await axios.get(`${BASE_URL}/${id}`, getAuthHeaders());
        return response.data;
    }

    static async createBudget(budgetData) {
        const response = await axios.post(`${BASE_URL}`, budgetData, getAuthHeaders());
        return response.data;
    }

    static async updateBudget(id, budgetData) {
        const response = await axios.put(`${BASE_URL}/${id}`, budgetData, getAuthHeaders());
        return response.data;
    }

    static async deleteBudget(id) {
        await axios.delete(`${BASE_URL}/${id}`, getAuthHeaders());
    }

    static async getAllBudgetPeriods(budgetId) {
        const response = await axios.get(`${BASE_URL}/${budgetId}/periods`, getAuthHeaders());
        return response.data;
    }

    static async getPeriodById(periodId) {
        const response = await axios.get(`${BASE_URL}/periods/${periodId}`, getAuthHeaders());
        return response.data;
    }

    static async createPeriod(budgetId, periodData) {
        const response = await axios.post(`${BASE_URL}/${budgetId}/periods`, periodData, getAuthHeaders());
        return response.data;
    }

    static async deletePeriod(periodId) {
        await axios.delete(`${BASE_URL}/periods/${periodId}`, getAuthHeaders());
    }
}