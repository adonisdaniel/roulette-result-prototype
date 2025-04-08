import type { Filter } from "../../../../interfaces/filter.interfaces";
import type { RoundDto } from "./rounds.interfaces";

export abstract class RoundsRepository {
  abstract getProviderRounds(filter: Filter): Promise<boolean>
  abstract getRounds(filter: Filter): Promise<boolean>
  abstract startRound(round: RoundDto): Promise<boolean>
  abstract closeRound(round: RoundDto): Promise<boolean>
}