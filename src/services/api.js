import axios from "axios";

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

function createConfig(token) {
  return { headers: { Authorization: `Bearer ${token}` } };
}

function getConfig() {
  const token = JSON.parse(sessionStorage.getItem("access"));
  const config = createConfig(token);
  return config;
}

const apiRef = axios.create({
  baseURL: URL,
});

async function signIn(body) {
  try {
    const response = await apiRef.post(`/api/v2/login`, body);
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    throw error;
  }
}

const api = {
  signIn,
};

export default api;
