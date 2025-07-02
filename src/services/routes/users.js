import { apiRef, getConfig } from "../api";

const users = {
  signIn,
};
async function signIn(body) {
  try {
    const response = await apiRef.post(`/user/login`, body);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

export default users;
