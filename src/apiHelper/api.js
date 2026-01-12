import axios from "axios";

const API = axios.create({
  baseURL: "https://alifakhacademy-backend.onrender.com/api", 
});

{//  baseURL: "https://alifakhacademy-backend.onrender.com/api", 
//  baseURL: "http://localhost:5000/api",}
  }

// Add token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
