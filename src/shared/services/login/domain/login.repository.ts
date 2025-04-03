export abstract class LoginRepository {
  abstract login(username: string, password: string): Promise<boolean>;
  abstract logout(): Promise<void>;
  abstract isLoggedIn(): Promise<boolean>;
}