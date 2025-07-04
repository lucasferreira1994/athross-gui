import axios from "axios";
import users from "./routes/users";
import docs from "./routes/docs";

const getBaseUrl = () => {
  const devUrl = import.meta.env.VITE_API_URL;
  const devMode = import.meta.env.MODE;

  if (devUrl && devMode == "development") {
    let baseUrl = import.meta.env.VITE_API_URL;
    return baseUrl;
  } else {
    const { protocol, hostname, port } = window.location;
    let baseUrl = `${protocol}//${hostname}`;
    if (port) {
      baseUrl += `:${port}`;
    }
    return baseUrl;
  }
};

const URL = getBaseUrl();

export const apiRef = axios.create({
  baseURL: URL,
  withCredentials: true,
});

export const apiAuthRef = axios.create({
  baseURL: URL,
});

const api = {
  users,
  docs,
};

export default api;
