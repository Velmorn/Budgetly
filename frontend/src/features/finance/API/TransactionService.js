import axios from "axios";
import {getAuthHeaders} from "./AuthHeaders.js";

const BASE_URL = 'http://localhost:8080/api/transactions';

export default class TransactionService {
    static async getAll() {
        const response = await axios.get(`${BASE_URL}`, getAuthHeaders());
        return response.data;
    }

    static async getById(id) {
        const response = await axios.get(`${BASE_URL}/${id}`, getAuthHeaders());
        return response.data;
    }

    static async getByBillId(billId) {
        const response = await axios.get(`${BASE_URL}/bill/${billId}/transactions`, getAuthHeaders());
        return response.data;
    }

    static async getByBudgetPeriodId(budgetPeriodId) {
        const response = await axios.get(`${BASE_URL}/budget/${budgetPeriodId}/transactions`, getAuthHeaders());
        return response.data;
    }

    static async getByGoalId(goalId) {
        const response = await axios.get(`${BASE_URL}/goal/${goalId}/transactions`, getAuthHeaders());
        return response.data;
    }

    static async createTransaction(transactionData) {
        const response = await axios.post(`${BASE_URL}`, transactionData, getAuthHeaders());
        return response.data;
    }

    static async updateTransaction(id, transactionData) {
        const response = await axios.put(`${BASE_URL}/${id}`, transactionData, getAuthHeaders());
        return response.data;
    }

    static async deleteTransaction(id) {
        await axios.delete(`${BASE_URL}/${id}`, getAuthHeaders());
    }
}