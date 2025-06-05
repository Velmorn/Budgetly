import axios from "axios";
import {getAuthHeaders} from "./AuthHeaders.js";

const BASE_URL = 'http://localhost:8080/api/bills';

export default class BillService {
    static async getAll() {
        try {
            const response = await axios.get(BASE_URL, getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error("Error fetching bills:", error);
            throw error;
        }
    }

    static async getById(id) {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`, getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error("Error fetching bill by ID:", error);
            throw error;
        }
    }

    static async createBill(billData) {
        try {
            const response = await axios.post(BASE_URL, billData, getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error("Error creating bill:", error);
            throw error;
        }
    }

    static async updateBill(billId, updatedBillDto) {
        try {
            const response = await axios.patch(`${BASE_URL}/${billId}`, updatedBillDto, getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error("Error updating bill:", error);
            throw error;
        }
    }

    static async transfer(transferDto) {
        try {
            await axios.post(`${BASE_URL}/transfer`, transferDto, getAuthHeaders());
        } catch (error) {
            console.error("Error transferring funds:", error);
            throw error;
        }
    }

    static async deleteBill(billId) {
        try {
            await axios.delete(`${BASE_URL}/${billId}`, getAuthHeaders());
        } catch (error) {
            console.error("Error deleting bill:", error);
            throw error;
        }
    }

    static async getCurrencies() {
        try {
            const response = await axios.get(`${BASE_URL}/currencies`, getAuthHeaders());
            return response.data;
        } catch (error) {
            console.error("Error fetching currencies:", error);
            throw error;
        }
    }
}