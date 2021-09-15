import api from '@/services/api.service'

/**
 * API Sanctum para obtener cookies
 * @returns Cookie
 */
function setCookie() {
  return api().get('/sanctum/csrf-cookie')
}

export default {
  async login() {
    return await setCookie()
    // AQUI PONER COMMITER DE $AUTH
  },
  async register(data) {
    await setCookie()
    return api().post('/register', data)
  },
}
