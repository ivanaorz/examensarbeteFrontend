import jwtService from "@/service/jwtService";
import axios, { type InternalAxiosRequestConfig } from "axios";

const tokenAxios = axios.create();

tokenAxios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = jwtService.getAuthToken();
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  } else {
    console.log("No token found. Redirecting to login.");
    
     window.location.href = "/login";
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

tokenAxios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.status === 403) {
    console.log("Token has expired or is invalid. Redirecting to login.");
    jwtService.clearJwt();
   
     window.location.href = "/login";
  }
  return Promise.reject(error);
});

export default tokenAxios;
