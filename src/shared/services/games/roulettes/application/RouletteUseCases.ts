import ROULETTE_API from "../../../../../api/roulette.api";
import { roulettes } from "../../../../store/roulettes.svelte";
import type { Roulette } from "../domain/interfaces";
import type { RouletteRepository } from "../domain/roulette.repository";

class RouletteUseCases implements RouletteRepository {
  async getRoulettes(): Promise<boolean> {
    try {
      const { status, data } = await ROULETTE_API.get<{ roulettes: Roulette[] }>('/roulettes');

      if (status > 201) throw new Error("Failed to fetch roulettes");

      roulettes.set(data.roulettes.filter(r => r.isManualRoulette));
      return true
    } catch (error) {
      console.error("Error fetching roulettes:", error);
      roulettes.set([]);
      return false
    }
  }

  getRouletteById(id: string): Promise<Roulette> {
    throw new Error("Method not implemented." + id);
  }
}

export default new RouletteUseCases()