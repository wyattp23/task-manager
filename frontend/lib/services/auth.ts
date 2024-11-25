import apiClient from "../api-client";

export const AuthService = {
  login: async (email: string, password: string) => {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    const response = await apiClient.post("/auth/token", formData);
    return response.data;
  },

  register: async (email: string, password: string, name: string) => {
    const response = await apiClient.post("/auth/", {
      email,
      password,
      name,
    });
    return response.data;
  },

  verifyToken: async (token: string) => {
    const response = await apiClient.get("/auth/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
