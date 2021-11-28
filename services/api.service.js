import axios from 'axios';

export default () => {
  /**
   * Crea la instancia @api de Axios
   */
  const api = axios.create({
    baseURL: `${process.env.API_BASE_URL}/api`,
    withCredentials: true,
  });

  return api;
};
