import type { Roulette, RouletteFisic } from "../domain/interfaces";
import type { RouletteRepository } from "../domain/roulette.repository";
import ROULETTE_API from "../../../../../api/roulette.api";
import { roulettes } from "../../../../store/roulettes.svelte";
import { roulettesFisics } from "../../../../store/roulettes-fisics.svelte";

class RouletteUseCases implements RouletteRepository {
  async getRoulettes(): Promise<boolean> {
    try {
      const { status, data } = await ROULETTE_API.get<{ roulettes: Roulette[] }>('/roulettes');

      if (status > 201) throw new Error("Failed to fetch roulettes");

      roulettes.set(data.roulettes.filter(r => r.isManualRoulette && r.status && !r.manualDisable));
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

  async getRoulettesFisic(): Promise<boolean> {
    try {

      const { data } = await ROULETTE_API.get<{ rouletteFisics: RouletteFisic[] }>('roulettes/fisics/get')

      if (!data.rouletteFisics) throw new Error("Failed to fetch roulettes fisics");

      roulettesFisics.set(data.rouletteFisics)
      localStorage.setItem('roulettesFisics', JSON.stringify(data.rouletteFisics))
      return true
    } catch (error) {
      console.log('ERROR GETTING ROULETTES FISIC', error);
      roulettesFisics.set([])
      return false
    }
  }
}

export default new RouletteUseCases()