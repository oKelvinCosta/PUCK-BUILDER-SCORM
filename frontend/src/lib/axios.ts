import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // withCredentials: true, // Cookies from frontend send to backend to manage authentication
});

// Before every requisition, delay
if (import.meta.env.VITE_ENABLE_API_DELAY === 'TRUE') {
  api.interceptors.response.use(async (config) => {
    await new Promise((resolve) => setTimeout(resolve, randomDelay()));
    return config;
  });
}
// between 800 and 2800
function randomDelay(): number {
  //   return Math.floor(Math.random() * 2000) + 800;
  return 1000;
}
