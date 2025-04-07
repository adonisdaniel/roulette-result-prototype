import { writable } from "svelte/store";
import type { Roulette } from "../services/games/roulettes/domain/interfaces";

export const roulettes = writable<Roulette[]>([]);

export const currentRoulette = writable<Roulette | null>(null);

export const saveCurrentRoulette = (roulette: Roulette) => {
  currentRoulette.set(roulette);
  localStorage.setItem("currentRoulette", JSON.stringify(roulette));
}

export const cleanCurrentRoulette = () => {
  currentRoulette.set(null);
  localStorage.removeItem("currentRoulette");
}

export const getCurrentRoulette = (): Roulette | null => {
  const roulette = localStorage.getItem("currentRoulette");
  if (roulette) return (JSON.parse(roulette));
  return null
}