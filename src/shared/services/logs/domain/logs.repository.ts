import type { LogDto } from "./logs.interfaces";

export abstract class LogsRepository {
  abstract createLog(log: LogDto): Promise<boolean>
}