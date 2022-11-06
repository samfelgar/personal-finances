import { api } from './api';

export const authenticate = async (email, password) => {
  try {
    const response = await api.post('/login', {
      email,
      password,
    });

    const accessToken = response.data.access_token;
    localStorage.setItem('access_token', accessToken);

    return true;
  } catch (error) {
    return false;
  }
};

export const logout = async () => {
  try {
    await api.get('/logout');
    return true;
  } catch (error) {
    return false;
  } finally {
    clearStoredAccessToken();
  }
};

export const getStoredAccessToken = () => {
  return localStorage.getItem('access_token');
}

export const clearStoredAccessToken = () => {
  localStorage.removeItem('access_token');
};

export const isAuthenticated = () => {
  return localStorage.getItem('access_token') !== null
};