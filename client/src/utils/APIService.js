import HTTPMethodsHandler from './HTTPMethodsHandler'

class APIService extends HTTPMethodsHandler {
  static async checkAuth(email, token) {
    return await this.getWithAuthToken(
      `/check/auth/${email}`,
      `Bearer ${token}`
    )
  }

  static async registration(email, password) {
    return await this.post('registration', { email, password })
  }

  static async login(email, password) {
    return await this.post('login', { email, password })
  }

  static async addNewEntity({ entity, email, data, token }) {
    return await this.postWithAuthToken(
      `entities/${entity}`,
      { email, data },
      `Bearer ${token}`
    )
  }
}

export default APIService
