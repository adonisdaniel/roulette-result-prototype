import { get, writable } from "svelte/store";
import { type RouletteNumber } from "../../../shared/contants/ROULETTES_NUMBER";
import { cleanCurrentRoulette, currentRoulette } from "../../../shared/store/roulettes.svelte";
import { goto } from "$app/navigation";
import { GamesTypes } from "../../../shared/contants/GAMES_TYPES";
import RoundUseCases from "../../../shared/services/games/rounds/application/RoundUseCases";
import { rounds, roundsFisics } from "../../../shared/store/rounds.svelte";
import type { Roulette } from "../../../shared/services/games/roulettes/domain/interfaces";
import LogsUseCases from "../../../shared/services/logs/application/LogsUseCases";
import type { Colors } from "../interfaces/common.interfaces";
import { showModalAndClose } from "../../../components/Modal/js/modal.svelte";

// VARS AND GETTERS

export const numbers = writable<RouletteNumber[]>([]);

export const numberSelected = writable<RouletteNumber | null>(null);

export const results = writable<RouletteNumber[]>([]);

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
  CURRENT_ROUND.set(ID_Ronda);

  TIME_TO_BET.set(100);
}

export const addResult = async () => {
  addingResult.set(true);

  const numberSelectedValue = get(numberSelected)

  if (!numberSelectedValue) {
    addingResult.set(false);
    return showAlertModal('Error', 'Seleccione un numero');
  }

  const currentRound = get(CURRENT_ROUND)

  if (!currentRound) {
    addingResult.set(false);
    return showAlertModal('Error', 'No hay ronda');
  }

  const roulette: Roulette | null = get(currentRoulette) || localStorage.getItem('currentRoulette') ? JSON.parse(localStorage.getItem('currentRoulette') || '') : null;

  if (!roulette) {
    addingResult.set(false);
    return showAlertModal('Error', 'No hay ruleta seleccionada');
  }

  const data = {
    ID_Ronda: currentRound,
    ID_Ruleta: roulette.providerId,
    Resultado: numberSelectedValue.value,
  };

  const success = await RoundUseCases.closeRound(data);

  if (!success) {
    addingResult.set(false);
    const log = {
      request: data,
      response: data,
      error: data,
      success: false,
      ip: '1.1.1.1',
      type: 'round',
      created_at: new Date().toISOString(),
    };

    LogsUseCases.createLog(log);

    return showAlertModal('Error', 'Error al cerrar la ronda');
  }

  showSuccessModal('Ronda cerrada', '')

  results.update((value) => {

    value.unshift(numberSelectedValue);

    if (value.length === 10) value.pop();

    return value
  });

  clearInterval(get(intervalo))
  // this.progressValue = 30;
  betMessage.set('RONDA CERRADA');
  barColor.set('red');
  numberSelected.set(null);
  addingResult.set(false);
  TIME_TO_BET.set(100);
  timeToBet.set(30);

  roundOpen.set(true);

  setTimeout(() => {
    createBetInterval();
    createRound();
  }, 2000);
}

const intervalo = writable<ReturnType<typeof setInterval> | undefined>(undefined);

const timeToBet = writable<number>(0);

export const roundOpen = writable<boolean>(false);

export const barColor = writable<Colors>('gray');

const createBetInterval = () => {
  intervalo.set(setInterval(() => {

    const timeToBetValue = get(timeToBet)

    TIME_TO_BET.update(() => (timeToBetValue * 100) / 30);

    if (timeToBetValue <= 0) {
      roundOpen.set(false);
      betMessage.set('APUESTAS CERRADAS');
      barColor.set('red');

      clearInterval(get(intervalo));
      return;
    }
    betMessage.set('RONDA ABIERTA');
    barColor.set('green');

    timeToBet.update((value) => value - 1);
  }, 1000))
}

export const cleanUp = () => {
  clearInterval(get(intervalo));
  results.set([]);
  numberSelected.set(null);
  betMessage.set('');
  CURRENT_ROUND.set(null);
  TIME_TO_BET.set(null);
  addingResult.set(false);
  roundOpen.set(false);
}

export const handleSelectionNumber = (number: RouletteNumber) => {
  if (get(roundOpen)) return
  numberSelected.set(number)
}

// MODAL

const colorRed = 'bg-red-900 dark:bg-red-900';
const colorGreen = 'bg-green-900 dark:bg-green-900';

export const colorBg = writable(colorRed);
export const colorModal = writable<string | undefined>(undefined);

const switchColorModalRed = () => {
  colorBg.set(colorRed);
  colorModal.set('red');
}

const switchColorModalGreen = () => {
  colorBg.set(colorGreen);
  colorModal.set('green');
}

export const title = writable<string>('');
export const description = writable<string>('');

const showModal = (
  titleP: string,
  descriptionP: string,
  switchColor: () => void
) => {
  title.set(titleP);
  description.set(descriptionP);
  switchColor(); // Llama a la función para cambiar el color del modal
  showModalAndClose();
};

const showAlertModal = (titleP: string, descriptionP: string) => {
  showModal(titleP, descriptionP, switchColorModalRed);
};

const showSuccessModal = (titleP: string, descriptionP: string) => {
  showModal(titleP, descriptionP, switchColorModalGreen);
};