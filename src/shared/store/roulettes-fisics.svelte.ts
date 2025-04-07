import { get, writable } from "svelte/store";
import type { RouletteFisic } from "../services/games/roulettes/domain/interfaces";

export const roulettesFisics = writable<RouletteFisic[]>([]);

export const currentRouletteFisic = writable<RouletteFisic | null>(null);

export const saveCurrentRouletteFisic = (roulette: RouletteFisic) => {
  currentRouletteFisic.set(roulette);
  localStorage.setItem("currentRouletteFisic", JSON.stringify(roulette));
}

export const cleanCurrentRouletteFisic = () => {
  currentRouletteFisic.set(null);
  localStorage.removeItem("currentRouletteFisic");
}

export const getCurrentRouletteFisic = (): RouletteFisic | null => {
  const roulette = localStorage.getItem("currentRouletteFisic");
  if (roulette) return (JSON.parse(roulette));
  return null
}

export const setCurrentRouletteFisicByProviderId = (providerId: string) => {

  const roulettes = get(roulettesFisics)

  const roulette = roulettes.find(r => r.providerId === providerId);
  if (!roulette) return null

  currentRouletteFisic.set(roulette);
  localStorage.setItem("currentRouletteFisic", JSON.stringify(roulette));
}