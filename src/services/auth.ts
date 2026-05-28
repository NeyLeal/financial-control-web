import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5090",
});

export async function login(email: string, password: string) {
  const response = await api.post("/Auth/login", {
    email,
    password,
  });

  return response.data;
}

export default api;