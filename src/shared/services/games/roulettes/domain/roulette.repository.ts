import type { Roulette } from "./interfaces";

export abstract class RouletteRepository {
  abstract getRoulettes(): Promise<boolean>;
  abstract getRouletteById(id: string): Promise<Roulette>;
  abstract getRoulettesFisic(): Promise<boolean>;
}