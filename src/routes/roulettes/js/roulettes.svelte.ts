import { get, writable } from "svelte/store";
import { ROULETTE_SINGLE_ZERO_NUMBER, type RouletteNumber } from "../../../shared/contants/ROULETTES_NUMBER";
import { cleanCurrentRoulette, currentRoulette } from "../../../shared/store/roulettes.svelte";
import { goto } from "$app/navigation";
import { GamesTypes } from "../../../shared/contants/GAMES_TYPES";
import RoundUseCases from "../../../shared/services/games/rounds/application/RoundUseCases";
import { rounds, roundsFisics } from "../../../shared/store/rounds.svelte";
import type { Roulette } from "../../../shared/services/games/roulettes/domain/interfaces";

// VARS AND GETTERS

export const numbers = writable<RouletteNumber[]>([]);

export const numberSelected = writable<RouletteNumber | null>(null);

export const results = ROULETTE_SINGLE_ZERO_NUMBER;

export const betMessage = writable<string>("");
export const CURRENT_ROUND = writable<string | null>(null);
export const TIME_TO_BET = writable<number | null>(null);

export const addingResult = writable<boolean>(false);

// FUNCTIONS

export const handleOut = () => {
  cleanCurrentRoulette();
  goto('/dashboard', { replaceState: true });
};

export const handleCreationRound = async () => {
  const roundFisic = await getLastProviderRound();

  if (!roundFisic) return;

  const { round, id_round } = roundFisic

  const roundData = await getLastRound(round);

  if (!roundData) return;

  const { result } = roundData

  if (result === -1) {
    betMessage.set(`RONDA: ${id_round} ESPERANDO RESULTADO`);
    CURRENT_ROUND.set(id_round);
    return;
  }

  return createRound()
}

export const getLastProviderRound = async () => {

  const roulette = get(currentRoulette) || localStorage.getItem('currentRoulette') ? JSON.parse(localStorage.getItem('currentRoulette') || '') : null;

  if (!roulette) return

  const filter = {
    gameType: GamesTypes.Roulette,
    rouletteId: roulette.providerId,
    limit: 1,
    page: 1,
  };

  await RoundUseCases.getProviderRounds(filter)

  const rounds = get(roundsFisics);

  if (!rounds.length) return;

  return rounds[0];
}

export const getLastRound = async (identifierNumber: number) => {

  const filter = {
    gameType: GamesTypes.Roulette,
    identifierNumber,
    limit: 1,
    page: 1,
  }

  await RoundUseCases.getRounds(filter)

  const roundsData = get(rounds);

  if (!roundsData.length) return;

  return roundsData[0];
}

export const createRound = async () => {
  const roulette = get(currentRoulette) || localStorage.getItem('currentRoulette') ? JSON.parse(localStorage.getItem('currentRoulette') || '') : null;

  if (!roulette) return

  const ID_Ronda = crypto.randomUUID();

  await RoundUseCases.startRound({ ID_Ronda, ID_Ruleta: roulette.providerId });

  betMessage.set(`RONDA: ${ID_Ronda} ESPERANDO RESULTADO`);
  console.log(get(betMessage))
  CURRENT_ROUND.set(ID_Ronda);

  TIME_TO_BET.set(100);
}

export const addResult = async () => {
  addingResult.set(true);

  const numberSelectedValue = get(numberSelected)

  if (!numberSelectedValue) {
    addingResult.set(false);
    return window.alert('Seleccione un numero');
  }

  const currentRound = get(CURRENT_ROUND)

  if (!currentRound) {
    addingResult.set(false);
    return window.alert('No hay ronda');
  }

  const roulette: Roulette | null = get(currentRoulette) || localStorage.getItem('currentRoulette') ? JSON.parse(localStorage.getItem('currentRoulette') || '') : null;

  if (!roulette) {
    addingResult.set(false);
    return window.alert('No hay ROULETTE ID');
  }

  const data = {
    ID_Ronda: currentRound,
    ID_Ruleta: roulette.providerId,
    Resultado: numberSelectedValue.value,
  };

  console.log('data', data);

  // await this.closeRound(data);

  // if (!this.success) {
  //   this.addingResult = false;
  //   await this.createLog({
  //     request: data,
  //     response: data,
  //     error: data,
  //     success: false,
  //     ip: '1.1.1.1',
  //     type: 'round',
  //   });
  //   return Swal.fire('Error cerrando ronda', '', 'error');
  // }

  // Swal.fire({
  //   title: 'Ronda cerrada',
  //   icon: 'success',
  //   timer: 1000,
  //   showConfirmButton: false,
  // });

  // let color = this.reds.includes(this.numberSelected)
  //   ? 'red'
  //   : [0, 37].includes(this.numberSelected)
  //     ? 'green'
  //     : 'black';
  // this.results.unshift({ result: this.numberSelected, color });

  // this.cleanBetInterval();
  // this.progressValue = 30;
  betMessage.set('RONDA CERRADA');
  // this.barColor = 'danger';
  numberSelected.set(null);
  addingResult.set(false);
  TIME_TO_BET.set(100);

  // setTimeout(() => {
  //   this.createBetInterval();
  //   this.createRound();
  // }, 2000);
}
