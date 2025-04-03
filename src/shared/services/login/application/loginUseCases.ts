import ROULETTE_API from "../../../../api/roulette.api";
import type { LoginRepository } from "../domain/login.repository";

class LoginUseCases implements LoginRepository {
  async login(userName: string, password: string): Promise<boolean> {

    try {

      const { status } = await ROULETTE_API.post('/auth/login', {
        userName,
        password
      });

      if (status > 201) throw new Error('Login failed')

      return true
    } catch (error) {
      console.log('ERROR LOGIN', error);
      return false
    }

  }
  logout(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  isLoggedIn(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

}

export default new LoginUseCases();