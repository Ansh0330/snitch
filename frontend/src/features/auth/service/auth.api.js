import axios from "axios";

const authApiInstance = axios.create({
  baseURL: "/api/auth",
  withCredentials: true,
});

export const register = async ({
  email,
  contact,
  password,
  fullname,
  isSeller,
}) => {
  try {
    const response = await authApiInstance.post("/register", {
      email,
      contact,
      password,
      fullname,
      isSeller,
    });
    return response.data;
  } catch (error) {
    console.log("Error in register api", error);
  }
};

export const getMe = async () => {
  try {
    const response = await authApiInstance.get("/me");
    return response.data;
  } catch (error) {
    console.log("Error in getMe api", error);
  }
}


export const login = async ({ email, password }) => {
  try {
    const response = await authApiInstance.post("/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log("Error in login api", error);
  }
};
