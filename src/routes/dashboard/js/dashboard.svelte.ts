import { writable } from "svelte/store";
import RouletteUseCases from "../../../shared/services/games/roulettes/application/RouletteUseCases";
import type { Roulette } from "../../../shared/services/games/roulettes/domain/interfaces";
import { saveCurrentRoulette } from "../../../shared/store/roulettes.svelte";
import { goto } from "$app/navigation";


export const loading = writable(false);

export const getRoulettes = async () => {

  loading.set(true);

  await RouletteUseCases.getRoulettes()

  loading.set(false);
}

export const goTo = async (roulette: Roulette) => {
  saveCurrentRoulette(roulette);
  goto('/roulettes');
}