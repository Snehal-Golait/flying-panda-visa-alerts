import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // backend URL
});

export const getAlerts = (params) => API.get("/alerts", { params });
export const createAlert = (data) => API.post("/alerts", data);
export const updateAlert = (id, data) => API.put(`/alerts/${id}`, data);
export const deleteAlert = (id) => API.delete(`/alerts/${id}`);
