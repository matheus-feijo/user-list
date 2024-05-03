import axios from "axios";
import { IUsuario } from "../interfaces/IUsuario";

const api = axios.create({
  baseURL: "http://localhost:3000/",
});

export const apiService = {
  getAllUsers: async () => {
    const { data }: { data: IUsuario[] } = await api.get("/usuarios");

    return data;
  },
};
