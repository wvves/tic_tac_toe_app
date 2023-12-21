import { API } from "./instance";

const baseUrlApi: BaseUrl = import.meta.env.VITE_BACKEND_API_URL;

export const api = new API(baseUrlApi, {
  headers:{
    'Content-Type': 'application/json'
  }
})

