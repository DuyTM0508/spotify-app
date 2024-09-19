import axios from "axios";
import { getDataFromLocalStorage } from "../helpers";
import { localKeys } from "../constants/localKeys";

class httpService {
  constructor() {
    this.axios = axios.create();

    this.axios.interceptors.request.use((config) => {
      const token = getDataFromLocalStorage(localKeys.TOKEN);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.axios.interceptors.response.use(
        (response) => {
            
        }
    )
  }
}
