import ROULETTE_API from "../../../../../api/roulette.api";
import { rounds, roundsFisics } from "../../../../store/rounds.svelte";
import type { Filter } from "../../../../interfaces/filter.interfaces";
import type { Round, RoundDto, RoundRouletteFisic } from "../domain/rounds.interfaces";
import type { RoundsRepository } from "../domain/rounds.repository";
import LogsUseCases from "../../../logs/application/LogsUseCases";

class RoundUseCases implements RoundsRepository {
  async getProviderRounds(filter: Filter): Promise<boolean> {

    try {

      const { data } = await ROULETTE_API.get<{ results: RoundRouletteFisic[] }>('/reports/provider-logs', {
        params: { ...filter }
      })

      roundsFisics.set(data.results)
      return true
    } catch (error) {
      console.log('ERROR GETTING PROVIDER ROUNDS', error);
      roundsFisics.set([])
      return false;
    }

  }

  async getRounds(filter: Filter): Promise<boolean> {
    try {

      const { data } = await ROULETTE_API.get<{ rounds: Round[], msg: string, ok: boolean }>('round', {
        params: {
          ...filter,
        },
      });

      if (!data.ok) throw new Error('ERROR GETTING ROUNDS');

      rounds.set(data.rounds);
      return true
    } catch (error) {
      console.log('ERROR GETTING ROUNDS', error);
      rounds.set([]);
      return false;
    }
  }

  async startRound({ ID_Ronda, ID_Ruleta }: RoundDto): Promise<boolean> {
    try {
      await ROULETTE_API.put('round/start', {
        ID_Ronda,
        ID_Ruleta,
        Fecha: new Date().toString(),
        Giro: '0',
        Rpm: '22',
        Error: '0',
        Resultado: '99',
      });

      return true
    } catch (error) {
      console.log('ERROR START ROUND', error);
      const log = {
        request: {
          ID_Ronda,
        },
        response: error,
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false,
        ip: '1.1.1.1',
        type: 'round',
        created_at: new Date().toISOString(),
      };

      LogsUseCases.createLog(log);
      return false
    }
  }
}

export default new RoundUseCases();