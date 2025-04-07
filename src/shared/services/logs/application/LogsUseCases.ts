import ROULETTE_API from "../../../../api/roulette.api";
import type { LogDto } from "../domain/logs.interfaces";
import type { LogsRepository } from "../domain/logs.repository";

class LogsUseCases implements LogsRepository {
  async createLog(log: LogDto): Promise<boolean> {
    try {
      await ROULETTE_API.post('logs', log);

      this.saveInLocalStorage(log);
      return true
    } catch (error) {
      console.log('ERROR CREATING LOG', error);
      this.saveInLocalStorage(log);
      return false
    }
  }

  private saveInLocalStorage(log: LogDto) {
    const logs = JSON.parse(localStorage.getItem('logs') || '[]');

    logs.push({
      ...log,
    });

    localStorage.setItem('logs', JSON.stringify(logs));
  }
}

export default new LogsUseCases();