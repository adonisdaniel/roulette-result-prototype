import { writable } from "svelte/store";
import RouletteUseCases from "../../../shared/services/games/roulettes/application/RouletteUseCases";


export const loading = writable(false);

export const getRoulettes = async () => {

  loading.set(true);

  await RouletteUseCases.getRoulettes()

  loading.set(false);
}