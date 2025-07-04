import { apiAuthRef, apiRef } from "../api";

const users = {
  signIn,
  getUser,
};
async function signIn(body) {
  try {
    const response = await apiAuthRef.post(`/user/login`, body);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

async function getUser() {
  try {
    const response = await apiRef.get(`/user/profile`);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

export default users;
